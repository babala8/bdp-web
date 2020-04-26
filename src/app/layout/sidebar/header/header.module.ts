import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HeaderButtonComponent } from './components/button/button.component';
import { HeaderFullScreenComponent } from './components/button/fullscreen.component';
import { HeaderStorageComponent } from './components/button/storage.component';
import { HeaderThemeComponent } from './components/button/theme.component';
import { HeaderLogoComponent } from './components/logo/logo.component';
import { HeaderMenuComponent } from './components/menu/menu.component';
import { PasswordModule } from "./components/password/password.module";
import { HeaderSearchComponent } from './components/search/search.component';
import { HeaderUserInfoComponent } from './components/user/user.component';
import { HeaderComponent } from './header.component';
import { MessageModule } from './components/message/message.module';

const COMPONENTS = [
  HeaderComponent,
  HeaderLogoComponent,
  HeaderMenuComponent,
  HeaderUserInfoComponent,
  HeaderButtonComponent,
  HeaderFullScreenComponent,
  // HeaderI18nComponent,
  HeaderThemeComponent,
  HeaderStorageComponent,
  HeaderSearchComponent,
  // HeaderSearchComponent

];


@NgModule({
  imports: [
    SharedModule,
    PasswordModule,
    MessageModule
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
