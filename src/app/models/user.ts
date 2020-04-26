import {Role} from './role';
import {Org} from './org';

export class User {
    constructor(public username?: string,
                public passwd?: string,
                public newPsswd?: string,
                public name?: string,
                public status?: string,
                public loginTime?: string,
                public loginIp?: string,
                public onlineFlag?: string,
                public mobileFlag?: string,
                public role?: Role,
                public org?: Org,
                public phone?: string,
                public mobile?: string,
                public email?: string,
                public photo?: string,
                public mobileRole?: boolean,
                public padRole?: boolean,
                public passwdExpiration?: string,
                public passwdError?: string,
                public roles?: Role[],
                public groupType?: string,
                public duty?: string,
    ) {

    }


}
