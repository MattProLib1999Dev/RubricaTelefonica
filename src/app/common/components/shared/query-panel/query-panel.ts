import { Component, effect, input, signal, ViewChild, ElementRef, HostListener, computed, output } from '@angular/core';
import { CardNgComponent, ButtonNgComponent, SelectNgComponent, CheckNgComponent, MultiSelectNgComponent, AutocompleteNgComponent, TextboxNgComponent } from "../../base/_index";
import { AddableFilterDef, QueryFieldConfig, QueryPanelConfig, QueryPanelVariant, QueryValue } from './query-panel.types';
import { FormGroup, ReactiveFormsModule, FormControl, ValidatorFn } from '@angular/forms';
import { DatePickerNgComponent } from '../../base/datepicker-ng/datepicker-ng.component';
import { NgTemplateOutlet } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'sh-query-panel',
  imports: [
    CardNgComponent,
    ButtonNgComponent,
    ReactiveFormsModule,
    SelectNgComponent,
    CheckNgComponent,
    DatePickerNgComponent,
    MultiSelectNgComponent,
    AutocompleteNgComponent,
    TextboxNgComponent,
    NgTemplateOutlet
  ],
  templateUrl: './query-panel.html',
  styleUrl: './query-panel.scss',
})
export class QueryPanelComponent {
  // ---------------------------
  // INPUT
  // ---------------------------
  title = input<string>();
  submitText = input<string>('Cerca');
  clearText = input<string>('Reset');
  config = input.required<QueryPanelConfig>();
  variant = input<QueryPanelVariant>('flat');

  // ---------------------------
  // OUTPUT
  // ---------------------------
  querySubmit = output<QueryValue>();
  queryClear = output<void>();

  // ---------------------------
  // UI STATE
  // ---------------------------
  form = signal<FormGroup>(new FormGroup({}));
  formValue = signal<QueryValue>({});
  previousFormValue = signal<QueryValue>({}); // Track previous values for dependency reset
  expanded = signal(false);
  activeFilterKeys = signal<string[]>([]);
  baseFields = signal<QueryFieldConfig[]>([]);
  addableFields = signal<AddableFilterDef[]>([]);
  resetCommands = signal<Record<string, BehaviorSubject<boolean>>>({});
  filterSearchTerm = signal<string>('');

  // ---------------------------
  // REF
  // ---------------------------
  @ViewChild('filterDropdownRef') filterDropdownRef!: ElementRef;

  // ---------------------------
  // CONST
  // ---------------------------
  typesWithReset = ['autocomplete', 'multiautocomplete', 'multiselect'];

  constructor() {
    effect(() => {
      const cfg = this.config();
      this.baseFields.set(cfg.fields);
      this.addableFields.set(cfg.addFilters?.available ?? []);
      this.initializeResetCommands(cfg.fields);
      this.buildBaseForm(cfg);
    })
  }

  // ---------------------------
  // FORM SETUP
  // ---------------------------
  visibleFields = computed(() => {
    const base = this.baseFields();
    const addable = this.addableFields();
    const activeKeys = new Set(this.activeFilterKeys());
    const formValue = this.formValue();

    // Filtra i campi attivi basandosi su visibleWhen
    const active = addable.filter(f => {
      if (!activeKeys.has(f.key)) return false;
      if (f.visibleWhen) {
        return f.visibleWhen(formValue);
      }
      return true;
    });

    return [...base, ...active];
  });

  availableFilters = computed<AddableFilterDef[]>(() => {
    const addable = this.addableFields();
    const activeKeys = new Set(this.activeFilterKeys());
    const searchTerm = this.filterSearchTerm().toLowerCase().trim();
    const formValue = this.formValue();

    const available = addable.filter(f => {
      if (activeKeys.has(f.key)) return false;

      if (f.visibleWhen && !f.visibleWhen(formValue)) return false;
      return true;
    });

    if (!searchTerm) {
      return available;
    }

    return available.filter(f => {
      const label = (f.pickerLabel || f.label || '').toLowerCase();
      return label.includes(searchTerm);
    });
  });

