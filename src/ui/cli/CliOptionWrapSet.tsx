import { CliOption } from "../../model";
import CliOptionWrap from "./CliOptionWrap";

export interface CliOptionWrapSetProps {
  cliOptions: CliOption[];
}

function CliOptionWrapSet({ cliOptions }: CliOptionWrapSetProps) {
  const nodes = cliOptions.map(e => (
    <CliOptionWrap key={e.key} cliOption={e} />
  ));

  return <>{nodes}</>;
}

export default CliOptionWrapSet;
