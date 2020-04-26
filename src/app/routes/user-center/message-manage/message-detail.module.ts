import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MessageDetail } from './message-detail';
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    MessageDetail
  ],
  entryComponents: []
})

export class MessageDetailModule {}
