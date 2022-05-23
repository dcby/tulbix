import { useReducer } from "react";
import { options } from "../../data/x265";
import { cliEditorStateReducer, defaultCliEditorState } from "../../state";
import "./CliEditor.scss";
import CliEditorNav from "./CliEditorNav";
import CliOptionWrap from "./CliOptionWrap";
import { CliEditorContext, CliEditorDispatch } from "./context";

export default function CliEditor() {
  console.log("CliEditor()");

  const [state, dispatch] = useReducer(cliEditorStateReducer, { ...defaultCliEditorState, options: options });

  const nodes = state.options.map(e => (
    <CliOptionWrap key={e.key} cliOption={e} showSummary={state.showSummary.has(e.key)} value={state.value[e.key]} />
  ));

  return (
    <div className="CliEditor">
      <CliEditorDispatch.Provider value={dispatch}>
        <div className="CliEditor__Content">
          {nodes}
          <div className="CliEditor__NavWrap">
            <CliEditorContext.Provider value={state}>
              <CliEditorNav />
            </CliEditorContext.Provider>
          </div>
        </div>
      </CliEditorDispatch.Provider>
    </div>
  );
}
