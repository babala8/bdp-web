import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class LazyService {
    private SERVERAPI = environment.SERVICE_URL;

    constructor(private http: HttpClient) {
    }

    private url = `${environment.SERVICE_URL}`;


    // 查询当前设备余钞量
    getCashStockByOrg(params): Observable<any> {
        return this.http.post(this.url + 'visible/screen/getCashStockByOrg', params);
    }

    // 查询设备历史余钞量（近7天）
    getCashStockByOrgForLine(params): Observable<any> {
        return this.http.post(this.url + 'visible/screen/getCashStockByOrgForLine', params);
    }

    // 根据机构号查询服务率
    getServiceRateByOrgNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/screen/getServiceRateByOrgNo', params);
    }

    // 根据机构号查询服务质量
    getServiceQualityByOrgNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/screen/getServiceQualityByOrgNo', params);
    }

    // 查询设备交易占比（近一个月）
    getTransTypeByOrgNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/screen/getTransTypeByOrgNo', params);
    }

    // 查询子机构设备交易占比（近一个月）
    getTransTypeByUpperOrgNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/screen/getTransTypeByUpperOrgNo', params);
    }

    // 根据机构号查询存取款历史信息
    // getTransListByOrgNo(params): Observable<any> {
    //     return this.http.post(this.url + 'visible/screen/getTransListByOrgNo', params);
    // }

    // 根据指定信息查询排名信息
    qryRanking(params): Observable<any> {
        return this.http.post(this.url + 'visible/screen/qryRanking', params);
    }


    // 根据机构号查询存取款预测信息
    getPredictTransListByOrgNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/screen/getPredictTransListByOrgNo', params);
    }

    // 根据设备编号查询详细信息
    qryDevBaseInfoByNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/screen/qryDevBaseInfoByNo', params);
    }

    /**************************************************大屏接口**************************************************/
    // 根据机构号查询ATM设备回钞率左上一
    getAtmCashReturnRate(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/getAtmCashReturnRate', params);
    }

    // 根据机构号查询现金收付率左上二
    getOrgTransProportionByOrgNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/getOrgTransProportionByOrgNo', params);
    }

    // 根据条件查询设备加钞量排名左中
    getAddCashAmtRanking(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/getAddCashAmtRanking', params);
    }

    // 根据机构号查询设备加钞详情左中翻转
    getAddCashAmtByDevNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/getAddCashAmtByDevNo', params);
    }

    // 根据机构号查询交易历史左下
    getTransListByOrgNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/getTransListByOrgNo', params);
    }

    // 根据机构号查询机构现金库存中上左css
    getCashStockByOrgNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/getCashStockByOrgNo', params);
    }

    // 根据机构号查询机构库存历史信息中上左line
    getCashStockHisByOrgNo(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/getCashStockHisByOrgNo', params);
    }

    // 根据指定信息查询机构现金收付量排名中上右css 中下柱
    qryOrgTransAmtRanking(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/qryOrgTransAmtRanking', params);
    }

    // 根据机构编号查询设备收付量信息中上右line
    getOrgTransHisById(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/getOrgTransHisById', params);
    }

    // 根据指定信息查询现金收付量排名右上
    qryTransAmtRanking(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/qryTransAmtRanking', params);
    }

    // 根据设备编号查询收付量信息右上翻转
    getDevTransInfoById(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/getDevTransInfoById', params);
    }

    // 根据机构号查询设备付出类型占比右下
    getDevTransProportion(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/getDevTransProportion', params);
    }

    // 查询所有机构现金收付量信息中下地图
    qryAllOrgTransAmt(params): Observable<any> {
        return this.http.post(this.url + 'visible/chartsDevelop/portal/qryAllOrgTransAmt', params);
    }


}
