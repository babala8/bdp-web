import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import { SYS_CONS } from '../../../../models/constant';
import { Observable } from 'rxjs';

@Injectable()
export class AddnotesPlanService {

    private url = `${environment.SERVICE_URL}`;
    public ADDNOTE_MODE = SYS_CONS.ADDNOTE_MODE.FIX;
    private suffix = 'ForDev';
    step: 0 | 1 | 2 = 0;

    constructor(private http: HttpClient) {
    }

    setMode(value) {
        this.ADDNOTE_MODE = value || SYS_CONS.ADDNOTE_MODE.FIX;
    }

    page(params): Observable<any> {
        return this.http.get(this.url + 'business/v2/plan', {params: params});
    }

    // 查询加钞计划
    detail(no): Observable<any> {
        return this.http.get(this.url + 'business/v2/plan/' + no);
    }

    // 删除加钞计划
    delete(no): Observable<any> {
        return this.http.delete(this.url + 'business/v2/plan/' + no, {});
    }

    // 添加加钞计划
    add(params): Observable<any> {
        return this.http.post(this.url + 'business/v2/plan', params);
    }

    // 查询决定型设备列表
    qryForCash(params): Observable<any> {
        return this.http.get(this.url + 'business/v2/dev/must', {params: params});
    }

    // 查询预测型设备列表
    qryForPredic(params): Observable<any> {
        return this.http.get(this.url + 'business/v2/dev/predict', {params: params});
    }

    // 查询维护型设备列表
    qryForMaintain(params): Observable<any> {
        return this.http.get(this.url + 'business/v2/dev/maintain', {params: params});
    }

    // 查询计划型设备列表
    qryForRunPlan(params): Observable<any> {
        return this.http.get(this.url + 'business/v2/dev/runPlan', {params: params});
    }

    // 保存加钞设备
    addnotesPlanDevs(params): Observable<any> {
        return this.http.post(this.url + 'business/v2/dev', params);
    }

    // 修改加钞设备
    modAddnotesPlanDevs(params): Observable<any> {
        return this.http.put(this.url + 'business/v2/dev', params);
    }

    // 设备金额预测
    addnotesPlanCashReqAmt(params): Observable<any> {
        return this.http.get(this.url + 'business/v2/cash/forecast', {params: params});
    }

    // 修改加钞金额（金额调整）
    modAddnotesPlanAmts(params): Observable<any> {
        return this.http.put(this.url + 'business/v2/cash', params);
    }

    // 计划分组信息查询
    qryTsp(no): Observable<any> {
        return this.http.get(this.url + 'business/v2/group/' + no);
    }

    // 设备分组并规划线路
    groupTsp(params): Observable<any> {
        return this.http.post(this.url + 'line-center/v2/devLine/group/tsp', params);
    }

    getNetpointsWithDevsOfGroup(params): Observable<any> {
        return this.http.get(this.url + 'channel-center/v2/org/group/netpoints', {params: params});
    }

    // 设备分组详细信息查询
    qryByNo(params): Observable<any> {
        return this.http.get(this.url + 'business/v2/group/detail', {params: params} );
    }

    // 设备分组信息修改
    groupMod(params): Observable<any> {
        return this.http.put(this.url + 'business/v2/group', params);
    }

    // 设备分组线路信息修改
    groupModTsp(params): Observable<any> {
        return this.http.put(this.url + 'line-center/v2/devLine/group/tsp' , params);
    }

    // 获取金库信息
    getClrCenterByClrNo(no): Observable<any> {
        return this.http.get(this.url + 'channel-center/v2/clrCenter/qryClrCenter/' + no);
    }

    // 查询加钞计划分组下的线路
    getPlanGroupRoute(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/devLine/group/route',  {params: params});
    }

    // 查询清分中心下所有设备
    qryAllDevInfo(params): Observable<any> {
        return this.http.get(this.url + 'channel-center/v2/dev/clrCenter', {params: params});
    }

    // 查询加钞模式
    getAddNoteMode(clrCenterNo): Observable<any> {
        return this.http.get(this.url + 'param-center/v2/paramManage/name', {params: {'paramName': 'lineMode_' + clrCenterNo}});
    }

    // 查询金库下所有加钞线路
    getLinesByClrCenter(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/networkLine/lineType', {params: params});
    }

    // 查询金库某一天需要加钞的线路
    getLinesOfday(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/devLine/dateAndClrCenter', {params: params});
    }

    // 加钞计划 提交审核
    submitAudit(params): Observable<any> {
        return this.http.post(this.url + 'business/v2/audit', params);
    }

    // 加钞计划审核功能+出单
    auditPlan(params): Observable<any> {
        return this.http.post(this.url + 'business/v2/task', params);
    }

    // 加钞计划审核+退回
    refusePlan(params): Observable<any> {
        return this.http.post(this.url + 'business/v2/refuse', params);
    }

    // 查询清机中心列表
    getDevInfos(params): Observable<any> {
        return this.http.get(this.url + 'channel-center/v2/dev/clrCenter', {params: params});
    }

    // 查询设备信息及使用信息
    qryInfoOfDev(params): Observable<any> {
        return this.http.get(this.url + 'channel-center/v2/dev/qryDev', {params: params});
    }

    //设备加钞分析
    analysisDevInfo(params): Observable<any> {
        return this.http.get(this.url + 'business/v2/dev/addnotesDevAnalyse', {params: params});
    }
}
