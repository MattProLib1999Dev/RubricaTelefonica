import { EventEmitter } from "@angular/core";
import { rowArgs } from "../rowArgs";

export interface baseInputs {
    editing: boolean;
    boundField: string;
    data: any;
    index: number;
    command: EventEmitter<rowArgs>
}