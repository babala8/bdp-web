import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AddnotesTaskService } from './addnotes-task.service';
import { AddnotesTaskComponent } from './addnotes-task.component';
import { AddnotesTaskAssignToComponent } from './addnotes-task-assignTo/addnotes-task-assignTo.component';
import { AddnotesTaskDetailComponent } from './addnotes-task-detail/addnotes-task-detail.component';
import { AddnotesTaskProcessComponent } from './addnotes-task-process/addnotes-task-process.component';
import { ATMLineManageService } from 'app/routes/line-center/ATM/ATM-line-manage/atm-line-manage.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AddnotesTaskComponent,
    AddnotesTaskAssignToComponent,
    AddnotesTaskDetailComponent,
    AddnotesTaskProcessComponent,
  ],
  entryComponents: [
    AddnotesTaskAssignToComponent,
    AddnotesTaskDetailComponent,
    AddnotesTaskProcessComponent,
  ],
  providers: [
    AddnotesTaskService,
    ATMLineManageService,
  ]
})
export class AddnotesTaskModule { }
