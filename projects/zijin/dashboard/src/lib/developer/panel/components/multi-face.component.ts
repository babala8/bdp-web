import {Component, Inject, Injector, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PreviewMultiFaceComponent} from './preview-multi-face.component';
import {PANELDEVSERVICE} from '../config';
import {panelAdapt} from '../../../componentTypeUtil';

// 该组件所包含的正反两面的组件没有交互关系
@Component({
    selector: 'dev-multi-face',
    templateUrl: './multi-face.html',
    styles: [
            `
            .card-available {
                cursor: pointer;
                margin: 10px;
                width: 450px;
                height: 450px;
                overflow: scroll;
                float: left;
            }
        `
    ]
})
export class MultiFaceComponent implements OnInit {

    form: FormGroup;

    alternatives = [];   // 所有可供选择项

    pageList = [];

    transitionList = [{no: '11', name: '走马灯'}];

    constructor(private injector: Injector,
                private modal: NzModalService,
                private fb: FormBuilder,
                @Inject(PANELDEVSERVICE) private panelService,
                private message: NzMessageService) {

    }


    ngOnInit(): void {

        this.form = this.fb.group({
            pageCount: [null, [Validators.required]],
            type: [null, [Validators.required]],
            name: [null, [Validators.required]],
            describe: [null, [Validators.required]]
        });


        this.panelService.getChartsDef()
            .subscribe((dataList) => {
                const alts = dataList || [];
                const alternatives = [];
                alts.forEach(value => {
                    if (value.type === 10 || value.type === 11) {
                    } else {
                        alternatives.push(value);
                    }
                });
                this.alternatives = panelAdapt(alternatives, this.injector);
            }, err => {
                this.message.error(err.body.retMsg);
            });
    }


    preview() {
        this.modal.create({
            nzTitle: '合成组件预览',
            nzMaskClosable: false,
            nzFooter: null,
            nzContent: PreviewMultiFaceComponent,
            nzComponentParams: {
                pages: this.pageList
            }
        });
    }

    save() {
        console.log(this.form.value);
        console.log(this.pageList);
        const optionMsg = [];
        this.pageList.forEach(val => {
            optionMsg.push({
                type: val.cType,
                id: val.cid
            });
        });

        const params = {
            componentMsg: this.form.value,
            modelMsg: '',
            optionMsg: optionMsg
        };

        console.log(params);

        this.panelService.save(params)
            .subscribe(data => {
                this.message.success(data.retMsg);
                console.log(data);
            }, err => {
                this.message.error(err.body.retMsg);
            });


    }

    pageCountChange(num) {
        this.pageList.length = 0;
        for (let i = 0; i < num; i++) {
            this.pageList.push({
                component: null,
                injector: null,
                cid: null,
                cType: null,
                pending: true
            });
        }
    }

    selectCard(card, page) {
        page.component = card.component;
        page.injector = card.injector;
        page.cid = card.id;
        page.cType = card.type;     // 悲哀的处理！供保存时使用，考虑到panelAdapt时的问题
    }


    selectView(page) {
        if (page.component && page.injector) {
            page.pending = false;
        }
    }


}


