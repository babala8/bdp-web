import * as moment from 'moment';
import * as _ from 'lodash';
export function protoTypeEnhance() {
    (<any>window).dateFormat = 'YYYY-MM-DD';

    Date.prototype.format = function (format) {
        console.log(format || dateFormat);
        return moment(this).format(format || dateFormat);
    };

    /**
     * _.groupBy(collection, [iteratee=_.identity])
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     // => { '4': [4.2], '6': [6.1, 6.3] }

     // The `_.property` iteratee shorthand.
     _.groupBy(['one', 'two', 'three'], 'length');
     // => { '3': ['one', 'two'], '5': ['three'] }
     * */
    Array.prototype.groupBy = function (iteratee) {
        return _.groupBy(this, iteratee);
    };

    /**
     *
     * // The `_.property` iteratee shorthand.
     _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     // => [{ 'x': 1 }, { 'x': 2 }]
     * */
    Array.prototype.uniqBy = function (iteratee) {
        return _.uniqBy(this, iteratee);
    };

    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };
}


