import {Menu} from './menu';

export class Role {
    constructor(public no?: string,
                public name?: string,
                public catalog?: string,
                public orgGrade?: number,
                public note?: string,
                public beforeRoelName?: string,
                public menus?: Menu[],
                // public buttons?: [],
                // public auditButton?: [],

    ) {

    }

}
