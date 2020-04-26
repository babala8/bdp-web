import {OrgGrade} from './org-grade';
import {OrgType} from './orgType';

export class Org {
    constructor(public no?: string,
                public name?: string,
                public linkMan?: string,
                public address?: string,
                public telephone?: string,
                public mobile?: string,
                public fax?: string,
                public email?: string,
                public parentOrg?: Org,
                public orgGradeNo?: string,
                public parentOrgNo?: string,
                public note?: string,
                public orgTypeInfo?: OrgType,
                public region?: string,
                public city?: string,
                public x?: string,
                public y?: string,
                public deliveryTime?: string,
                public backTime?: string,
                public clrCenter?:any,
                public clrCenterNo?: string,
                public clrCenterName?: string,
                public status?: string,
                public clrCenterFlag?: number,
                public cashTruckNum?: string,
                public orgGrade?: OrgGrade,
                public superOrg?: Org) {

    }
}
