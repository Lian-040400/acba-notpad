import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";

@Component({
  selector: 'app-chart',
  standalone: true,

  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  dps = [{x: 1, y: 10}, {x: 2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17},{x: 12, y: 17}];
  chart: any;

  chartOptions = {
    title: {
      fontFamily: "Open Sans, sans-serif",
      text: "Notes Creation Chart",
      fontSize: 12,
    },
    data: [{

      type: "line",
      color: "#00a789",
      showInLegend: true,
      name: "",
      markerType: "square",
      dataPoints: [
        { x: new Date(2024, 0, 3, 1,10,5), y: 650 },
        { x: new Date(2024, 0, 3,3,10,5), y: 700 },
        { x: new Date(2024, 0, 3,6,10,5), y: 710 },
        { x: new Date(2024, 0, 3,2,10,5), y: 658 },
      ]
    }],
    axisX:{
      fontFamily: "arial",
      intervalType: "minute",
      valueFormatString: "D MMMM hh:mm tt",
      fontSize: 12,

    },

  }
  getChartInstance(chart: object) {
    this.chart = chart;
    setTimeout(this.updateChart, 1000); //Chart updated every 1 second
  }
  updateChart = () => {
    var yVal = this.dps[this.dps.length - 1].y +  Math.round(5 + Math.random() *(-5-5));
    this.dps.push({x: this.dps[this.dps.length - 1].x + 1, y: yVal});

    if (this.dps.length >  10 ) {
      this.dps.shift();
    }
    this.chart.render();
    setTimeout(this.updateChart, 1000); //Chart updated every 1 second
  }
}