  isSubmitDisabled = computed(() => {
    const cfg = this.config();
    const formValue = this.formValue();
    const allFields = this.visibleFields();

    // Check if all fields are required
    if (cfg.requireAllFields) {
      return allFields.some(field => {
        const value = formValue[field.key];
        return value === null || value === undefined || value === '';
      });
    }

    // Check if at least one field is required
    if (cfg.requireAtLeastOneField) {
      return allFields.every(field => {
        const value = formValue[field.key];
        return value === null || value === undefined || value === '';
      });
    }

    return false;
  });

  initializeResetCommands(fields: QueryFieldConfig[]) {
    const commands: Record<string, BehaviorSubject<boolean>> = {};

    fields.forEach(field => {
      if (this.typesWithReset.includes(field.type)) {
        commands[field.key] = new BehaviorSubject<boolean>(false);
      }
    });

    this.resetCommands.set(commands);
  }

  buildBaseForm(cfg: QueryPanelConfig) {
    const controls: Record<string, FormControl> = {};

    cfg.fields.forEach(field => {
      controls[field.key] = new FormControl('', field.validators ?? []);
    });

    const formValidators: ValidatorFn[] = cfg.validation?.formValidators ?? [];

    const group = new FormGroup(controls, {
      validators: formValidators.length ? formValidators : null
    });

    group.valueChanges.subscribe(value => {
      this.handleDependencyReset(value);
      this.handleFieldChanges(value, group);
      // this.handleDerivedFields(value);
      this.formValue.set(value);
      this.handleVisibilityChanges(value);
      this.previousFormValue.set(value);
    });

    this.formValue.set(group.value);
    this.previousFormValue.set(group.value);

    this.form.set(group);

    group.updateValueAndValidity({ emitEvent: false });
  }

  getResetCommand(key: string): BehaviorSubject<boolean> | undefined {
    return this.resetCommands()[key];
  }

  // ---------------------------
  // FIELD CHANGE HANDLERS
  // ---------------------------
  private handleFieldChanges(value: QueryValue, formGroup: FormGroup) {
    const prevValue = this.previousFormValue();
    const allFields = [...this.baseFields(), ...this.addableFields()];

    allFields.forEach(field => {
      if (!field.onChange) return;

      const currentValue = value[field.key];
      const previousValue = prevValue[field.key];

      if (currentValue !== previousValue) {
        field.onChange(currentValue, formGroup);
      }
    });
  }

  // ---------------------------
  // DERIVED FIELDS
  // ---------------------------
  // private handleDerivedFields(value: QueryValue) {
  //   const form = this.form();
  //   const allFields = [...this.baseFields(), ...this.addableFields()];
  //   const prevValue = this.previousFormValue();

  //   allFields.forEach(field => {
  //     if (!field.derive) return;

  //     const { deps, compute, whenEmpty } = field.derive;

  //     // Check if any dependency changed
  //     const depsChanged = deps.some(dep => value[dep] !== prevValue[dep]);
  //     if (!depsChanged) return;

  //     // Check if dependencies are empty
  //     const depsEmpty = deps.every(dep => !value[dep]);
  //     if (depsEmpty && whenEmpty === 'keep') return;
  //     if (depsEmpty && whenEmpty === 'clear') {
  //       form.patchValue({ [field.key]: '' }, { emitEvent: false });
  //       return;
  //     }

  //     // Compute new value
  //     const newValue = compute(value);
  //     if (newValue !== value[field.key]) {
  //       form.patchValue({ [field.key]: newValue }, { emitEvent: false });
  //     }
  //   });
  // }

  // ---------------------------
  // FORM ACTIONS
  // ---------------------------
  onClear() {
    const form = this.form();
    const commands = this.resetCommands();

    Object.values(commands).forEach(subject => {
      subject.next(true);
    });

    for (const key of this.activeFilterKeys()) {
      form.removeControl(key);
    }

    this.activeFilterKeys.set([]);

    const initialValue = Object.fromEntries(this.visibleFields().map(f => [f.key, '']));

    form.reset(initialValue);

    // form.reset()

    setTimeout(() => {
      Object.values(commands).forEach(subject => {
        subject.next(false);
      });
    }, 0);

    this.queryClear.emit();
  }

  onSubmit() {
    if (this.form().valid) {
      this.querySubmit.emit(this.form().value);
    } else {
      this.form().markAllAsDirty();
    }
  }

