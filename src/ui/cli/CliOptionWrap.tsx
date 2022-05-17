import { CliOption } from "../../model";
import SelectWrap from "../SelectWrap";
import "./CliOptionWrap.scss";

export interface CliOptionWrapProps {
  cliOption: CliOption;
  value?: unknown;
}

function CliOptionWrap({ cliOption, value }: CliOptionWrapProps) {
  console.log("CliOptionWrap()");

  const key = cliOption.key
    + (cliOption.altKey ? `, ${cliOption.altKey}` : "")
    + ("offKey" in cliOption ? `, ${cliOption.offKey}` : "")
    + (cliOption.dataTypes ? ` <${cliOption.dataTypes.join("|")}>` : "");

  function handleChange(e: unknown) {
    console.log(e);
  }
  
  return (
    <fieldset className="CliOptionWrap">
      <legend>
        <code>{key}</code>
      </legend>
      <div className="CliOptionWrap__Summary">
        {cliOption.summary}
      </div>
      {control(cliOption, value, handleChange)}
    </fieldset>
  );
}

export default CliOptionWrap;

function control(cliOption: CliOption, value: unknown, handleChange: (e: unknown) => void) {
  switch (cliOption.type) {
    case "select": {
      const options = cliOption.options.map(e => <option key={e[0]} value={e[0]}>{e[1]}</option>);

      const v = typeof value === "number" || typeof value === "string" ? value : ":null";

      return (
        <SelectWrap>
          <select value={v} onChange={handleChange}>
            {options}
          </select>
        </SelectWrap>
      );
    }
  }

  return <></>;
}
