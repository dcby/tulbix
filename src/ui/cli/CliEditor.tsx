import { useReducer } from "react";
import { cliEditorStateReducer, defaultCliEditorState } from "../../state";

export default function CliEditor() {
  const [state, dispatch] = useReducer(cliEditorStateReducer, defaultCliEditorState);

  return <div className="CliEditor">[CliEditor]</div>;
}
