import { CliOption } from "../model";

export type CliEditorStateAction =
  | { type: "allSummaries.toogle" }
  | { type: "summary.toggle", key: string }
  | { type: "value.patch", key: string, value: unknown }
  ;

export interface CliEditorState {
  options: CliOption[];
  showSummary: Set<string>;
  value: Record<string, unknown>;
}

export const defaultCliEditorState: CliEditorState = {
  options: [],
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
