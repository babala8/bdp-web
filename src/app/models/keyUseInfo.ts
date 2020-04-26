export class KeyUseInfo {
    constructor(public keyUseNo?: string,
                public distributeOpNo?: string,
                public distributeOpName?: string,
                public distributeDate?: string,
                public distributeTime?: string,
                public requestOpNo?: string,
                public requestOpName?: string,
                public requestDate?: string,
                public requestTime?: string,
                public rejectReason?: string,
                public grantOpNo?: string,
                public grantOpName?: string,
                public grantDate?: string,
                public grantTime?: string,
                public isReplaceOp?: number,
                public replaceOpNo?: string,
                public returnOpNo?: string,
                public returnOpName?: string,
                public returnRcvNo?: string,
                public returnRcvName?: string,
                public returnDate?: string,
                public returnTime?: string,
                public lateReturnReason?: string,
                public keyUseStatus?: number,
                public crashFlag?: number,
                public note?: string,
                public taskType?: string, ) {

    }

}
