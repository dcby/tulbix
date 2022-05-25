import { CliOption, CliOptionGroup } from "../../model";
import { groups as grps, layout } from "./groups";
import * as opts from "./options";

export const options: CliOption[] = [
  opts.bPyramid,
  opts.lossless,
  opts.preset,
  opts.slowFirstpass,
];

export const optionsMap = options.reduce((p: Record<string, CliOption>, c: CliOption) => {
  p[c.key] = c;
  return p;
}, {});

export const groups: readonly CliOptionGroup[] = grps;

export const groupsMap = groups.reduce((p: Record<string, CliOptionGroup>, c: CliOptionGroup) => {
  p[c.id] = c;
  return p;
}, {});

const temp = options.reduce((p: Record<string, string[]>, c: CliOption) => {
  p[c.groupId] = p[c.groupId] ?? [];
  p[c.groupId].push(c.key);
  return p;
}, {});

export const groupsToOptionsMap = groups.reduce((p: Record<string, string[]>, c: CliOptionGroup) => {
  p[c.id] = temp[c.id] ?? [];
  return p;
}, {});

export { layout as root };
