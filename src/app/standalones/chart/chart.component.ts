import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class ChartComponent implements OnInit, OnChanges {
  @Input() pending!: boolean;
  dataPoints: ChartDataI[] = [];
  notes: Note[] = [];
  chart!: any;

  constructor(
    private dynamicChartDataService: DynamicChartDataService) {
  }

  ngOnInit() {
    this.dynamicChartDataService.chartData$.subscribe((val) => {
      this.dataPoints = val;
      this.chart = new CanvasJS.Chart("chartContainer", {
        styles: "{width: '100%', height: '360px'}",
        responsive: true,
        maintainAspectRatio: false,
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Notes Creation Chart",
          fontSize: 12,
        },
        axisX:{
          labelFontSize: 10
        },
        axisY:{
          labelFontSize: 10
        },
        data: [{
          type: "stepLine",
          color: "#00a789",
          dataPoints: this.dataPoints
        }]
      });
      this.chart.render();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!this.pending){
      this.chart.render();
    }
  }
}
