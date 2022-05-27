import { CliOption } from "../../model";
import { GroupId } from "./groups";
import { presets } from "./lists";

let options: [number | string, string][];

type X265CliOption = CliOption & {
  groupId: GroupId;
};

export const bPyramid: X265CliOption = {
  groupId: "slice-decision-options",
  id: "--b-pyramid",
  keys: [
    {
      key: "--b-pyramid",
      type: "standalone",
    },
    {
      key: "--no-b-pyramid",
      type: "standalone",
    },
  ],
  summary: "Use B-frames as references, when possible. Default enabled.",
};

export const lossless: X265CliOption = {
  groupId: "quality-rate-control-and-rate-distortion-options",
  id: "--lossless",
  keys: [
    {
      key: "--lossless",
      type: "standalone",
    },
    {
      key: "--no-lossless",
      type: "standalone",
    },
  ],
  summary: "Enables true lossless coding by bypassing scaling, transform, quantization and in-loop filter processes. This is used for ultra-high bitrates with zero loss of quality. Reconstructed output pictures are bit-exact to the input pictures. Lossless encodes implicitly have no rate control, all rate control options are ignored. Slower presets will generally achieve better compression efficiency (and generate smaller bitstreams). Default disabled.",
};

export const preset: X265CliOption = {
  dataTypes: ["integer", "string"],
  groupId: "performance-options",
  id: "--preset",
  keys: [
    {
      key: "--preset",
      options: (options = presets.map(e => [e[0], `${e[0]}. ${e[1]}`] as [number, string])),
      type: "options",
    },
    {
      key: "--preset",
      options: options,
      type: "options",
    },
  ],
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
};

export const slowFirstpass: X265CliOption = {
  groupId: "quality-rate-control-and-rate-distortion-options",
  id: "--slow-firstpass",
  keys: [
    {
      key: "--slow-firstpass",
      type: "standalone",
    },
    {
      key: "--no-slow-firstpass",
      type: "standalone",
    },
  ],
  summary: (
    <>
      <p>Enable first pass encode with the exact settings specified. The quality in subsequent multi-pass encodes is better (compared to first pass) when the settings match across each pass. Default enabled.</p>
      <p>When slow first pass is disabled, a turbo encode with the following go-fast options is used to improve performance:</p>
      <ul>
        <li>todo...</li>
      </ul>
    </>
  ),
};
