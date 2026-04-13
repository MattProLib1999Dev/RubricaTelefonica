import { Component, Input, OnDestroy } from '@angular/core';
import { chartData } from '../../../_index';
import Chart from 'chart.js/auto';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IdService } from '../../../services/id.service';
import { TranslateNgPipe } from '../../../pipes/translate-ng-pipe';

@Component({
  selector: 'sh-chart',
  standalone: true,
  imports: [TranslateNgPipe],
  templateUrl: './chart-ng.component.html',
  styleUrl: './chart-ng.component.scss'
})
export class ChartNgComponent implements OnDestroy {

  private _uid: string = IdService.uuidv4();
  chart: any = [];

  current: chartData = {
    datasets: [],
    labels: []
  };

  @Input()
  type: string = "bar";

  @Input()
  nodatatext: string = "NO_DATA";

  @Input()
  height: number | null = null;

  _subscription: Subscription = null!;

  @Input()
  set load(value: BehaviorSubject<chartData>) {

    if (this._subscription)
      this._subscription.unsubscribe();

    this._subscription = value.subscribe(data => {
      this.current = data;

      if (this.chart && this.chart.destroy) {
        this.chart.destroy();
      }

      if (!document.getElementById(this.uid))
        return;

      var config: any = {

      };

      switch (this.type) {
        case "bar":
          config.type = "bar";
          config.options = {
            scales: {
              y: {
                beginAtZero: true,
              },
            }
          };

          break;
        case "line":
          config.type = "line";
          config.options = {
            scales: {
              y: {
                beginAtZero: true,
              },
            }
          };
          break;
        case "pie":
          config.type = "pie";

          break;
      }

      config.data = data;

      this.chart = new Chart(this.uid, config);

    });
  }

  public get uid(): string {
    return "c_" + this._uid;
  }

  constructor() {

  }

  get nodata(): boolean {
    return !this.current.datasets || this.current.datasets.length == 0 || this.current.datasets[0].data.length == 0;
  }

  ngOnDestroy(): void {
    if (this.chart && this.chart.destroy) {
      this.chart.destroy();
    }
  }

}
