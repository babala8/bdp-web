import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { OrgManageService } from './org-manage.service';
import { OrgAddComponent } from './add/org-add.component';
import { OrgDetailComponent } from './detail/org-detail.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Page } from '../../../models/page';
import { OrgModifyComponent } from './mod/org-modify.component';
import { AppService } from '../../../app.service';
import { ORGGRADES } from '../../../models/constant';
import { OrgReviseComponent } from './revise/org-revise.component';

@Component({
  templateUrl: './org-manage.html',
})
export class OrgManageComponent implements OnInit, OnChanges, AfterViewInit {
  formModel = {};
  dataSet = [];
  loading = true;
  page = new Page();
  allOrgTypes = [];
  orgTypes = ORGGRADES;

  constructor(
    private appService: AppService,
    private orgService: OrgManageService,
    private modal: NzModalService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.orgService.qryAllOrgTypes().subscribe(_data => {
      this.allOrgTypes = _data.retList;
      this.refreshData(true);
    });

  }

  ngAfterViewInit(): void {

  }

  ngOnChanges() {

  }

  reset() {
    if (this.formModel['org'] != null) {
      this.formModel['org'].name = '';
      this.formModel['org'].no = '';
    }
    this.formModel['orgName'] = null;
    this.formModel['orgNo'] = null;
    this.formModel['orgGrade'] = null;

    this.refreshData(true);
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    this.loading = true;
    let org = this.formModel['org'];
    const params = {
      fuzzyOrgNo: this.formModel['orgNo'] || '',
      orgName: this.formModel['orgName'] || '',
      orgGrade: this.formModel['orgGrade'] || '',
      pageSize: this.page.pageSize,
      curPage: this.page.curPage,
    };
    if (org) {
      params['orgNo'] = org.no;
    } else {
      params['orgNo'] = '';
    }

    // 获取当前页
    this.orgService.getOrgsByPage(params)
      .subscribe(_data => {
        console.log(_data);
        this.dataSet = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.page.totalPage = _data['totalPage'];
        this.loading = false;
      });
  }

  search() {
    console.log(this.formModel['org']);
    this.refreshData(true);
  }

  modifyOrg(org) {
    console.log(org);
    const modal = this.modal.create({
      nzTitle: '修改机构',
      nzMaskClosable: false,
      nzFooter: null,
      nzZIndex: 990,
      nzWidth: '60%',
      nzContent: OrgModifyComponent,
      nzComponentParams: {
        org: org,
      },
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
    // this.appService.pushModal(modal);
  }

  openAdd() {
    const nzModalSubject = this.modal.create({
      nzTitle: '添加机构',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 990,
      nzContent: OrgAddComponent,
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
    // this.appService.pushModal(nzModalSubject);
  }

  openDetail(org) {
    const modal = this.modal.create({
      nzTitle: '机构详情',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzContent: OrgDetailComponent,
      nzComponentParams: {
        org: org,
      },
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
    // this.appService.pushModal(modal);
  }

  modCircle(item) {
    const reviseModal = this.modal.create({
      nzTitle: '网点营业时间调整',
      nzFooter: null,
      nzWidth: '80%',
      nzContent: OrgReviseComponent,
      nzComponentParams: {
        orgInfo: item,
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
    // this.appService.pushModal(reviseModal);
  }

  confirmDel(org) {
    this.orgService.deleteOrg(org.no).subscribe(data => {
      this.refreshData(false);
      this.message.success('删除机构成功');
      this.refreshData(false);
    });
  }

  cancel() {
  }

}
