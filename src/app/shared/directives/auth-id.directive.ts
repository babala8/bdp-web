import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SessionService } from '@core/session.service';
import * as _ from 'lodash';

/**
 * @stable
 */
export class NgAuthIdContext {
  public $implicit: any = null;
  public show: any = null;
}

@Directive({ selector: '[authId]' })
export class AuthIdDirective {
  private _context: NgAuthIdContext = new NgAuthIdContext();
  private _templateRef: TemplateRef<NgAuthIdContext> | null = null;
  private _contentViewRef: EmbeddedViewRef<NgAuthIdContext> | null = null;

  constructor(
    private _viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<NgAuthIdContext>,
    private sessionService: SessionService
  ) {
    this._templateRef = templateRef;
  }

  private _authId: string;

  @Input('authId')
  set authId(condition: any) {
    this._authId = condition;
    this._context.$implicit =
      this._context.show =
      !_.isUndefined(this.sessionService.userInfo.buttonList.find(item => item.no === condition));
    this._updateView();
  }

  private _updateView() {
    if (this._context.$implicit) {
      if (!this._contentViewRef) {
        this._viewContainer.clear();
        if (this._templateRef) {
          this._contentViewRef =
            this._viewContainer.createEmbeddedView(this._templateRef, this._context);
        }
      }
    } else {
      if (this._contentViewRef) {
        this._viewContainer.clear();
        this._contentViewRef = null;
      }
    }
  }

}


