import { Component, OnInit } from '@angular/core';
import { UserManageService } from './user-manage.service';
import { User } from '../../../models/user';
import { UserAddComponent } from './add/user-add.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserModifyComponent } from './mod/user-modify.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Page } from '../../../models/page';
import { SessionService } from '@core/session.service';
import { HttpResponse } from '@angular/common/http';
import { UserAuditComponent } from './audit/user-audit.component';
import { UserResubmitComponent } from './resubmit/user-resubmit.component';
import { Md5 } from 'ts-md5/dist/md5';
import { SYS_CONS } from '../../../models/constant';
import { OrgManageService } from '../org-manage/org-manage.service';
import { RoleManageService } from '../role-manage/role-manage.service';

@Component({
  templateUrl: './user-manage.html',
})
export class UserManageComponent implements OnInit {
  formModel = {};
  page = new Page();
  dataSet = [];
  loading = false;
  roles = [];
  org: any;
  groupType = SYS_CONS.GROUPTYPE;
  curOrg = {
    no: this.session.orgNo,
    name: this.session.orgName,
  };
  auditStatuss = [{ 'no': '0', 'name': '正常' },
    { 'no': '1', 'name': '新增未审批' },
    { 'no': '2', 'name': '删除未审批' },
    { 'no': '3', 'name': '新增退回' },
    { 'no': '4', 'name': '删除退回' }];

  constructor(
    private userService: UserManageService,
    private message: NzMessageService,
    private orgService: OrgManageService,
    private roleService: RoleManageService,
    private session: SessionService,
    private modal: NzModalService,
  ) {
  }

  _refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    this.loading = true;
    const formData = {
      name: this.formModel['name'] || '',
      username: this.formModel['username'] || '',
      roleNo: this.formModel['roleNo'] || '',
      orgNo: !!this.formModel['org'] ? this.formModel['org']['no'] : '',
    };
    const params = Object.assign({}, formData, this.page);
    console.log(params);
    console.log(this.formModel['org']);
    this.userService.getUserByPage(params)
      .subscribe(_data => {
        _data['retList'].forEach(user => {
          user.roleName = user.roleList.map(item => item.name).join('、');
          user.postName = user.postDetailList.map(item => item.postName).join('、');
        });
        this.dataSet = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.page.curRow = _data['curRow'];
        this.page.totalPage = _data['totalPage'];
        this.loading = false;
      });
  }

  search() {
    this._refreshData(true);
  }

  reset() {
    if (this.formModel['org'] != null) {
      this.formModel['org'].name = '';
      this.formModel['org'].no = '';
    }
    this.formModel['name'] = null;
    this.formModel['username'] = null;
    this.formModel['roleNo'] = null;

    this._refreshData(true);
  }

  ngOnInit(): void {
    this._refreshData(true);
    console.log(this.session.token);
  }

  selectRole($event) {
    console.log($event);
    if (!$event || !$event.no) return;
    this.orgService.getOrg($event.no).subscribe(data => {
      const param = {
        orgGradeNo: data.orgGradeNo,
      };
      this.roleService.qryRoleByGrade(param).subscribe(_data => {
        this.formModel['roleNo'] = null;
        this.roles = _data.retList;
      });
    });
  }

  deleteUser(user) {
    this.userService.deleteUser(user.username).subscribe(r => {
      this.message.success(
        `提交用户${user.username}的删除成功！`,
      );
      this._refreshData(true);
    }, (error) => {
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });
  }

  modifyUser(user) {
    const modal = this.modal.create({
      nzTitle: '修改用户',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: UserModifyComponent,
      nzComponentParams: {
        user: user,
      },
      nzOnOk: () => {
        this._refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  openAdd() {
    const modal = this.modal.create({
      nzTitle: '添加用户',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: UserAddComponent,
      nzOnOk: () => {
        this._refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }


  openDetail(user: User) {
    const modal = this.modal.create({
      nzTitle: '用户详细信息',
      nzContent: UserDetailComponent,
      nzComponentParams: {
        user: user,
      },
      nzOnOk: () => {
      },
      nzOnCancel: () => {
      },
      nzFooter: null,
    });
  }

  resetPassword(user: User) {
    this.modal.warning({
      nzTitle: '重置密码',
      nzContent: `确定重置用户【${user.name}】密码信息?`,
      nzOnOk: () => {
        this.userService.resetPassword({
          username: user.username,
          newPassword: Md5.hashStr(user.username + 'messi').toString(),
        }).subscribe(r => {
          this.message.success(`用户密码已重置成功！初始密码为：${user.username}`);
          // this._refreshData();
        }, (error) => {
          if (error instanceof HttpResponse) {
            this.message.error(error.body.retMsg);
          }
        });
      },
    });
  }

  unlock(user: User) {
    this.userService.unlock({ no: user.username }).subscribe(r => {
      this.message.success(`用户${user.username}已解锁`);
      this._refreshData(true);
    }, (error) => {
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });
  }

  audit(item) {
    let head;
    if (item.auditStatus === 1) {
      head = '新增用户';
    } else if (item.auditStatus === 2) {
      head = '删除用户';
    }
    const modal = this.modal.create({
      nzTitle: `${head}` + '审核',
      nzContent: UserAuditComponent,
      nzWidth: '80%',
      nzComponentParams: {
        userInfo: item,
      },
      nzOnOk: () => {
        this._refreshData();
      },
      nzOnCancel: () => {
      },
      nzFooter: null,
    });
  }

  resubmit(item) {
    let head;
    if (item.auditStatus === 3) {
      head = '新增用户';
    } else if (item.auditStatus === 4) {
      head = '删除用户';
    }
    const modal = this.modal.create({
      nzTitle: `${head}`,
      nzContent: UserResubmitComponent,
      nzComponentParams: {
        user: item,
      },
      nzOnOk: () => {
        this._refreshData();
      },
      nzOnCancel: () => {
      },
      nzFooter: null,
    });
  }
}
