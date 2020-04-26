import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleManageService } from '../role-manage.service';
import { NzMessageService, NzModalRef, NzTreeComponent } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { data2tree } from '../../../../core/utils';
import { ORGGRADES } from '../../../../models/constant';

@Component({
  templateUrl: './role-add.html',
})
export class RoleAddComponent implements OnInit {
  _isSpinning = true;
  grades = ORGGRADES;
  formModel = {
    name: '',
    note: '',
    orgGradeNo: null,
  };
  role;
  loading = false;
  tip = '正在读取数据...';
  checkedList = [];
  options;
  hiddenList = [];
  @ViewChild('nzTreeComponent') nzTree: NzTreeComponent;

  constructor(private _roleService: RoleManageService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {

  }

  ngOnInit(): void {
    this._roleService.qryAllMenuList().subscribe(data => {
      data['retList'].forEach(value => {
        value.key = value.no;
        value.title = value.name;
        delete value.icon;
        value.isLeaf = (value.buttonTag == '1' || value.buttonTag == '2');
        value.checked = (value.checked == '1');
      });
      this.hiddenList = data['retList'].filter(item => {
        return item.buttonTag == '3';
      })
      data['retList'] = data['retList'].filter(item1 =>{
        return item1.buttonTag != '3';
      })
      this.options = data2tree(data['retList']);
      this._isSpinning = false;
    });
  }

  getNodeList() {
    const nodeArray = this.nzTree.getCheckedNodeList();
    console.log(nodeArray);
    let btnList = [];
    nodeArray.forEach(nodes => {
      this.getBtnListByNode(nodes, btnList);
    });
    this.matchHideNode(btnList);
    this.checkedList = btnList;
  }

  getBtnListByNode(nodes, arr) {
    if (!nodes.isLeaf) {
      nodes.children.forEach(va => {
        this.getBtnListByNode(va, arr);
      });
    } else {
      arr.push(nodes.origin);
      return;
    }
  }

  matchHideNode (btnList){
    this.hiddenList.forEach(el =>{
      for(let i = 0; i < btnList.length; i++){
        if(btnList[i].menuFather == el.menuFather) {
          el.checked = true;
          return btnList.push(el);
        }
      }
    })
  }

  _submitForm() {
    this.getNodeList();
    const params = {
      ...this.formModel,
      menuList: this.checkedList,
    };
    this.loading = true;
    this._roleService.addRole(params).subscribe(data => {
      this.loading = false;
      this.message.success(data.retMsg);
      this.nzModal.triggerOk();
    }, (error) => {
      this.loading = false;
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });

  }

}
