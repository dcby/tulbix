import { ReactNode, memo, useContext } from "react";
import { CliOption } from "../../model";
import Radios from "../Radios";
import SelectWrap from "../SelectWrap";
import "./CliOptionWrap.scss";
import { CliEditorDispatch } from "./context";

export interface CliOptionWrapProps {
  cliOption: CliOption;
  showSummary?: boolean;
  value?: unknown;
}

function CliOptionWrap({ cliOption, showSummary, value }: CliOptionWrapProps) {
  console.log("CliOptionWrap(%s)", cliOption.key);

  const dispatch = useContext(CliEditorDispatch);

  const key = cliOption.key
    + (cliOption.altKey ? `, ${cliOption.altKey}` : "")
    + ("offKey" in cliOption ? `, ${cliOption.offKey}` : "")
    + (cliOption.dataTypes ? ` <${cliOption.dataTypes.join("|")}>` : "");
  
  let control: ReactNode;

  switch (cliOption.type) {
    case "radios": {
      const v = vtoo(value);

      control = (
        <Radios options={cliOption.options} value={v} onChange={e => dispatch({ type: "value.patch", key: cliOption.key, value: otov(e.target.value) })} />
      );
      break;
    }
      
    case "select": {
      const options = cliOption.options.map(e => <option key={e[0]} value={e[0]}>{e[1]}</option>);
      const v = vtoo(value);

      control = (
        <SelectWrap>
          <select value={v} onChange={e => dispatch({ type: "value.patch", key: cliOption.key, value: otov(e.target.value) })}>
            {options}
          </select>
        </SelectWrap>
      );
      break;
    }

    // default:
    //   control = <>[{cliOption.type}]</>;
  }

  const summary: ReactNode = showSummary
    ? (
      <div className="CliOptionWrap__Summary">
        {cliOption.summary}
      </div>
    )
    : "";

  return (
    <fieldset className="CliOptionWrap">
      <legend>
        <code>{key}</code>
        <button type="button" className="button--flow CliOptionWrap__SummaryButton" onClick={() => dispatch({ type: "summary.toggle", key: cliOption.key })}>&#9974;</button>
      </legend>
      <div className="CliOptionWrap__Content">
        {summary}
        {control}
      </div>
    </fieldset>
  );
}

export default memo(CliOptionWrap);

const re = /^\d+$/;

function otov(value: number | string) {
  switch (value) {
    case ":null":
      return undefined;
    
    case ":false":
      return false;
    
    case ":true":
      return true;
    
    default:
      if (typeof value === "string" && re.test(value)) {
        return Number.parseInt(value);
      }
      return value;
  }
}

function vtoo(value: unknown) {
  switch (value) {
    case false:
      return ":false";
    
    case true:
      return ":true";
    
    default:
      switch (typeof value) {
        case "number":
        case "string":
          return value;
        
        default:
          return ":null";
      }
  }
}
