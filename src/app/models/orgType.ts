export interface IOrgType {
    no: string;
    name: string;
    grade: number;
}

export class OrgType {
  constructor(
      public no?: string,   // todo: number类型赋值类型转换问题
      public name?: string,
      public grade?: number,
      ) {
  }
}
