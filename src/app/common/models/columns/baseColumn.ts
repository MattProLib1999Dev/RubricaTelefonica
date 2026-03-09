import { EventEmitter } from "@angular/core";
import { baseInputs } from "./baseInputs";
import { rowArgs } from "../rowArgs";
import { BaseFieldComponent } from "../../components/base/fields/base-field/base-field.component";

export abstract class baseColumn<T extends baseInputs, C extends BaseFieldComponent> implements iBaseColumn {
    header: string = "";
    sorting: string = "";
    boundField: string = "";
    abstract cellComponent: C;

    //process
    editing: boolean = false;
    data: any;
    index: number = 0;
    command: EventEmitter<rowArgs> = new EventEmitter<rowArgs>();

    abstract toInputs(rowData: any): T;
}


export interface iBaseColumn {
    header: string;
    sorting: string;
    boundField: string;
    cellComponent: any;
    
    toInputs(rowData: any): baseInputs;
}
