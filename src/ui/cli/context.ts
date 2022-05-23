import { createContext } from "react";
import { CliEditorStateAction, defaultCliEditorState } from "../../state";

export const CliEditorContext = createContext(defaultCliEditorState);
export const CliEditorDispatch = createContext((_action: CliEditorStateAction) => { /* noop */ });
