import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { CommonService } from 'app/routes/common.service';
import { ServiceCenterService } from '../../service-center.service';
import { ServiceManageService } from '../service-manage.service';

/**
 * @description 服务流程管理
 * @export
 * @class StatusTransitionComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './status-transition.component.html',
})
export class StatusTransitionComponent implements OnInit {
  serviceInfo;
  statusList = [];
  statusTransitionList = [];
  serviceInfoDetail: any = {};
  loading = false;
  moduleList = [];    // 模块列表
  statusObj = {};
  moduleObj = {};
  operateList = [];
  operateObj = {};
  weakNodeList = [
    {
      label: '强节点',
      value: 0,
    },
    {
      label: '弱节点',
      value: 1,
    },
  ];
  weakNodeObj = {};

  constructor(
    private serviceManageService: ServiceManageService,
    private message: NzMessageService,
    private modalRef: NzModalRef,
  ) {
  }

  ngOnInit(): void {
    this.qryModuleList();
    this.initData();
    this.qryOperate();
    this.weakNodeList.forEach(item => {
      this.weakNodeObj[item.value] = item.label;
    });
  }

  // 查询操作列表
  qryOperate() {
    this.serviceManageService.qryOperateList({})
      .subscribe(_data => {
        this.operateList = _data['retList'];
        this.operateList.forEach(item => {
          this.operateObj[item.operateType] = item;
        });
        console.log(_data);
      });
  }

  // 查询服务详情
  initData(): void {
    this.serviceManageService.getServiceDetail(this.serviceInfo.serviceNo)
      .subscribe(result => {
        this.serviceInfoDetail = result;
        this.statusList = result['statusList'];
        if (this.statusList.length === 0) {
          this.statusList.push({ status: 201, name: '已创建' });
        }
        this.statusTransitionList = result['statusConvertList'];
        this.statusList.forEach(item => {
          this.statusObj[item.status] = item.name;
        });
        this.initDagre();
      });
  }

  // 查询模块列表
  qryModuleList() {
    this.serviceManageService.qryModuleList({})
      .subscribe(result => {
        this.moduleList = result['retList'];
        this.moduleList.forEach(item => {
          this.moduleObj[item.moduleNo] = item.moduleName;
        });
      });
  }

  // 变更修改状态
  changeEditFlag(item) {
    // if判断中用于给确认操作后，给属性赋相应文字值，否则页面会不显示该信息
    if (item.editFlag) {
      if (!this.statusObj[item.nextStatus]) {
        this.statusObj[item.nextStatus] = item.nextStatusName;
        this.statusList.push({ status: item.nextStatus, name: item.nextStatusName });
      }
      item.curStatusName = this.statusObj[item.curStatus];
      // item.nextStatusName = this.statusObj[item.nextStatus];
      item.operateName = this.operateObj[item.operateType].description;
      item.moduleName = this.moduleObj[item.moduleNo];
      item.weakNodeName = this.weakNodeObj[item.weakNode];
    }
    item.editFlag = !item.editFlag;
  }

  // 变更操作，修改其对应的下一步状态显示
  changeOperate(e, item) {
    item.nextStatus = this.operateObj[e].nextStatus;
    // item.nextStatusName = this.operateObj[e].nextSatusName;
  }

  // 删除流转关系
  deleteStatusTransition(index) {
    this.statusTransitionList.splice(index, 1);
    this.statusTransitionList = [...this.statusTransitionList];
  }

  // 新增状态行
  addStatusTransition() {
    this.statusTransitionList = [{ editFlag: true }, ...this.statusTransitionList];
  }

  // 提交状态信息
  submitChanges() {
    const statusUpdateMap = new Map();
    this.statusTransitionList.forEach(status => {
      status.serviceNo = this.serviceInfoDetail.serviceNo;
      status.note = '';
      statusUpdateMap.set(status.curStatus, status.curStatusName);
      statusUpdateMap.set(status.nextStatus, status.nextStatusName);
    });

    const params = {
      serviceStatusDTOS: Array.from(statusUpdateMap).map(item => {
        return { status: item[0], name: item[1], serviceNo: this.serviceInfoDetail.serviceNo,  };
      }),
      serviceStatusConvertDTOS: this.statusTransitionList,
    };
    this.loading = true;
    this.serviceManageService.statusTransitionManage(params)
      .subscribe(() => {
        this.message.success('修改流程信息成功');
        this.loading = false;
        this.modalRef.triggerOk();
      }, err => {
        this.loading = false;
      });
  }

  // 渲染流程图
  initDagre() {
    console.log(document.getElementById('svg-canvas'));
    // 创建图形输入
    const g = new dagreD3.graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel(function() {
        return {};
      });

    // 设置节点
    this.statusList.forEach(status => {
      g.setNode(status.status, { label: status.name });
    });

    g.nodes().forEach(function(v) {
      const node = g.node(v);
      // 设置节点的角弧度
      node.rx = node.ry = 5;
    });

    // 设置连线关系
    this.statusTransitionList.forEach(statusTransition => {
      g.setEdge(statusTransition.curStatus, statusTransition.nextStatus, { label: statusTransition.operateName });
    });

    // 创建渲染器
    const render = new dagreD3.render();

    // 设置一个svg组，最终用来转换为图形
    const svg = d3.select('#svg-canvas'),
      svgGroup = svg.append('g');

    // 执行渲染，绘制图形
    render(d3.select('svg g'), g);

    // 使图形居中
    const xCenterOffset = (svg.attr('width') - g.graph().width) / 2;
    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 20)');
    svg.attr('height', g.graph().height + 40);
  }
}
