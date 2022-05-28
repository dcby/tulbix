import { ReactNode } from "react";

interface CliKeyBase {
  readonly defaultValue?: number | string;
  key: string;
  /**
   * Reference id to track keys amonth common handling of values, etc. The keys with same refId must have the same value
   * definitions (defaultValue, options) otherwise the behavior is undefined.
   */
  refId?: string;
}

interface CliKeyWithOptions extends CliKeyBase {
  readonly defaultValue: number | string;
  readonly options: [number | string, string][];
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
  keys: CliKey[];
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
