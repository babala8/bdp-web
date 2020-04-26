import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageCenterService} from "../../storage-center.service";
import {HttpResponse} from "@angular/common/http";
import {SHELF} from "../../../../models/constant";

@Component({
  selector: 'app-shelf-add-modal',
  templateUrl: 'shelf-add.modal.html',
  styles: [`
    input, nz-input-number {
      border-radius: 0;
    }
  `]
})
/**
 * 添加笼车/托盘
 */
export class ShelfAddComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  // 笼车/托盘类型
  allType = SHELF.SHELF_TYPE;
  // 笼车/托盘状态
  allStatus = SHELF.SHELF_STATUS;

  constructor(private modalRef: NzModalRef,
              private fb: FormBuilder,
              private service: StorageCenterService,
              private message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      shelfNo: [null, [Validators.required]],
      clrCenterNo: [null, [Validators.required]],
      type: [null, [Validators.required]],
      volume: [null, [Validators.required]],
    });
  }

  /**
   * 提交表单
   * @private
   */
  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }
    const params = {
      shelfNo: this.validateForm.controls.shelfNo.value,
      clrCenterNo: this.validateForm.controls.clrCenterNo.value,
      status: 1,
      type: this.validateForm.controls.type.value,
      volume: this.validateForm.controls.volume.value,
    };
    this.service.addShelf(params).subscribe(result => {
      if (result.retCode === '00') {
        this.modalRef.triggerOk();
        this.message.success('添加成功！');
      } else {
        this.message.error('添加失败！');
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    })
  }

  getFormControl(name: string) {
    return this.validateForm.controls[name];
  }
}
