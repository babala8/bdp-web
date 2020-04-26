export interface IOrgGrade {
  no: string;
  name: string;
}

export class OrgGrade {
  constructor(public no?: string,   // todo: number类型赋值类型转换问题
              public name?: string) {
  }
}
