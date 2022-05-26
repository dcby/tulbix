import * as x265 from "../data/x265";
import { CliOption, CliOptionGroup } from "../model";

export type CliEditorStateAction =
  | { type: "allSummaries.toogle" }
  | { type: "group.toggle", id: string }
  | { type: "summary.toggle", key: string }
  | { type: "value.patch", key: string, value: unknown }
  ;

export interface CliEditorState {
  expandGroups: Record<string, true>;
  options: CliOption[];
  layout: (CliOptionGroup & {
    options: CliOption[];
  })[];
  showSummary: Set<string>;
  value: Record<string, unknown>;
}

export const defaultCliEditorState: CliEditorState = {
  expandGroups: x265.groups.reduce((p: Record<string, true>, c: CliOptionGroup) => {
    p[c.id] = true;
    return p;
  }, {}),
  options: [],
  layout: createLayout(),
  showSummary: new Set(),
  value: {},
};

export function cliEditorStateReducer(state: CliEditorState, action: CliEditorStateAction): CliEditorState {
  switch (action.type) {
    case "allSummaries.toogle":
      if (state.showSummary.size === state.options.length) {
        return {
          ...state,
          showSummary: new Set(),
        };
      } else {
        return {
          ...state,
          showSummary: new Set(state.options.map(e => e.key))
        };
      }

    case "group.toggle": {
      const expandGroups = toggle(state.expandGroups, action.id);
      return {
        ...state,
        expandGroups,
      };
    }

    case "summary.toggle": {
      const showSummary = new Set(state.showSummary);
      if (showSummary.has(action.key)) {
        showSummary.delete(action.key);
      } else {
        showSummary.add(action.key);
      }

      return {
        ...state,
        showSummary,
      };
    }

    case "value.patch": {
      let value: Record<string, unknown>;
      if (action.value === undefined) {
        value = { ...state.value };
        delete value[action.key];
      } else {
        value = {
          ...state.value,
          [action.key]: action.value,
        };
      }

      return {
        ...state,
        value,
      };
    }

    default:
      return defaultCliEditorState;
  }
}


// todo: move this to approppriate location
function createLayout() {
  const { groupsMap, groupsToOptionsMap, optionsMap, root } = x265;
  return root.map(e => ({ ...groupsMap[e], options: groupsToOptionsMap[e].map(e => optionsMap[e]) }));
}

function toggle(map: Record<string, true>, key: string): Record<string, true> {
  if (map[key] === true) {
    const { [key]: _, ...rest } = map;
    return rest;
  }

  return {
    ...map,
    [key]: true,
  };
}
