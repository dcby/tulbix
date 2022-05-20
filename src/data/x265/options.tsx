import { CliOption } from "../../model";
import { presets } from "./lists";

const defaultTripletOptions: [string, string][] = [
  [":null", "Not set"],
  [":true", "On"],
  [":false", "Off"],
];

export const bPyramid: CliOption = {
  key: "--b-pyramid",
  offKey: "--no-b-pyramid",
  options: defaultTripletOptions,
  summary: "Use B-frames as references, when possible. Default enabled.",
  type: "radios",
};

export const preset: CliOption = {
  altKey: "-p",
  dataTypes: ["integer", "string"],
  key: "--preset",
  options: [[":null", ""], ...presets.map(e => [e[0], `${e[0]}. ${e[1]}`] as [number, string])],
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
