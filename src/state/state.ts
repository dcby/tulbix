import * as x265 from "../data/x265";
import { CliOption, CliOptionGroup, CliOptionValue } from "../model";

export type CliEditorStateAction =
  | { type: "allSummaries.toogle" }
  | { type: "group.toggle", id: string }
  | { type: "summary.toggle", key: string }
  | { type: "value.patch", key: string, value: CliOptionValue | undefined }
  ;

export interface CliEditorState {
  expandGroups: Record<string, true>;
  options: CliOption[];
  layout: (CliOptionGroup & {
    options: CliOption[];
  })[];
  showSummary: Set<string>;
  values: Record<string, CliOptionValue>;
}

export const defaultCliEditorState: CliEditorState = {
  expandGroups: x265.groups.reduce((p: Record<string, true>, c: CliOptionGroup) => {
    p[c.id] = true;
    return p;
  }, {}),
  options: [],
  layout: createLayout(),
  showSummary: new Set(),
  values: {},
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
          showSummary: new Set(state.options.map(e => e.id))
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
      const values = patchValue(state.values, action.key, action.value);

      return {
        ...state,
        values,
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

function patchValue(map: Record<string, CliOptionValue>, key: string, value: CliOptionValue | undefined) {
  if (value === undefined) {
    const { [key]: _, ...rest } = map;
    return rest;
  }

  return {
    ...map,
    [key]: value,
  };
}
