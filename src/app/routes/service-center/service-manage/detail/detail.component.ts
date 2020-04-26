import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'app/routes/common.service';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';
import { ServiceCenterService } from '../../service-center.service';
import { ServiceManageService } from '../service-manage.service';

/**
 * @description 查看服务详细信息
 * @export
 * @class DetailComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit, AfterViewInit {
  tabs = ['服务基础信息', '服务流程', '服务物品明细'];
  selectedIndex;
  serviceInfo;
  // baseInfo: any = {};
  serviceInfoDetail: any = {};
  firstRenderFlag = true;
  statusList: any[] = [];
  statusTransitionList: any[] = [];
  productList: any[] = [];

  constructor(
    private serviceManageService: ServiceManageService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.serviceManageService.getServiceDetail(this.serviceInfo.serviceNo)
      .subscribe(result => {
        this.serviceInfoDetail = result;
        this.statusTransitionList = result['statusConvertList'];
        this.statusList = result['statusList'];
        this.productList = result['productList'];
      })
  }

  ngAfterViewInit(): void { }

  // 序列变化
  changeSelected(e) {
    console.log(this.selectedIndex);
    if (this.selectedIndex === 1 && this.firstRenderFlag) {
      this.initDagre();
      this.firstRenderFlag = false;
    }
  }

  // 渲染流程图
  initDagre() {
    console.log(document.getElementById('svg-canvas'));
    // 创建图形输入
    const g = new dagreD3.graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel(function () {
        return {};
      });

    // 设置节点
    this.statusList.forEach(status => {
      g.setNode(status.status, { label: status.name });
    });

    g.nodes().forEach(function (v) {
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
