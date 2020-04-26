import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleManageService } from '../role-manage.service';

import { NzMessageService, NzModalRef, NzTreeComponent } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { data2tree } from '../../../../core/utils';
import { ORGGRADES } from '../../../../models/constant';

@Component({
  templateUrl: './role-modify.html',
})
export class RoleModifyComponent implements OnInit {
  _isSpinning = true;
  grades = ORGGRADES;
  formModel = {};
  role;
  loading = false;
  tip = '正在读取数据...';
  checkedList = [];
  hiddenList = []
  @ViewChild('nzTreeComponent') nzTree: NzTreeComponent;
  options;

  constructor(private _roleService: RoleManageService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {

  }

  ngOnInit() {
    this._roleService.qryRoleDetailById(this.role.no).subscribe(roleInfo => {
      roleInfo['menuList'].forEach(value => {
        value.key = value.no;
        value.title = value.name;
        delete value.icon;
        value.isLeaf = (value.buttonTag == '1' || value.buttonTag == '2');
        value.checked = (value.checked == '1');
      });
      this.hiddenList = roleInfo['menuList'].filter(item => {
        return item.buttonTag == '3';
      })
      roleInfo['menuList'] = roleInfo['menuList'].filter(item1 =>{
        return item1.buttonTag != '3';
      })
      this.options = data2tree(roleInfo['menuList']);
      this.formModel['name'] = roleInfo.name;
      this.formModel['note'] = roleInfo.note;
      this.formModel['no'] = this.role.no;
      this.formModel['orgGradeNo'] = roleInfo.orgGradeNo;
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
          return btnList.push(el)
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
    this._roleService.modRole(params).subscribe(data => {
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(`修改角色成功！`);
    });

  }
}
