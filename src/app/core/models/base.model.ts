export class BaseModel {
  public static transform<T extends BaseModel>(data: any, ...rest: any[]): T {
    return new this(data, ...rest) as T;
  }

  public static transformCollection<T extends BaseModel>(data: any[], ...rest: any[]): T[] {
    // @ts-ignore
    return data.map(item => this.transform.call(this, item, ...rest));
  }

  protected constructor(data: any = {}, ...rest: any[]) {
  }
}
