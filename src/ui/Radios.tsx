import { ChangeEventHandler, memo } from "react";
import "./Radios.scss";

export interface RadiosProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  options: [number | string | undefined, string][];
  value?: number | string;
}

function Radios({ onChange, options, value }: RadiosProps) {
  const nodes = options.map(e => (
    <label key={e[0]} className="input">
      <input type="radio" value={e[0]} checked={e[0] === value} onChange={onChange} />
      {e[1]}
    </label>
  ));

  return (
    <div className="Radios">{nodes}</div>
  );
}

export default memo(Radios);
