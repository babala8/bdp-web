import { Component, Input, OnInit } from '@angular/core';
import * as dagreD3 from 'dagre-d3';
import * as d3 from 'd3';


@Component({
  selector: 'operate-flow-chart',
  template: `
    <div id="svg-render" style="width: 100%; text-align: center">
      <svg id="svg-canvas" style="width: 100%" width="850"></svg>
    </div>
  `
})
export class OperateFlowChartComponent implements OnInit {
  @Input() recordList = [];
  // @Input() firstRenderFlag = true;
  @Input() statusList = [];
  @Input() statusTransitionList = [];

  constructor() { }
  ngOnInit(): void {
    this.initDagre();
  }

  // 绘制流程图
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
      // g.setNode(status.status, { label: status.name, style: 'fill: #7f7'})
    });
    // g.node('201').style = 'fill: #7f7';


    g.nodes().forEach(function (v) {
      const node = g.node(v);
      // 设置节点的角弧度
      node.rx = node.ry = 5;
      node.title = '测试';
    });

    // 设置连线关系
    this.statusTransitionList.forEach(statusTransition => {
      g.setEdge(statusTransition.curStatus, statusTransition.nextStatus, {
        label: statusTransition.operateName,
        style: ' stroke: #ccd8ff; stroke-dasharray: 5, 5; fill: none;',
        arrowheadStyle: 'fill: #ccd8ff; stroke: #ccd8ff',
      });
    });

    this.recordList.forEach(item => {
      g.node(item.beforeNode).style = 'fill: #ff7f00';
      g.node(item.beforeNode).labelStyle = 'fill: #fff';
      g.node(item.curNode).style = 'fill: #ff7f00';
      g.node(item.curNode).labelStyle = 'fill: #fff';
      g.setEdge(item.beforeNode, item.curNode, {
        label: item.description,
        labelStyle: 'fill: #ff7f00',
        arrowheadStyle: 'fill: #ff7f00; stroke: #ff7f00',
        style: 'stroke: #ff7f00; stroke-width: 2px; fill: none',
      });
      // g.edge(item.beforeNode, item.curNode).arrowheadStyle = 'fill: #f77; stroke: #f77';
      // g.edge(item.beforeNode, item.curNode).style = 'stroke: #f77; stroke-width: 2px; fill: none';
    });
    // , style: 'stroke: #f77; stroke-width: 2px; fill: #fff', arrowheadStyle: 'fill: #f77'
    //   g.setEdge('201', '208', { label: '测试', style: 'stroke: #f77; stroke-width: 2px; fill: none', arrowheadStyle: 'fill: #f77; stroke: #f77'});
    // g.removeEdge(201, 207);
    // g.setEdge(201, 207, {label: '测试', style: 'stroke: #f77; stroke-width: 2px;', arrowheadStyle: 'fill: #f77'});
    // g.edge('201', '208').arrowheadStyle = 'fill: #f77';
    // style="stroke: #f77; stroke-width: 2px;" arrowheadStyle="fill: #f77"

    // 创建渲染器
    const render = new dagreD3.render();

    // 设置一个svg组，最终用来转换为图形
    const svg = d3.select('#svg-canvas'),
      svgGroup = svg.append('g');

    // 执行渲染，绘制图形
    render(d3.select('svg g'), g);
    // node节点悬停展示title
    svgGroup.selectAll('g.node').append('title').text(d => {
      console.log(d);
      const record = this.recordList.find(item => {
        return item.curNode == d;
      });
      console.log(record);
      return record ? `操作人员：${record.opName}, 操作时间：${record.finishTime}, 操作信息：${record.operateValue}` : null;
    });

    // 使图形居中
    console.log(svg.attr('width'));
    // console.log(document.getElementById('svg-render').style.width);
    const xCenterOffset = (svg.attr('width') - g.graph().width) / 2;
    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 20)');
    svg.attr('height', g.graph().height + 40);
    console.log('渲染完成');

  }
}
