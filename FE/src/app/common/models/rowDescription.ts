import { buttonState } from "../enums/_index";

export interface rowDescription<T = any> {
    data: T;
    buttonStates: buttonState[];
}
