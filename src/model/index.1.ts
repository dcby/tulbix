import { ReactNode } from "react";

interface CliOptionBase {
  altKey?: string;
  dataTypes?: string[];
  groupId: string;
  key: string;
  summary: ReactNode;
}

interface RadiosCliOption extends CliOptionBase {
  offKey: string;
  options: [number | string, string][];
  type: "radios";
}

interface SelectCliOption extends CliOptionBase {
  options: [number | string, string][];
  type: "select";
}

export type CliOption = RadiosCliOption | SelectCliOption;

export interface CliOptionGroup {
  readonly id: string;
  readonly name: string;
}

export interface CliOptionValue {
  arg?: boolean | number | string;
  key: string;
}