  // ---------------------------
  // ADD/REMOVE FILTERS DROPDOWN
  // ---------------------------
  toggleFilterDropdown() {
    this.expanded.update(val => !val);
    if (!this.expanded()) {
      this.filterSearchTerm.set('');
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterSearchTerm.set(input.value);
  }

  selectFilter(field: AddableFilterDef) {
    const form = this.form();
    if (!form.contains(field.key)) {
      form.addControl(field.key, new FormControl('', field.validators ?? []));

      if (this.typesWithReset.includes(field.type)) {
        this.resetCommands.update(commands => ({
          ...commands,
          [field.key]: new BehaviorSubject<boolean>(false)
        }));
      }
    }

    this.activeFilterKeys.update(keys =>
      keys.includes(field.key) ? keys : [...keys, field.key]
    );

    // Aggiungi automaticamente i filtri dipendenti
    this.addDependentFilters();

    this.expanded.set(false);
  }

  private addDependentFilters() {
    const formValue = this.formValue();
    const addable = this.addableFields();
    const activeKeys = this.activeFilterKeys();

    // Trova filtri con visibleWhen che dovrebbero essere visibili
    addable.forEach(field => {
      if (field.visibleWhen && field.visibleWhen(formValue)) {
        if (!activeKeys.includes(field.key)) {
          const form = this.form();
          if (!form.contains(field.key)) {
            form.addControl(field.key, new FormControl('', field.validators ?? []));

            if (this.typesWithReset.includes(field.type)) {
              this.resetCommands.update(commands => ({
                ...commands,
                [field.key]: new BehaviorSubject<boolean>(false)
              }));
            }
          }

          this.activeFilterKeys.update(keys => [...keys, field.key]);
        }
      }
    });
  }

  private handleVisibilityChanges(value: QueryValue) {
    const addable = this.addableFields();
    const activeKeys = this.activeFilterKeys();
    const form = this.form();

    // Rimuovi filtri che non soddisfano più visibleWhen
    activeKeys.forEach(key => {
      const field = addable.find(f => f.key === key);
      if (field?.visibleWhen && !field.visibleWhen(value)) {
        form.removeControl(key);
        this.activeFilterKeys.update(keys => keys.filter(k => k !== key));
      }
    });

    // Aggiungi filtri che ora soddisfano visibleWhen
    this.addDependentFilters();
  }

  private handleDependencyReset(currentValue: QueryValue) {
    const previousValue = this.previousFormValue();
    const allFields = [...this.baseFields(), ...this.addableFields()];
    const form = this.form();
    const activeKeys = this.activeFilterKeys();

    // Trova quali campi sono cambiati
    const changedFields = Object.keys(currentValue).filter(
      key => currentValue[key] !== previousValue[key]
    );

    if (changedFields.length === 0) return;

    // Raccoglie i campi da rimuovere
    const fieldsToRemove: string[] = [];

    // Per ogni campo cambiato, trova i campi che dipendono da esso
    allFields.forEach(field => {
      if (field.dependsOn && field.dependsOn.length > 0) {
        // Se almeno uno dei campi da cui dipende è cambiato, rimuovi il campo
        const shouldRemove = field.dependsOn.some(dep => changedFields.includes(dep));

        if (shouldRemove && activeKeys.includes(field.key)) {
          fieldsToRemove.push(field.key);
        }
      }
    });

    // Rimuovi i campi dipendenti dal form e dagli activeFilterKeys
    if (fieldsToRemove.length > 0) {
      fieldsToRemove.forEach(fieldKey => {
        // Rimuovi il controllo dal form
        if (form.contains(fieldKey)) {
          form.removeControl(fieldKey);
        }

        // Rimuovi il reset command se esiste
        const resetCmd = this.resetCommands()[fieldKey];
        if (resetCmd) {
          this.resetCommands.update(commands => {
            const { [fieldKey]: removed, ...rest } = commands;
            return rest;
          });
        }
      });

      // Aggiorna activeFilterKeys rimuovendo tutti i campi da rimuovere
      this.activeFilterKeys.update(keys =>
        keys.filter(k => !fieldsToRemove.includes(k))
      );
    }
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.filterDropdownRef?.nativeElement) {
      return;
    }

    const clickedElement = event.target as HTMLElement;
    const isClickInsideDropdown = this.filterDropdownRef.nativeElement.contains(clickedElement);

    if (!isClickInsideDropdown) {
      this.expanded.set(false);
    }
  }
}
