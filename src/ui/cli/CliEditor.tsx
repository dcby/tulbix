import { useReducer } from "react";
import { options } from "../../data/x265";
import { cliEditorStateReducer, defaultCliEditorState } from "../../state";
import "./CliEditor.scss";
import CliOptionWrap from "./CliOptionWrap";
import { CliEditorDispatch } from "./context";

export default function CliEditor() {
  console.log("CliEditor()");

  const [state, dispatch] = useReducer(cliEditorStateReducer, { ...defaultCliEditorState, options: options });

  const nodes = state.options.map(e => (
    <CliOptionWrap key={e.key} cliOption={e} value={state.value[e.key]} />
  ));

  return (
    <div className="CliEditor">
      <CliEditorDispatch.Provider value={dispatch}>
        {nodes}
      </CliEditorDispatch.Provider>
    </div>
  );
}
