import { ReactNode } from "react";
import "./SelectWrap.scss";

function SelectWrap({ children }: { children?: ReactNode }) {
  return (
    <div className="SelectWrap">
      {children}
      <span className="SelectWrap__Icon">&#9974;</span>
    </div>
  );
}

export default SelectWrap;
