import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpecialRuleService} from '../special-rule.service';

@Component({
    templateUrl: 'special-rule-detail.html',
})

export class SpecialRuleDetailComponent implements OnInit {
    validateForm: FormGroup;
    ruleId;
    detail: any = {};

    constructor(private fb: FormBuilder,
                private service: SpecialRuleService) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            ruleDesp: [{value:null,disabled:true}, [Validators.required]],
            ruleId: [{value:null,disabled:true}, [Validators.required]],
            addnotesCoeff: [{value:null,disabled:true}],
            quotaRatio: [{value:null,disabled:true}],
            addnotesPeriod: [{value:null,disabled:true}],
            ruleGenDate: [{value:null,disabled:true}],
            ruleGenOpName: [{value:null,disabled:true}],
            ruleGenOpNo: [{value:null,disabled:true}]
        });

        this.getDetail();
    }

    getDetail() {
        const params = {ruleId: this.ruleId};

        this.service.detail(params)
            .subscribe(_data => {
                this.detail = _data.element;
                this.validateForm.controls.ruleDesp.setValue(this.detail.ruleDesp);
                this.validateForm.controls.ruleId.setValue(this.detail.ruleId);
                this.validateForm.controls.addnotesCoeff.setValue(this.detail.addnotesCoeff);
                this.validateForm.controls.quotaRatio.setValue(this.detail.quotaRatio);
                this.validateForm.controls.addnotesPeriod.setValue(this.detail.addnotesPeriod);
                this.validateForm.controls.ruleGenDate.setValue(this.detail.ruleGenDate);
                this.validateForm.controls.ruleGenOpName.setValue(this.detail.ruleGenOpName);
                this.validateForm.controls.ruleGenOpNo.setValue(this.detail.ruleGenOpNo);
            });
    }

}
