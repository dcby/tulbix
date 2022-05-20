import { CliOption } from "../model";

export type CliEditorStateAction =
  | { type: "allSummaries.toogle" }
  | { type: "summary.toggle", key: string }
  | { type: "value.patch", key: string, value: unknown }
  ;

export interface CliEditorState {
  options: CliOption[];
  showAllSummaries: boolean;
  showSummary: Record<string, true>;
  value: Record<string, unknown>;
}

export const defaultCliEditorState: CliEditorState = {
  options: [],
  showAllSummaries: false,
  showSummary: {},
  value: {},
};

export function cliEditorStateReducer(state: CliEditorState, action: CliEditorStateAction): CliEditorState {
  switch (action.type) {
    case "allSummaries.toogle":
      if (state.showAllSummaries) {
        return {
          ...state,
          showAllSummaries: false,
          showSummary: {},
        };
      } else {
        return {
          ...state,
          showAllSummaries: true,
        };
      }

    case "summary.toggle": {
      let summary: Record<string, true>;
      if (state.showSummary[action.key]) {
        summary = { ...state.showSummary };
        delete summary[action.key];
      } else {
        summary = {
          ...state.showSummary,
          [action.key]: true,
        };
      }

      return {
        ...state,
        showSummary: summary,
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
