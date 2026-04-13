import { CustomFieldComponent } from "../../components/base/_index";
import { baseColumn } from "./baseColumn";
import { baseInputs } from "./baseInputs";

export class customFieldColumn extends baseColumn<customFieldInputs, CustomFieldComponent> implements customFieldInputs {

    boundMethod: (data: any) => string = (data: any) => "";

    override cellComponent: any = CustomFieldComponent;

    override toInputs(rowData: any): customFieldInputs {
        return {
            data: rowData,
            boundField: this.boundField,
            boundMethod: this.boundMethod,
        } as customFieldInputs
    }

    static ToColumn(header: string, boundField: string, boundMethod: (data: any) => string): customFieldColumn {
        var c: customFieldColumn = new customFieldColumn();
        c.header = header;
        c.boundField = boundField;
        c.boundMethod = boundMethod;
        return c;
    }
}

export interface customFieldInputs extends baseInputs {
    boundMethod: (data: any) => string;
}
