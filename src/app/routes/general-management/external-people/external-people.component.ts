import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Page } from '../../../models/page';
import { ExternalPeopleAddComponent } from './add/external-people-add.component';
import { ExternalPeopleAddMutipleComponent } from './add/external-people-add-mutiple.component';
import { ExternalPeopleModComponent } from './mod/external-people-mod.component';
import { GeneralManagementService } from "../general-management.service";


@Component({
  templateUrl: './external-people.html'
})
export class ExternalPeopleComponent implements OnInit{
  formModel = {};
  page = new Page();
  dataList = [];
  loading = false;
  postList = [
    {value: '0', label: '外包人员'},
    {value: '1', label: '安保人员'},
    {value: '2', label: '车辆驾驶员'},
  ];

  constructor(private modal: NzModalService,
              private message: NzMessageService,
              private externalPeopleService: GeneralManagementService
  ) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.refreshData(true);
  }

  // 查询外包人员列表
  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      name: this.formModel['name'] ? this.formModel['name'] : '',
      no: this.formModel['no'] ? this.formModel['no'] : '',
      post: this.formModel['post'] ? this.formModel['post'] : ''
    };
    Object.assign(params, this.page);
    this.loading = true;
    this.externalPeopleService.qryExternalPeopleList(params)
      .subscribe(data => {
        this.dataList = data['retList'];
        this.page.totalRow = data['totalRow'];
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  // 打开添加模态框
  openAdd() {
    const nzModalSubject = this.modal.create({
      nzTitle: '新增外包人员信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 990,
      nzContent: ExternalPeopleAddComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  // 打开批量添加模态框
  openAddMutiple() {
    const nzModalSubject = this.modal.create({
      nzTitle: '批量添加外包人员信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 990,
      nzContent: ExternalPeopleAddMutipleComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  // 打开修改模态框
  openMod(outPeople) {
    const nzModalSubject = this.modal.create({
      nzTitle: '修改外包人员信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 990,
      nzComponentParams: {
        outPeople: outPeople,
      },
      nzContent: ExternalPeopleModComponent,
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
  }


  // 批量添加
  openAddMuti() {
    const addMutiple = this.modal.create({
      nzTitle: '批量添加外包人员信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '40%',
      nzZIndex: 990,
      nzContent: ExternalPeopleAddMutipleComponent,
      nzComponentParams: {},
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  // 删除人员
  delOutPeople(item) {
    this.externalPeopleService.delExternalPeople(item.no)
      .subscribe(data => {
        this.message.success('删除成功！');
        this.refreshData(true);
      })
  }
}
