import {BaseModel} from "./base.model";

export class Note extends BaseModel {
  id: string
  title: string;
  note: string;
  date: string;

  constructor(data: any) {
    super(data);
    this.note = data.note;
    this.title = data.title;
    this.date = data.date;
    this.id = data.id;
  }
}
