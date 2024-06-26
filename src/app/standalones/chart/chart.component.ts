import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanvasJS, CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {Note} from "../../core/models/note.model";
import {DynamicChartDataService} from "../../core/services/dynamic-chart-data/dynamic-cart-data.service";
import {ChartDataI} from "../../core/interface/chart-data";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  dataPoints: ChartDataI[] = [];
  notes: Note[] = [];

  constructor(
    private dynamicChartDataService: DynamicChartDataService) {
  }

  ngOnInit() {
    this.dynamicChartDataService.chartData$.subscribe((val) => {
      this.dataPoints = val;
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Notes Creation Chart",
          fontSize: 12,
        },
        data: [{
          type: "stepLine",
          color: "#00a789",
          dataPoints: this.dataPoints
        }]
      });
      chart.render();
    });
  }
}
