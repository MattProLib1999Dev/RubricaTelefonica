import { Component, EventEmitter, forwardRef, Host, Input, Optional, Output, signal, SkipSelf, WritableSignal } from "@angular/core";
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from "@angular/forms";
import { IdService } from "../../services/id.service";
import { formControlSize } from "../../enums/formControlSize";

@Component({
    selector: 'sh-basecomponent',
    standalone: true,
    imports: [],
    template: ''
})
export class BaseComponent implements ControlValueAccessor, Validator {
    
    constructor(@Optional() @Host() @SkipSelf()
        private controlContainer: ControlContainer) {
        
    }

    private _uid: string = IdService.uuidv4();

    public get uid(): string {
        return "c_" + this._uid;
    }

    private _formControl!: FormControl;

    @Input()
    formControlName: string = "";

    public get formControl(): FormControl {
        return this._formControl;
    }

    private _value: WritableSignal<string> = signal("");

    public get value() {
        return this._value();
    }

    public get valueSign() {
        return this._value;
    }

    public set value(value: string) {
        this._value.set(value);
        this.onChangeFn(value);

        //event
        this.valueChanged.emit(value);
    }

    //===============================
    //  Event section
    //===============================

    @Output()
    valueChanged: EventEmitter<any> = new EventEmitter<any>();


    //===============================
    //  Information section
    //===============================

    private _label: string = "";
    private _showRequired: boolean = true;

    @Input()
    set showRequired(value: boolean) {

        this._showRequired = value;

        if(!this._showRequired && this._label?.indexOf(" *") > 0) {
            this._label = this._label.substring(0, this._label?.lastIndexOf(" *"));
        }

    }
    
    @Input()
    set label(value: string) {

        this._label = value;

        if(this._showRequired && this._label?.length > 0 && this.formControlName.length > 0 
            && this.controlContainer?.control?.get(this.formControlName)?.hasValidator(Validators.required)) {
            this._label += " *";
        }

    }

    get label(): string {
        return this._label;
    }

    @Input()
    public inlineLabel: boolean = false;

    @Input()
    public inlineLabelSize: number | string = 12;

    public get inlineLabelClass(): string {
        return 'col-' + this.inlineLabelSize;
    }

    @Input()
    public placeholder: string = "";

    @Input()
    public readonly: boolean = false;

    private _isDisabled = signal(false);

    public get isDisabled(): WritableSignal<boolean> {
        return this._isDisabled;
    }

    @Input()
    size: formControlSize | string = "";

    //===============================
    // Validation section
    //===============================

    @Input()
    validatorTranslator: any = {}

    @Input()
    validatorToolTip: boolean = false;

    @Input()
    showValidators: boolean = true;


    public get hasValidator() {
        return true;
    }

    public get isValid(): boolean {
        return this._formControl?.valid ?? false;
    }

    public get isDirty() {
        return this._formControl ? this._formControl.dirty : false;
    }

    public get errors(): string[] {
        if (!this._formControl.errors)
            return [];

        return Object.entries(this._formControl.errors).filter(error => error[1]).map(error => {

            if (this.validatorTranslator[error[0]])
                return this.validatorTranslator[error[0]];

            return error[0]
        });
    }

    //=============================
    // IMPLEMENTATION
    //=============================

    private onChangeFn: (value: string) => void = (value: string) => { };
    private onTouchedFn: () => void = () => { };
    private onValidatorChangeFn: () => void = () => { };

    writeValue(value: string): void {
        this._value.set(value);
        //update validator
        this.onValidatorChangeFn();
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedFn = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this._isDisabled.set(isDisabled);
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (control instanceof FormControl) {
            if (!this._formControl)
                this._formControl = control as FormControl;
        }
        return null;
    }

    registerOnValidatorChange?(fn: () => void): void {
        this.onValidatorChangeFn = fn;
    }

    public onBlur(): void {
        this.onTouchedFn();
    }

    public onChange(value: string): void {
        this.onChangeFn(value);
    }

    public static baseProvider<T>(component: T) {
        return [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => component),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: component
        }]
    }

}
