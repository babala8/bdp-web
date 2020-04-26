import { Component, OnInit, TemplateRef } from '@angular/core';
import { MenuManageService } from './menu-manage.service';
import * as _ from 'lodash';
import { NzDropdownContextComponent, NzDropdownService, NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './menu-manage.html',
  styles: [
    `
          nz-form-item {
          margin-bottom: 0px;
      }
    `
  ]
})

export class MenuManageComponent implements OnInit {

  loading;
  menuList = [];
  menuTree = [];
  curContext: any = {};
  dropdown: NzDropdownContextComponent;
  status = true;
  state = false;
  flag = '';
  buttonTag = true;
  formModal: any = {
    menuName:'',
    menuNo: '',
    menuFname: '',
    menuFno: '',
    menuRoute: '',
    menuIcon: '',
    menuSeq: 0,
    menuType: 0,
    menuRemark: '',
    interface: [],
  };
  validateForm: FormGroup;

  constructor(private service: MenuManageService,
              private nzDropdownService: NzDropdownService,
              private message: NzMessageService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getMenuList();
  }

  getMenuList () {
    this.service.qryAllMenuList({})
      .subscribe(data => {
        this.menuList = data.retList;
        this.menuTree = this.dataTree(this.menuList);
      });
    this.loading = true;
  }

  dataTree (menus) {
    const fatherMenus = [];
    menus.forEach(menu => {
      menu.title = menu.name;
      menu.isLeaf = menu.buttonTag == 1;
      menu.key = menu.no;
      if (menu.menuFather === '0' || _.isNull(menu.menuFather)) {
        fatherMenus.push(menu);
      }
    });
    return this.dataTreeAgain(menus, fatherMenus);
  }

  dataTreeAgain(menus, fatherMenus) {
    for(let i = 0; i < fatherMenus.length; i++) {
      const fatherMenu = fatherMenus[i];
      let sonArray = [];
      const fatherNo = fatherMenu.no;
      for (let j = 0; j < menus.length; j++) {
        if(menus[j].menuFather === fatherNo) {
          sonArray.push(menus[j]);
        }
      }
      sonArray = _.sortBy(sonArray, ['menuOrder']);
      fatherMenu.children = sonArray;
      if (sonArray.length > 0){
        this.dataTreeAgain(menus, sonArray);
      }
    }
    return fatherMenus;
  }

  selectMenu(data) {
    this.status = true;
    this.state =false;
    this.formModal.interface = [];
    const menu = data.node.origin;
    if (menu.no === this.formModal.menuNo)
      return;
    this.service.qryMenuDetail(menu.no)
      .subscribe(data => {
        this.formModal.menuName = data.name ? data.name : '';
        this.formModal.menuNo = data.no ? data.no : '';
        this.formModal.menuFname = data.menuFatherName ? data.menuFatherName : '';
        this.formModal.menuFno = data.menuFather ? data.menuFather : '';
        this.formModal.menuRoute = data.url ? data.url : '';
        this.formModal.menuIcon = data.menuIcon ? data.menuIcon : '';
        this.formModal.menuSeq = data.menuOrder ? data.menuOrder : 0;
        this.formModal.menuType = data.buttonTag ? data.buttonTag : 0;
        this.formModal.menuRemark = data.note ? data.note : '';
      });
    this.service.qryInterface(menu.no)
      .subscribe(data => {
        const list = data['retList'].map( data => {
          return data.url
        })
        this.formModal.interface = list.join('\n');
      });
    console.log(data.url);
    // 用来关闭右键菜单框
    this.dropdown && this.dropdown.close();
  }

  contextMenu($event, menuTemplate: TemplateRef<void>): void {
    this.curContext = $event.node.origin;
    this.selectMenu($event)
    console.log(this.curContext);
    // $event.event.data = $event.node.origin;
    this.nzDropdownService.create($event.event, menuTemplate);
    this.dropdown = this.nzDropdownService.create($event.event, menuTemplate);
  }

  selectDropdown(flag) {
    if (flag === 'delete') {
        this.service.delMenu(this.curContext.no).subscribe(data => {
          this.message.success(data.retMsg);
        }, (error) => {
          this.message.error(error.body.retMsg);
        });
      this.getMenuList();
    } else if( flag === 'add' ) {
      this.status = false;
      this.state = true;
      this.formModal = {
        menuFname: this.curContext.name,
        menuFno: this.curContext.no,
        menuType: this.curContext.buttonTag
      };
      this.flag = flag;
      this.buttonTag = Boolean(!this.formModal.menuType);
    } else if ( flag === 'modify' ) {
      this.status = false;
      this.state = true;
      this.flag = flag;
      this.buttonTag = Boolean(!this.formModal.menuType);
    }
    this.dropdown.close();
  }

  addMenuList () {
    console.log(this.curContext);
    debugger
    const params = {
      no: this.formModal.menuNo,
      name: this.formModal.menuName,
      menuFather: this.formModal.menuFno,
      url: this.formModal.menuRoute,
      buttonTag: this.formModal.menuType,
      menuOrder: this.formModal.menuSeq,
      menuIcon: this.formModal.menuIcon,
      note: this.formModal.menuRemark,
      // permissionList : this.formModal.interface
    }

    if (this.flag == 'add') {
      this.service.addMenu(params).subscribe(data => {
        this.message.success(data.retMsg);
      }, (error) => {
        console.log(`${error.body}`);
        this.message.error(error.body.retMsg);
        });
      this.getMenuList();
    } else if (this.flag == 'modify') {
      this.service.modifyMenu(params).subscribe(data => {
        this.message.success(data.retMsg);
      }, (error) => {
        console.log(`${error.body}`);
        this.message.error(error.body.retMsg);
      });
    }
    this.getMenuList();
  }

  resetInput () {
    this.status = false;
      this.formModal.menuName = '';
      this.formModal. menuRoute = '';
      this.formModal.menuIcon = '';
      this.formModal.menuSeq = '';
      this.formModal.menuType = '';
      this.formModal.menuRemark = '';
      this.formModal. interface = [];

  }

  cancel () {
  }

}
