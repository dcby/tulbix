import { createContext } from "react";
import { CliEditorStateAction } from "../../state";

export const CliEditorDispatch = createContext((_action: CliEditorStateAction) => { /* noop */ });
