import { SelectFieldComponent } from "../../components/base/_index";
import { baseColumn } from "./baseColumn";
import { baseInputs } from "./baseInputs";

export class selectFieldColumn extends baseColumn<selectFieldInputs, SelectFieldComponent> implements selectFieldInputs {
    // //base
    override cellComponent: any = SelectFieldComponent;

    selectData: any[] = [];
    textField: string = 'id';
    valueField: string = 'text';

    //specific
    placeHolder: string = '';
    override toInputs(rowData: any): selectFieldInputs {
        return {
            data: rowData,
            boundField: this.boundField,
            textField: this.textField,
            valueField: this.valueField,
            selectData: this.selectData
        } as selectFieldInputs
    }

    static ToColumn(header: string, boundField: string, selectData: any[] = []): selectFieldColumn {
        var c: selectFieldColumn = new selectFieldColumn();
        c.header = header;
        c.boundField = boundField;
        c.placeHolder = header;
        c.selectData = selectData;
        return c;
    }
}

export interface selectFieldInputs extends baseInputs {
    selectData: any[];
    textField: string;
    valueField: string;
}
