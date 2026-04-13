import { FormGroup, ValidatorFn } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

export type QueryValue = Record<string, unknown>;

export type QueryFieldType =
  | 'text'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'autocomplete'
  | 'datepicker'
  | 'checkbox'

export interface DerivedRule<TValue extends QueryValue> {
  deps: Array<keyof TValue & string>;
  compute: (value: Partial<TValue>) => unknown;
  whenEmpty?: 'clear' | 'keep';
}
export interface QueryFieldBase<TValue extends QueryValue> {
  key: keyof TValue & string;
  type: QueryFieldType;
  label?: string;
  placeholder?: string;
  validators?: ValidatorFn[]; // field-level validators
  // defaultValue?: unknown;
  visibleWhen?: (value: Partial<TValue>) => boolean; // show/hide field based on form values
  // disabledWhen?: (value: Partial<TValue>) => boolean; /**
  dependsOn?: Array<keyof TValue & string>; // list of fields this field depends on - resets value when any dependency changes
  onChange?: (value: any, formGroup: FormGroup) => void; // callback when field value changes
  // readOnly?: boolean | ((value: Partial<TValue>) => boolean); // not editable but included in submit
  // derive?: DerivedRule<TValue>; // auto-compute value based on other fields
  // excludeFromSubmit?: boolean; // if true, field value won't be included in submit payload
}

export interface SelectOption {
  id: string;
  text: string;
}

export interface TextFieldConfig<TValue extends QueryValue>
  extends QueryFieldBase<TValue> {
  type: 'text';
}

export interface NumberFieldConfig<TValue extends QueryValue>
  extends QueryFieldBase<TValue> {
  type: 'number';
}

export interface SelectFieldConfig<TValue extends QueryValue>
  extends QueryFieldBase<TValue> {
  type: 'select';
  options: SelectOption[] | BehaviorSubject<any[]>;
}

export interface AutoCompleteFieldConfig<TValue extends QueryValue>
  extends QueryFieldBase<TValue> {
  type: 'autocomplete';
}

export interface DateFieldConfig<TValue extends QueryValue> extends QueryFieldBase<TValue> {
  type: 'datepicker';
}

export interface CheckboxFieldConfig<TValue extends QueryValue> extends QueryFieldBase<TValue> {
  type: 'checkbox';
}

export interface MultiSelectFieldConfig<TValue extends QueryValue> extends QueryFieldBase<TValue> {
  type: 'multiselect';
  options: SelectOption[] | BehaviorSubject<any[]>;
}

export type QueryFieldConfig<TValue extends QueryValue = QueryValue> =
  TextFieldConfig<TValue>
  | NumberFieldConfig<TValue>
  | AutoCompleteFieldConfig<TValue>
  | SelectFieldConfig<TValue>
  | DateFieldConfig<TValue>
  | CheckboxFieldConfig<TValue>
  | MultiSelectFieldConfig<TValue>;

export type AddableFilterDef<TValue extends QueryValue = QueryValue> =
  QueryFieldConfig<TValue> & {
    pickerLabel?: string;
  };
export interface AddFilterConfig<TValue extends QueryValue = QueryValue> {
  enabled: boolean;
  label?: string; // Label for the button
  searchPlaceholder?: string; // Placeholder for the search input
  available: Array<AddableFilterDef<TValue>>; // addable filters list
}

export type QueryPanelVariant = 'card' | 'flat';
export interface QueryPanelConfig<TValue extends QueryValue = QueryValue> {
  fields: Array<QueryFieldConfig<TValue>>,
  addFilters?: AddFilterConfig<TValue>;
  validation?: { formValidators?: ValidatorFn[] }; // cross-field validators
  variant?: QueryPanelVariant;
  requireAllFields?: boolean; // if true, submit button is disabled unless all fields have values
  requireAtLeastOneField?: boolean; // if true, submit button is disabled unless at least one field has a value
};


