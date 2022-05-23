import { CliOption } from "../../model";
import { presets } from "./lists";

const defaultTripletOptions: [string, string][] = [
  [":null", "Not set"],
  [":true", "On"],
  [":false", "Off"],
];

export const bPyramid: CliOption = {
  // groupId: "",
  key: "--b-pyramid",
  offKey: "--no-b-pyramid",
  options: defaultTripletOptions,
  summary: "Use B-frames as references, when possible. Default enabled.",
  type: "radios",
};

export const lossless: CliOption = {
  key: "--lossless",
  offKey: "--no-lossless",
  options: defaultTripletOptions,
  summary: "Enables true lossless coding by bypassing scaling, transform, quantization and in-loop filter processes. This is used for ultra-high bitrates with zero loss of quality. Reconstructed output pictures are bit-exact to the input pictures. Lossless encodes implicitly have no rate control, all rate control options are ignored. Slower presets will generally achieve better compression efficiency (and generate smaller bitstreams). Default disabled.",
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

export const slowFirstpass: CliOption = {
  key: "--slow-firstpass",
  offKey: "--no-slow-firstpass",
  options: defaultTripletOptions,
  summary: (
    <>
      <p>Enable first pass encode with the exact settings specified. The quality in subsequent multi-pass encodes is better (compared to first pass) when the settings match across each pass. Default enabled.</p>
      <p>When slow first pass is disabled, a turbo encode with the following go-fast options is used to improve performance:</p>
      <ul>
        <li>todo...</li>
      </ul>
    </>
  ),
  type: "radios",
};
