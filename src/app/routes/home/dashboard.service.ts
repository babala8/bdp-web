import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {SessionService} from '@core/session.service';
import {map} from 'rxjs/operators';

@Injectable()
export class DashboardService {
    private SERVERAPI = environment.SERVICE_URL;

    constructor(private http: HttpClient,
                private session: SessionService) {
    }

    // 获取用户的已有的主题列表
    getMultiPagesMeta() {
        console.log(this.session);
        return this.http.post(this.SERVERAPI + 'visible/dashBoardManage/qrySelfDefinedParamInfo', {
            type: 'dashboard',
            scope: 2,
        }).pipe(map(val => {
          const pagesMeta = [];
          val['retList'].forEach(v => {
            pagesMeta.push({
              pageId: v['themeNo']
            });
          });
          console.log(pagesMeta);
          return pagesMeta;
        }));
    }

    // 获取用户可见的所有主题(系统内置+自定义)
    getAllPagesMeta() {
        return this.http.post(this.SERVERAPI + 'visible/chartsDevelop/chartModel/qryThemeListOfUser', {
            type: 'dashboard',
            scope: 2,
        }).pipe(map(val => {
          const pagesMeta = [];
          val['retList'].forEach(v => {
            pagesMeta.push({
              pageId: v['subjectId'],
              name: v.subjectName,
              description: v.subjectDesc
            });
          });
          console.log(pagesMeta);
          return pagesMeta;
        }));
    }

    /**
     * 获取主题的配置信息
     *
     * @param pageId
     * @returns {Observable<{homeDef: any; themeName: any; themeDesc: any}>}
     */
    getPageDefById(pageId) {
        return this.http.post(this.SERVERAPI + 'visible/dashBoardManage/qryThemeParamInfo', {
            themeNo: pageId
        }).pipe(map(val => {
          const def = {
            homeDef: JSON.parse(val['content']),
            themeName: val['subjectName'],
            themeDesc: val['subjectDesc']
          };

          console.log(def);
          return def;
        }));
    }

    /**
     * 新增内置主题
     * 用户可以选择其他内置的主题展现在自己的驾驶舱中
     *
     * @param {{pageId: string}} params
     * @returns {Observable<Object>}
     */
    //
    addNewPageDef(params: { pageId: string }) {
        return this.http.post(this.SERVERAPI + 'visible/dashBoardManage/saveSelfDefinedParamInfo', {
            data: {
                type: 'dashboard',
                scope: 2,
                themeNo: params.pageId,
            }
        });
    }

    // 新增(自定义)主题
    addUserNewPageDef(params: { name: string, desc: string, icon: string }) {
        return this.http.post(this.SERVERAPI + 'visible/chartsDevelop/chartModel/themeInfo', {
            type: 'add',
            data: {
                subjectType: 1,
                subjectName: params.name,
                subjectDesc: params.desc,
                subjectIcon: params.icon
            }
        });
    }

    // 删除主题
    deletePageById(pageId) {
        return this.http.post(this.SERVERAPI + 'visible/dashBoardManage/delSelfDefinedParamInfo', {
            data: {
                type: 'dashboard',
                scope: 2,
                themeNo: pageId,
            }
        });
    }

    // 更新主题的配置信息
    updatePageDefById(params: { pageId: string, homeDef: any }) {
        return this.http.post(this.SERVERAPI + 'visible/dashBoardManage/updateSelfDefinedParamInfo', {
            data: {
                type: 'dashboard',
                scope: 2,
                themeNo: params.pageId,
                content: params.homeDef
            }
        });
    }

    // 获取自定义的图表
    getChartsDef() {
        return this.http.post(this.SERVERAPI + 'visible/chartsManage/chart/qryChartList', {
            chartOrgNo_Query: this.session.orgNo
        }).pipe(map(data => {
          const retList = [];
          data['retList'].forEach(val => {
            if (val['type'] === '0') {
              val.id = val.chartId;
              retList.push(val);
            }
          });
          console.log(retList);
          return retList;
        }));
    }

    // 获取图表详细信息
    getOptionAndDataById(id) {
        return this.http.post(this.SERVERAPI + 'visible/chartsManage/chart/qryServiceDataAndView', {
            chartId: id
        }).pipe(map(data => {
          console.log(data);
          return {
            element: data['retData']
          };
        }));

    }


}
