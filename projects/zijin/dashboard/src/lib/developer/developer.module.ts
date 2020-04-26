import {PanelDevelopModule} from "./panel/panel.module";
import {NgModule} from "@angular/core";
import {SharedModule} from "./shared/shared.module";
import {ChartDevelopModule} from "./charts/chart-develop.module";

@NgModule({
  imports: [
    SharedModule,
    ChartDevelopModule,
    PanelDevelopModule,
  ],
  exports: [
    SharedModule,
    ChartDevelopModule,
    PanelDevelopModule,
  ]
})
export class ZjDeveloperRootModule {

}
