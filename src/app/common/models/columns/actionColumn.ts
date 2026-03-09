import { buttonDescription } from "../_index";
import { ActionFieldComponent } from "../../components/base/_index";
import { baseColumn } from "./baseColumn";
import { baseInputs } from "./baseInputs";

export class actionColumn extends baseColumn<actionInputs, ActionFieldComponent> implements actionInputs {

    buttons: buttonDescription[] = [];
    rowBound: (data: any, states: buttonDescription[]) => void = (data: any, states: buttonDescription[]) => { };

    override cellComponent: any = ActionFieldComponent;

    override toInputs(rowData: any): actionInputs {
        return {
            data: rowData,
            boundField: this.boundField,
            buttons: this.buttons,
            rowBound: this.rowBound
        } as actionInputs
    }

    static ToColumn(
        header: string,
        boundField: string,
        buttons: buttonDescription[] = [],
        rowBound: (data: any, buttons: buttonDescription[]) => void = (data: any, states: buttonDescription[]) => { }
    ): actionColumn {
        var c: actionColumn = new actionColumn();
        c.header = header;
        c.boundField = boundField;
        c.buttons = buttons;
        c.rowBound = rowBound;
        return c;
    }
}

export interface actionInputs extends baseInputs {
    buttons: buttonDescription[];
    rowBound: (data: any, buttons: buttonDescription[]) => void;
}
