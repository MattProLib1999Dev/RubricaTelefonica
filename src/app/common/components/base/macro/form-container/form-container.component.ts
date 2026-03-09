import { Component, OnInit, ViewContainerRef, ɵcompileComponent, ɵglobal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { JitCompilerFactory } from '@angular/platform-browser-dynamic'
import { TextboxNgComponent } from '../../_index';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.css'
})
export class FormContainerComponent implements OnInit {

  private componentInstance: any;
  //https://stackoverflow.com/questions/46576727/angular-compile-and-create-components-at-runtime
  constructor(private vc: ViewContainerRef) {

  }

  ngOnInit(): void {
    this.create();
  }

  create() {

    const template = '<sh-textbox [formControl]="c"></sh-textbox>';

    import('@angular/compiler').then((compiler) => {
      compiler.publishFacade(ɵglobal);

      const dynamicComponent = Component({
        template: template, jit: true, standalone: true, imports: [
          FormsModule, ReactiveFormsModule, TextboxNgComponent
        ]
      })(class {
        c: FormControl = new FormControl('', Validators.required)

      });
      this.vc.createComponent(dynamicComponent);
    });


    // const template = '<span>generated on the fly: {{name}}</span>';

    // const tmpCmp = Component({
    //   template: template,
    //   jit: true,
    //   standalone: true
    // })(class {
    // });

    // this.vc.createComponent(tmpCmp);

    // var classDefinition = class {
    //   name: string = "ciao";
    //   c: FormControl = new FormControl('')
    //   prova = () => { }
    // };

    // let template = '<sh-textbox [formControl]="c"></sh-textbox>';

    // ɵcompileComponent(classDefinition, {
    //   template: template, standalone: true,
    //   selector: 'gogogo',
    //   imports: [FormsModule, ReactiveFormsModule, TextboxNgComponent]
    // });

    // this.componentInstance = this.vc.createComponent(classDefinition);
  }
}
