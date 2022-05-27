import { ReactNode } from "react";

interface CliKeyBase {
  key: string;
}

interface CliKeyWithOptions extends CliKeyBase {
  options: [number | string, string][];
  type: "options";
}

interface CliKeyWithValue extends CliKeyBase {
  type: "value";
}

interface CliKeyWithoutValue extends CliKeyBase {
  type: "standalone";
}

export type CliKey =
  | CliKeyWithOptions
  | CliKeyWithValue
  | CliKeyWithoutValue;

export type CliKeyWithDataTypes = CliKey & {
  dataTypes: string[];
};

interface CliOptionBase {
  groupId: string;
  id: string;
  summary: ReactNode;
}

interface CliOptionWithoutDataTypes extends CliOptionBase {
  keys: (CliKey | CliKeyWithDataTypes)[];
}

interface CliOptionWithDataTypes extends CliOptionBase {
  dataTypes: string[];
  keys: CliKey[];
}

export type CliOption = CliOptionWithoutDataTypes | CliOptionWithDataTypes;

export interface CliOptionGroup {
  readonly id: string;
  readonly name: string;
}

export interface CliOptionValue {
  arg?: boolean | number | string;
  key: string;
}
