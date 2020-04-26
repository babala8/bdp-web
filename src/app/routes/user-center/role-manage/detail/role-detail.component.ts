import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTreeComponent } from 'ng-zorro-antd';
import { data2tree } from '../../../../core/utils';
import { RoleManageService } from '../role-manage.service';
import { ORGGRADES } from '../../../../models/constant';

@Component({
  templateUrl: './role-detail.html',
})
export class RoleDetailComponent implements OnInit {

  _isSpinning = true;
  grades = ORGGRADES;
  formModel = {
    no: '',
    name: '',
    orgGradeNo: '',
    note: '',
  };
  role;
  tip = '正在读取数据...';
  options;
  @ViewChild('nzTreeComponent') nzTree: NzTreeComponent;

  constructor(
    private _roleService: RoleManageService,
  ) {
  }

  ngOnInit(): void {
    this._roleService.qryRoleDetailById(this.role.no).subscribe(data => {
      data['menuList'].forEach(value => {
        value.key = value.no;
        value.title = value.name;
        delete value.icon;
        value.disableCheckbox = true;
        value.isLeaf = (value.buttonTag == '1');
        value.checked = (value.checked == '1');
      });
      this.options = data2tree(data['menuList']);
      this.formModel.no = data.no;
      this.formModel.name = data.name;
      this.formModel.note = data.note;
      this.formModel.orgGradeNo = data.orgGradeNo;
      this._isSpinning = false;
    });
  }
}


