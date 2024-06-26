import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {Note} from "../../models/note.model";

@Injectable({
  providedIn: 'root'
})
export class DynamicChartDataService {
  private chartData = new ReplaySubject<any>(1);
  public chartData$ = this.chartData.asObservable();

  constructor() {
  }

  set notes(value: Note[]) {
    this.chartData.next(this.convertNotesDataToChartData(value));
  }

  private convertNotesDataToChartData(notes: Note[]) {
    const uniqDates = new Set();
    notes.forEach(note => {
      uniqDates.add(note.date)
    });
    const uniqDatesArray = Array.from(uniqDates);
    const noteDateAndTotalCount: any = {};
    uniqDatesArray.forEach((date: any) => noteDateAndTotalCount[date] = 0);

    for (let key in noteDateAndTotalCount) {
      notes.forEach(note => {
        if (key === note.date) {
          noteDateAndTotalCount[key]++;
        }
      });
    }
    const chartData: any[] = []
    for (const key in noteDateAndTotalCount) {
      chartData.push({x:new Date(key),y:noteDateAndTotalCount[key]})
    }
    return chartData;
  }
}
