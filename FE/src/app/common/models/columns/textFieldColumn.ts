import { TextFieldComponent } from "../../components/base/_index";
import { baseColumn } from "./baseColumn";
import { baseInputs } from "./baseInputs";

export class textFieldColumn extends baseColumn<textFieldInputs, TextFieldComponent> implements textFieldInputs {

    placeHolder: string = '';
    maxLength: number = 0;

    //base
    override cellComponent: any = TextFieldComponent;

    override toInputs(rowData: any): textFieldInputs {
        return {
            data: rowData,
            boundField: this.boundField,
            placeHolder: this.placeHolder,
            maxLength: this.maxLength
        } as textFieldInputs
    }



    static ToColumn(header: string, boundField: string, maxLength: number = 0): textFieldColumn {
        var c: textFieldColumn = new textFieldColumn();
        c.header = header;
        c.boundField = boundField;
        c.placeHolder = header;
        c.maxLength = maxLength;
        return c;
    }
}

export interface textFieldInputs extends baseInputs {
    placeHolder: string;
    maxLength: number;
}
