import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared';
import { SecurityWarningComponent } from './security-warning/security-warning.component';
import { SecurityWarningModule } from './security-warning/security-warning.module';

const route: Routes = [
  { path: 'lock', loadChildren: './lock/lock.module#LockModule' },
  { path: 'security-warning', component: SecurityWarningComponent, data: { title: '预警信息管理' } },
];

@NgModule({
  imports: [
    SharedModule,
    SecurityWarningModule,
    RouterModule.forChild(route)],
  exports: [],
  declarations: [],
  providers: [],
})
export class SecurityModule {
}
