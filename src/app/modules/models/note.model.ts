import {BaseModel} from "./base.model";

export class Note extends BaseModel {
  id: string
  name: string;
  description: string;
  date: string;

  constructor(data: any) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.date = data.date;
    this.id = data.id;
  }
}
