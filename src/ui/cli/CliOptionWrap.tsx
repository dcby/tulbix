import { ReactNode, memo, useContext } from "react";
import { CliOption, CliOptionValue } from "../../model";
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

  const keys = cliOption.keys.map((e, i) => {
    const elem = (
      <span key={e.key} className="CliOptionWrap__Switch" role="switch" aria-checked={value?.key === e.key} onClick={() => dispatch({ type: "option.toggle", id: cliOption.id, key: e.key })}>
        {e.key}
      </span>
    );
    return i > 0 ? [", ", elem] : [elem];
  }).flat();
  
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
        <code>{keys}</code>
        <button type="button" className="button--flow CliOptionWrap__SummaryButton" onClick={() => dispatch({ type: "summary.toggle", key: cliOption.id })}>&#9974;</button>
      </legend>
      <div className="CliOptionWrap__Content">
        {summary}
      </div>
    </fieldset>
  );
}

// @ts-expect-error: Cannot assign to ... because it is a function.
CliOptionWrap = memo(CliOptionWrap);

export default CliOptionWrap;

// const re = /^\d+$/;

// function otov(value: number | string): boolean | number | string | undefined {
//   switch (value) {
//     case ":null":
//       return undefined;
    
//     case ":false":
//       return false;
    
//     case ":true":
//       return true;
    
//     default:
//       if (typeof value === "string" && re.test(value)) {
//         return Number.parseInt(value);
//       }
//       return value;
//   }
// }

// function vtoo(value: unknown): number | string {
//   switch (value) {
//     case false:
//       return ":false";
    
//     case true:
//       return ":true";
    
//     default:
//       switch (typeof value) {
//         case "number":
//         case "string":
//           return value;
        
//         default:
//           return ":null";
//       }
//   }
// }
