import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translateNg',
  pure: false
})
export class TranslateNgPipe implements PipeTransform {

  private translationService: TranslationService = inject(TranslationService);

  private lastValue = '';
  private lastTag = '';

  constructor() {
    this.translationService.labelsChanged$.subscribe(() => {
      this.lastTag = '';
      this.lastValue = '';
    });
  }

  transform(tag: string): string {

    if (tag !== this.lastTag) {
      this.lastTag = tag;
      this.lastValue = this.translationService.translate(tag);
    }
    return this.lastValue;
  }

}
