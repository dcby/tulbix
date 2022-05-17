import { ReactNode } from "react";

interface CliOptionBase {
  altKey?: string;
  dataTypes?: string[];
  key: string;
  summary: ReactNode;
}

interface SelectCliOption extends CliOptionBase {
  options: [number | string | undefined, string][];
  type: "select";
}

interface TripleCliOption extends CliOptionBase {
  offKey: string;
  type: "triple";
}

export type CliOption = SelectCliOption | TripleCliOption;
