import {
    Directive,
    ElementRef,
    NgZone,
    OnDestroy,
    OnInit
  } from '@angular/core';
  
  @Directive({
    selector: '[bsMaterialFocusBridge]'
  })
  export class BsMaterialFocusBridgeDirective
    implements OnInit, OnDestroy {
  
    private readonly CDK_OVERLAY_SELECTOR = '.cdk-overlay-pane';
    private active = false;
  
    private onDocumentFocusIn = (event: FocusEvent) => {
      if (!this.active) return;
  
      const target = event.target as HTMLElement | null;
      if (!target) return;
  
      if (target.closest(this.CDK_OVERLAY_SELECTOR)) {
        // Prevent Bootstrap focus trap from reacting
        event.stopImmediatePropagation();
      }
    };
  
    constructor(
      private el: ElementRef<HTMLElement>,
      private zone: NgZone
    ) {}
  
    ngOnInit() {
      // Modal shown
      this.el.nativeElement.addEventListener('shown.bs.modal', () => {
        this.active = true;
  
        this.zone.runOutsideAngular(() => {
          document.addEventListener(
            'focusin',
            this.onDocumentFocusIn,
            true // capture phase
          );
        });
      });
  
      // Modal hidden
      this.el.nativeElement.addEventListener('hidden.bs.modal', () => {
        this.active = false;
  
        document.removeEventListener(
          'focusin',
          this.onDocumentFocusIn,
          true
        );
      });
    }
  
    ngOnDestroy() {
      document.removeEventListener(
        'focusin',
        this.onDocumentFocusIn,
        true
      );
    }
  }
