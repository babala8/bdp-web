import {Component, OnInit} from '@angular/core';
import {UserManageService} from '../user-manage.service';

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.html',
})
export class UserDetailComponent implements OnInit {

    user;
    userInfo;
    roles;
    formModel = {};
    post = [];

    constructor(private userService: UserManageService) {}

    ngOnInit(): void {
        Object.assign(this.formModel,this.user,{
            org: this.user.sysOrg.name,
            role: this.user.roleList.map(item => item.name).join('、'),
            post: this.user.postDetailList.map(item => item.postName).join('、')
        });
      this.getGroupType();
    }

    getGroupType() {
      this.userService.getPost().subscribe(data => {
        this.post = data.retList;
      });
    }
}

