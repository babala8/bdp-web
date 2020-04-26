import {Component} from '@angular/core';


@Component({
    selector: 'home',
    template: `
      <div style="height: 800px;position: relative;top:16px">
<!--        <zj-dashboard></zj-dashboard>-->
      </div>
    `,
    styles: [`
        :host {
            width: 100%;
            height: 100%;
            padding: 10px;
        }
        
        :host /deep/ .anticon.anticon-edit{
            padding-right: 35px !important;
        }
        
    `]
})
export class HomeComponent {


}

