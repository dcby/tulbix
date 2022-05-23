import { memo, useContext } from "react";
import "./CliEditorNav.scss";
import { CliEditorContext, CliEditorDispatch } from "./context";

function CliEditorNav() {
  console.log("CliEditorNav()");
  const dispatch = useContext(CliEditorDispatch);
  const state = useContext(CliEditorContext);

  return (
    <nav className="CliEditorNav">
      <button type="button" className="button--flow" onClick={() => dispatch({ type: "allSummaries.toogle" })}>{state.showSummary.size === state.options.length ? "Hide" : "Show"}</button>
    </nav>
  );
}

// @ts-expect-error: Cannot assign to 'CliEditorNav' because it is a function.
CliEditorNav = memo(CliEditorNav);

export default CliEditorNav;
