import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { HeaderWebsocketComponent } from './message.component';
import { MessageContent } from './component/message-content';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HeaderWebsocketComponent,
    MessageContent
  ],
  entryComponents: [
    MessageContent
  ],
  providers: [],
  exports: [
    HeaderWebsocketComponent,
  ]
})

export class MessageModule {
}
