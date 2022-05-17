import { CliOption } from "../model";

export type CliEditorStateAction =
  | { type: "toogleAllSummaries" };

export interface CliEditorState {
  options: CliOption[];
  showAllSummaries: boolean;
  showSummary: Record<string, true>;
  value: Record<string, number | string>;
}

export const defaultCliEditorState: CliEditorState = {
  options: [],
  showAllSummaries: false,
  showSummary: {},
  value: {},
};

export function cliEditorStateReducer(state: CliEditorState, action: CliEditorStateAction) {
  switch (action.type) {
    case "toogleAllSummaries":
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
  }
}
