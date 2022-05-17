import { CliOption } from "../../model";
import { presets } from "./lists";

export const bPyramid: CliOption = {
  key: "--b-pyramid",
  offKey: "--no-b-pyramid",
  summary: "Use B-frames as references, when possible. Default enabled.",
  type: "triple",
};

export const preset: CliOption = {
  altKey: "-p",
  dataTypes: ["integer", "string"],
  key: "--preset",
  options: [[":null", ""], ...presets.map(e => [e[1], e[1]] as [string, string])],
  summary: (
    <>
      <p>Sets parameters to preselected values, trading off compression efficiency against encoding speed. These parameters are applied before all other input parameters are applied, and so you can override any parameters that these values control.</p>
      <ol>
        {presets.map(e => (
          <li key={e[0]} value={e[0]}>{e[1]} {e[2] && <b>(default)</b>}</li>
        ))}
      </ol>
    </>
  ),
  type: "select",
};
