import { CliKey, CliOption, CliOptionGroup } from "../../model";
import { groups as grps, layout } from "./groups";
import * as opts from "./options";

export const options: CliOption[] = [
  opts.bPyramid,
  opts.lossless,
  opts.preset,
  opts.slowFirstpass,
];

export const optionsMap = options.reduce((p: Record<string, CliOption>, c: CliOption) => {
  p[c.id] = c;
  return p;
}, {});

export const groups: readonly CliOptionGroup[] = grps;

export const groupsMap = groups.reduce((p: Record<string, CliOptionGroup>, c: CliOptionGroup) => {
  p[c.id] = c;
  return p;
}, {});

const temp = options.reduce((p: Record<string, string[]>, c: CliOption) => {
  p[c.groupId] = p[c.groupId] ?? [];
  p[c.groupId].push(c.id);
  return p;
}, {});

export const groupsToOptionsMap = groups.reduce((p: Record<string, string[]>, c: CliOptionGroup) => {
  p[c.id] = temp[c.id] ?? [];
  return p;
}, {});

const keysMap = options.reduce((p: Record<string, Record<string, CliKey>>, c: CliOption) => {
  p[c.id] = c.keys.reduce((p: Record<string, CliKey>, c: CliKey) => {
    p[c.key] = c;
    return p;
  }, {});
  return p;
}, {});

export function getCliKey(id: string, key: string): CliKey {
  return keysMap[id][key];
}

export { layout as root };
