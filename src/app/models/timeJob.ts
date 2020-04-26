export class TimeJob {
    constructor(public  id?: string,
                public  jobName?: string,
                public cron?: string,
                public desp?: string,
                public jobState?: number,
                public objName?: string,
                public trigName?: string,
                public params?: string,
                public methodName?: string,
                public concurrent?: string) {

    }
}
