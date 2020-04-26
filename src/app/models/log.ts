export class Log {
    constructor(public logicId ?: string,
                public jobName ?: string,
                public jobResult ?: string,
                public jobType ?: string,
                public jobCreator ?: string,
                public startTime ?: string,
                public endTime ?: string,
                public resultDesc ?: string,) {
    }
}
