import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';
import { QuickMenuComponent } from './header/components/quick-menu/quick-menu.component';
import { HeaderModule } from './header/header.module';
import { LayoutSidebarComponent } from './layout.sidebar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    HeaderModule,
  ],
  declarations: [
    LayoutSidebarComponent,
    TabBarComponent,
    SidebarComponent,
    SidebarComponent,
    QuickMenuComponent
  ],
  entryComponents: [
    QuickMenuComponent
  ],
  exports: [LayoutSidebarComponent, SidebarComponent]
})
export class LayoutSidebarModule {

}
