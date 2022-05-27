import { ReactNode, memo, useContext } from "react";
import { CliOption, CliOptionValue } from "../../model";
import Radios from "../Radios";
import SelectWrap from "../SelectWrap";
import "./CliOptionWrap.scss";
import { CliEditorDispatch } from "./context";

export interface CliOptionWrapProps {
  cliOption: CliOption;
  showSummary?: boolean;
  value?: CliOptionValue;
}

function CliOptionWrap({ cliOption, showSummary, value }: CliOptionWrapProps) {
  console.log("CliOptionWrap(%s)", cliOption.id);

  const dispatch = useContext(CliEditorDispatch);

  // const key = cliOption.key
  //   + (cliOption.altKey ? `, ${cliOption.altKey}` : "")
  //   + ("offKey" in cliOption ? `, ${cliOption.offKey}` : "")
  //   + (cliOption.dataTypes ? ` <${cliOption.dataTypes.join("|")}>` : "");

  // const keys = cliOption.keys.map((e, i) => )

  // const isKeyChecked = value?.key === cliOption.key;

  // const key = (
  //   <span className="CliOptionWrap__Switch" role="switch" aria-checked={isKeyChecked} onClick={() => dispatch({ type: "value.patch", key: cliOption.id, value: isKeyChecked ? undefined : { key: cliOption.key }})}>
  //     {cliOption.key}
  //   </span>
  // );
  
  // let control: ReactNode;

  // switch (cliOption.type) {
  //   case "radios": {
  //     const v = vtoo(value);

  //     control = (
  //       <Radios options={cliOption.options} value={v} onChange={e => dispatch({ type: "value.patch", key: cliOption.key, value: undefined })} />
  //     );
  //     break;
  //   }
      
  //   case "select": {
  //     const options = cliOption.options.map(e => <option key={e[0]} value={e[0]}>{e[1]}</option>);
  //     const v = vtoo(value);

  //     control = (
  //       <SelectWrap>
  //         <select value={v} onChange={e => dispatch({ type: "value.patch", key: cliOption.key, value: undefined })}>
  //           {options}
  //         </select>
  //       </SelectWrap>
  //     );
  //     break;
  //   }

  // default:
  //   control = <>[{cliOption.type}]</>;
  // }

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
        {/* <code>{key}</code> */}
        {/* <button type="button" className="button--flow CliOptionWrap__SummaryButton" onClick={() => dispatch({ type: "summary.toggle", key: cliOption.key })}>&#9974;</button> */}
      </legend>
      <div className="CliOptionWrap__Content">
        {summary}
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
