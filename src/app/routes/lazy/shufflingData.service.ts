import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '@core/session.service';

@Injectable()
export class ShufflingDataService {
  constructor(private http: HttpClient,
              private session: SessionService) {
  }

  private url = `${environment.SERVICE_URL}`;

  transactionDistAnalysisData;
  transactionTypeAnalysisData;


  // 轮播图交易分布分析柱状图所需数据源，初始化大屏时运行此方法，调用查询接口赋值数据
  // 后每当柱状组件初始化时，运行此方法,进else直接返回数据源
  getTransTypeByUpperOrgNo() {
    return new Promise((resolve, reject) => {
      if (this.transactionDistAnalysisData) {
        resolve(this.transactionDistAnalysisData);
      } else {
        const params = {
          orgNo: this.session.orgNo,
          orgGradeNO: 0,
        };
        this.http.get(this.url + 'insight/v2/portal/transAmtRank').subscribe(_data => {
          this.transactionDistAnalysisData = _data['retList'];
          resolve(this.transactionDistAnalysisData);
        });
      }
    });
  }

  // 轮播图交易类型分析饼图所需数据源，初始化大屏时运行此方法，调用查询接口赋值数据
  // 后每当柱状组件初始化时，运行此方法,进else直接返回数据源
  getTransTypeByOrgNo() {
    return new Promise((resolve, reject) => {
      if (this.transactionTypeAnalysisData) {
        resolve(this.transactionTypeAnalysisData);
      } else {
        const params = { orgNo: this.session.orgNo };
        this.http.post(this.url + 'visible/screen/getTransTypeByOrgNo', params).subscribe(_data => {
          this.transactionTypeAnalysisData = _data['retList'];
          resolve(this.transactionTypeAnalysisData);
        });
      }
    });
  }

  // 退出大屏时销毁大屏组件时，清空所有数据源
  clean() {
    this.transactionDistAnalysisData = null;
    this.transactionTypeAnalysisData = null;
  }


}
