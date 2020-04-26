import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

/** 仓储中心服务 */
@Injectable()
export class StorageCenterService {

  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  getInventory(params): Observable<any> {
    return this.http.get(this.url + 'storage/v2/goodManage', {params: params});
  }

  /** 查询交易信息 */
  getCheckInventoryInfo(params) {
    return this.http.get(this.url + 'storage/v2/goodManage/qryCheckInfo', {params: params});
  }

  checkInventory(params) {
    return this.http.post(this.url + 'storage/v2/goodManage/check', params);
  }

  /** 获取任务单详情 */
  getTaskDetail(params): Observable<any> {
    return this.http.get(this.url + 'storage/v2/goodManage/detail', {params: params});
  }

  /** 获取库房物品信息 */
  getStorageEntityList(params): Observable<any> {
    return this.http.get(this.url + 'storage/v2/goodManage/storageEntity', {params: params});
  }

  /** 钞处任务单绑定箱子出库 */
  outWarehouseCashbox(params): Observable<any> {
    return this.http.put(this.url + 'storage/v2/goodManage/affirmOut', params);
  }

  /** 根据容器号查询任务单明细 */
  getMatchResult(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task/qryBycontainerNo', {params: params});
  }

  /** 入库 */
  goodInWithShelf(params): Observable<any> {
    return this.http.post(this.url + 'storage/v2/goodIn/bankNoteInWithShelf', params);
  }

  /** 获取出库任务单列表 */
  getGoodOutOrder(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task', {params: params});
  }

  /**  批量出库（往物流） */
  outWarehouseBatch(params): Observable<any> {
    return this.http.put(this.url + 'task/v2/task/taskStatusBatch', params);
  }

  /** 审核 */
  audit(params): Observable<any> {
    return this.http.put(this.url + 'task/v2/task', params);
  }

  /** 确认出库 */
  goodCheckOut(params): Observable<any> {
    return this.http.post(this.url + 'storage/v2/goodOut/outTransferUntied', params);
  }

  // 查询产品详细信息
  getServiceDetail(serviceNo): Observable<any> {
    return this.http.get(this.url + `product-center/v2/serviceInfo/${serviceNo}`, {});
  }

  /**
   * 查询笼车/托盘信息
   * @param params
   */
  qryShelfList(params): Observable<any> {
    return this.http.get(this.url + 'storage/v2/shelf', {params: params});
  }

  /**
   * 查询笼车/托盘详细信息
   * @param shelfNo
   */
  qryShelfDetail(shelfNo):Observable<any>{
    return this.http.get(this.url + 'storage/v2/shelf/'+shelfNo);
  }

  /**
   * 添加笼车/托盘
   * @param params
   */
  addShelf(params): Observable<any> {
    return this.http.post(this.url + 'storage/v2/shelf', params);
  }

  /**
   * 修改笼车/托盘信息
   * @param params
   */
  editShelf(params): Observable<any> {
    return this.http.put(this.url + 'storage/v2/shelf', params);
  }

  /**
   * 删除笼车/托盘编号
   * @param shelfNo
   */
  deleteShelf(shelfNo): Observable<any> {
    return this.http.delete(this.url + `storage/v2/shelf/${shelfNo}`);
  }

}
