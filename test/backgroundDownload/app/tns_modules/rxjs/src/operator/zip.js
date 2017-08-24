"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayObservable_1 = require("../observable/ArrayObservable");
var isArray_1 = require("../util/isArray");
var Subscriber_1 = require("../Subscriber");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
var iterator_1 = require("../symbol/iterator");
/* tslint:enable:max-line-length */
/**
 * @param observables
 * @return {Observable<R>}
 * @method zip
 * @owner Observable
 */
function zipProto() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return this.lift.call(zipStatic.apply(void 0, [this].concat(observables)));
}
exports.zipProto = zipProto;
/* tslint:enable:max-line-length */
/**
 * Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each
 * of its input Observables.
 *
 * If the latest parameter is a function, this function is used to compute the created value from the input values.
 * Otherwise, an array of the input values is returned.
 *
 * @example <caption>Combine age and name from different sources</caption>
 *
 * let age$ = Observable.of<number>(27, 25, 29);
 * let name$ = Observable.of<string>('Foo', 'Bar', 'Beer');
 * let isDev$ = Observable.of<boolean>(true, true, false);
 *
 * Observable
 *     .zip(age$,
 *          name$,
 *          isDev$,
 *          (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
 *     .subscribe(x => console.log(x));
 *
 * // outputs
 * // { age: 27, name: 'Foo', isDev: true }
 * // { age: 25, name: 'Bar', isDev: true }
 * // { age: 29, name: 'Beer', isDev: false }
 *
 * @param observables
 * @return {Observable<R>}
 * @static true
 * @name zip
 * @owner Observable
 */
function zipStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var project = observables[observables.length - 1];
    if (typeof project === 'function') {
        observables.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new ZipOperator(project));
}
exports.zipStatic = zipStatic;
var ZipOperator = (function () {
    function ZipOperator(project) {
        this.project = project;
    }
    ZipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ZipSubscriber(subscriber, this.project));
    };
    return ZipOperator;
}());
exports.ZipOperator = ZipOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ZipSubscriber = (function (_super) {
    __extends(ZipSubscriber, _super);
    function ZipSubscriber(destination, project, values) {
        if (values === void 0) { values = Object.create(null); }
        var _this = _super.call(this, destination) || this;
        _this.iterators = [];
        _this.active = 0;
        _this.project = (typeof project === 'function') ? project : null;
        _this.values = values;
        return _this;
    }
    ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;
        if (isArray_1.isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        }
        else if (typeof value[iterator_1.iterator] === 'function') {
            iterators.push(new StaticIterator(value[iterator_1.iterator]()));
        }
        else {
            iterators.push(new ZipBufferIterator(this.destination, this, value));
        }
    };
    ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        if (len === 0) {
            this.destination.complete();
            return;
        }
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
                this.add(iterator.subscribe(iterator, i));
            }
            else {
                this.active--; // not an observable
            }
        }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        // abort if not all of them have values
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            var result = iterator.next();
            // check to see if it's completed now that you've gotten
            // the next value.
            if (iterator.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        if (this.project) {
            this._tryProject(args);
        }
        else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };
    ZipSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return ZipSubscriber;
}(Subscriber_1.Subscriber));
exports.ZipSubscriber = ZipSubscriber;
var StaticIterator = (function () {
    function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
    }
    StaticIterator.prototype.hasValue = function () {
        return true;
    };
    StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };
    return StaticIterator;
}());
var StaticArrayIterator = (function () {
    function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    StaticArrayIterator.prototype[iterator_1.iterator] = function () {
        return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
    };
    StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
    };
    return StaticArrayIterator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ZipBufferIterator = (function (_super) {
    __extends(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        _this.observable = observable;
        _this.stillUnsubscribed = true;
        _this.buffer = [];
        _this.isComplete = false;
        return _this;
    }
    ZipBufferIterator.prototype[iterator_1.iterator] = function () {
        return this;
    };
    // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
    //    this is legit because `next()` will never be called by a subscription in this case.
    ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { value: null, done: true };
        }
        else {
            return { value: buffer.shift(), done: false };
        }
    };
    ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        }
        else {
            this.destination.complete();
        }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
        return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
    };
    return ZipBufferIterator;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiemlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUVBQWdFO0FBQ2hFLDJDQUEwQztBQUcxQyw0Q0FBMkM7QUFDM0Msc0RBQXFEO0FBRXJELCtEQUE4RDtBQUM5RCwrQ0FBaUU7QUFpQmpFLG1DQUFtQztBQUVuQzs7Ozs7R0FLRztBQUNIO0lBQW9ELHFCQUE0RTtTQUE1RSxVQUE0RSxFQUE1RSxxQkFBNEUsRUFBNUUsSUFBNEU7UUFBNUUsZ0NBQTRFOztJQUM5SCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxnQkFBSSxJQUFJLFNBQUssV0FBVyxHQUFFLENBQUM7QUFDNUQsQ0FBQztBQUZELDRCQUVDO0FBd0JELG1DQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0g7SUFBZ0MscUJBQTRFO1NBQTVFLFVBQTRFLEVBQTVFLHFCQUE0RSxFQUE1RSxJQUE0RTtRQUE1RSxnQ0FBNEU7O0lBQzFHLElBQU0sT0FBTyxHQUFnQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRixFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksaUNBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBTkQsOEJBTUM7QUFFRDtJQUlFLHFCQUFZLE9BQXNDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRCwwQkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENB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QWQ7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxVQUFhLEVBQUUsVUFBZSxFQUM5QixVQUFrQixFQUFFLFVBQWtCLEVBQ3RDLFFBQStCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELHFDQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsS0FBYTtRQUNqQyxNQUFNLENBQUMscUNBQWlCLENBQVcsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFyREQsQ0FBc0MsaUNBQWUsR0FxRHBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZUlucHV0IH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBcnJheU9ic2VydmFibGUgfSBmcm9tICcuLi9vYnNlcnZhYmxlL0FycmF5T2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgUGFydGlhbE9ic2VydmVyIH0gZnJvbSAnLi4vT2JzZXJ2ZXInO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gemlwUHJvdG88VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgcHJvamVjdDogKHYxOiBUKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBUMiwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBUMiwgVDMsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMykgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwUHJvdG88VCwgVDIsIFQzLCBUNCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBUMiwgVDMsIFQ0LCBUNSwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFI+KHRoaXM6IE9ic2VydmFibGU8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCB2NjogT2JzZXJ2YWJsZUlucHV0PFQ2PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNikgPT4gUik6IE9ic2VydmFibGU8Uj4gO1xuZXhwb3J0IGZ1bmN0aW9uIHppcFByb3RvPFQsIFQyPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPik6IE9ic2VydmFibGU8W1QsIFQyXT47XG5leHBvcnQgZnVuY3Rpb24gemlwUHJvdG88VCwgVDIsIFQzPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDNdPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBUMiwgVDMsIFQ0Pih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNF0+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFByb3RvPFQsIFQyLCBUMywgVDQsIFQ1Pih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1Pik6IE9ic2VydmFibGU8W1QsIFQyLCBUMywgVDQsIFQ1XT47XG5leHBvcnQgZnVuY3Rpb24gemlwUHJvdG88VCwgVDIsIFQzLCBUNCwgVDUsIFQ2Pih0aGlzOiBPYnNlcnZhYmxlPFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1PiwgdjY6IE9ic2VydmFibGVJbnB1dDxUNj4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDMsIFQ0LCBUNSwgVDZdPiA7XG5leHBvcnQgZnVuY3Rpb24gemlwUHJvdG88VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxUPiB8ICgoLi4udmFsdWVzOiBBcnJheTxUPikgPT4gUik+KTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBhcnJheTogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFQ+Pik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwUHJvdG88VCwgVE90aGVyLCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBhcnJheTogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFRPdGhlcj4+LCBwcm9qZWN0OiAodjE6IFQsIC4uLnZhbHVlczogQXJyYXk8VE90aGVyPikgPT4gUik6IE9ic2VydmFibGU8Uj47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIEBwYXJhbSBvYnNlcnZhYmxlc1xuICogQHJldHVybiB7T2JzZXJ2YWJsZTxSPn1cbiAqIEBtZXRob2QgemlwXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gemlwUHJvdG88VCwgUj4odGhpczogT2JzZXJ2YWJsZTxUPiwgLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxhbnk+IHwgKCguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpPik6IE9ic2VydmFibGU8Uj4ge1xuICByZXR1cm4gdGhpcy5saWZ0LmNhbGwoemlwU3RhdGljPFI+KHRoaXMsIC4uLm9ic2VydmFibGVzKSk7XG59XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4pOiBPYnNlcnZhYmxlPFtULCBUMl0+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDM+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPik6IE9ic2VydmFibGU8W1QsIFQyLCBUM10+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDMsIFQ0Pih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNF0+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDMsIFQ0LCBUNT4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDMsIFQ0LCBUNV0+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDMsIFQ0LCBUNSwgVDY+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCB2NjogT2JzZXJ2YWJsZUlucHV0PFQ2Pik6IE9ic2VydmFibGU8W1QsIFQyLCBUMywgVDQsIFQ1LCBUNl0+O1xuXG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHByb2plY3Q6ICh2MTogVCkgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBSPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIpID0+IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDMsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMykgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBUMywgVDQsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBUMywgVDQsIFQ1LCBSPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUpID0+IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCB2NjogT2JzZXJ2YWJsZUlucHV0PFQ2PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNikgPT4gUik6IE9ic2VydmFibGU8Uj47XG5cbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8VD4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxUPltdKTogT2JzZXJ2YWJsZTxUW10+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxSPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PGFueT5bXSk6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFI+KGFycmF5OiBPYnNlcnZhYmxlSW5wdXQ8VD5bXSwgcHJvamVjdDogKC4uLnZhbHVlczogQXJyYXk8VD4pID0+IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxSPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PGFueT5bXSwgcHJvamVjdDogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUik6IE9ic2VydmFibGU8Uj47XG5cbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8VD4oLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxUPj4pOiBPYnNlcnZhYmxlPFRbXT47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8VD4gfCAoKC4uLnZhbHVlczogQXJyYXk8VD4pID0+IFIpPik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8YW55PiB8ICgoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKT4pOiBPYnNlcnZhYmxlPFI+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBDb21iaW5lcyBtdWx0aXBsZSBPYnNlcnZhYmxlcyB0byBjcmVhdGUgYW4gT2JzZXJ2YWJsZSB3aG9zZSB2YWx1ZXMgYXJlIGNhbGN1bGF0ZWQgZnJvbSB0aGUgdmFsdWVzLCBpbiBvcmRlciwgb2YgZWFjaFxuICogb2YgaXRzIGlucHV0IE9ic2VydmFibGVzLlxuICpcbiAqIElmIHRoZSBsYXRlc3QgcGFyYW1ldGVyIGlzIGEgZnVuY3Rpb24sIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBjb21wdXRlIHRoZSBjcmVhdGVkIHZhbHVlIGZyb20gdGhlIGlucHV0IHZhbHVlcy5cbiAqIE90aGVyd2lzZSwgYW4gYXJyYXkgb2YgdGhlIGlucHV0IHZhbHVlcyBpcyByZXR1cm5lZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db21iaW5lIGFnZSBhbmQgbmFtZSBmcm9tIGRpZmZlcmVudCBzb3VyY2VzPC9jYXB0aW9uPlxuICpcbiAqIGxldCBhZ2UkID0gT2JzZXJ2YWJsZS5vZjxudW1iZXI+KDI3LCAyNSwgMjkpO1xuICogbGV0IG5hbWUkID0gT2JzZXJ2YWJsZS5vZjxzdHJpbmc+KCdGb28nLCAnQmFyJywgJ0JlZXInKTtcbiAqIGxldCBpc0RldiQgPSBPYnNlcnZhYmxlLm9mPGJvb2xlYW4+KHRydWUsIHRydWUsIGZhbHNlKTtcbiAqXG4gKiBPYnNlcnZhYmxlXG4gKiAgICAgLnppcChhZ2UkLFxuICogICAgICAgICAgbmFtZSQsXG4gKiAgICAgICAgICBpc0RldiQsXG4gKiAgICAgICAgICAoYWdlOiBudW1iZXIsIG5hbWU6IHN0cmluZywgaXNEZXY6IGJvb2xlYW4pID0+ICh7IGFnZSwgbmFtZSwgaXNEZXYgfSkpXG4gKiAgICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBvdXRwdXRzXG4gKiAvLyB7IGFnZTogMjcsIG5hbWU6ICdGb28nLCBpc0RldjogdHJ1ZSB9XG4gKiAvLyB7IGFnZTogMjUsIG5hbWU6ICdCYXInLCBpc0RldjogdHJ1ZSB9XG4gKiAvLyB7IGFnZTogMjksIG5hbWU6ICdCZWVyJywgaXNEZXY6IGZhbHNlIH1cbiAqXG4gKiBAcGFyYW0gb2JzZXJ2YWJsZXNcbiAqIEByZXR1cm4ge09ic2VydmFibGU8Uj59XG4gKiBAc3RhdGljIHRydWVcbiAqIEBuYW1lIHppcFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBSPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4gfCAoKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUik+KTogT2JzZXJ2YWJsZTxSPiB7XG4gIGNvbnN0IHByb2plY3QgPSA8KCguLi55czogQXJyYXk8YW55PikgPT4gUik+IG9ic2VydmFibGVzW29ic2VydmFibGVzLmxlbmd0aCAtIDFdO1xuICBpZiAodHlwZW9mIHByb2plY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvYnNlcnZhYmxlcy5wb3AoKTtcbiAgfVxuICByZXR1cm4gbmV3IEFycmF5T2JzZXJ2YWJsZShvYnNlcnZhYmxlcykubGlmdChuZXcgWmlwT3BlcmF0b3IocHJvamVjdCkpO1xufVxuXG5leHBvcnQgY2xhc3MgWmlwT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG5cbiAgcHJvamVjdDogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUjtcblxuICBjb25zdHJ1Y3Rvcihwcm9qZWN0PzogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUikge1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Uj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgWmlwU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnByb2plY3QpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIFppcFN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSB2YWx1ZXM6IGFueTtcbiAgcHJpdmF0ZSBwcm9qZWN0OiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSO1xuICBwcml2YXRlIGl0ZXJhdG9yczogTG9va0FoZWFkSXRlcmF0b3I8YW55PltdID0gW107XG4gIHByaXZhdGUgYWN0aXZlID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxSPixcbiAgICAgICAgICAgICAgcHJvamVjdD86ICguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIsXG4gICAgICAgICAgICAgIHZhbHVlczogYW55ID0gT2JqZWN0LmNyZWF0ZShudWxsKSkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLnByb2plY3QgPSAodHlwZW9mIHByb2plY3QgPT09ICdmdW5jdGlvbicpID8gcHJvamVjdCA6IG51bGw7XG4gICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IGFueSkge1xuICAgIGNvbnN0IGl0ZXJhdG9ycyA9IHRoaXMuaXRlcmF0b3JzO1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgaXRlcmF0b3JzLnB1c2gobmV3IFN0YXRpY0FycmF5SXRlcmF0b3IodmFsdWUpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZVtTeW1ib2xfaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpdGVyYXRvcnMucHVzaChuZXcgU3RhdGljSXRlcmF0b3IodmFsdWVbU3ltYm9sX2l0ZXJhdG9yXSgpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdG9ycy5wdXNoKG5ldyBaaXBCdWZmZXJJdGVyYXRvcih0aGlzLmRlc3RpbmF0aW9uLCB0aGlzLCB2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKSB7XG4gICAgY29uc3QgaXRlcmF0b3JzID0gdGhpcy5pdGVyYXRvcnM7XG4gICAgY29uc3QgbGVuID0gaXRlcmF0b3JzLmxlbmd0aDtcblxuICAgIGlmIChsZW4gPT09IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZSA9IGxlbjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgaXRlcmF0b3I6IFppcEJ1ZmZlckl0ZXJhdG9yPGFueSwgYW55PiA9IDxhbnk+aXRlcmF0b3JzW2ldO1xuICAgICAgaWYgKGl0ZXJhdG9yLnN0aWxsVW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHRoaXMuYWRkKGl0ZXJhdG9yLnN1YnNjcmliZShpdGVyYXRvciwgaSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hY3RpdmUtLTsgLy8gbm90IGFuIG9ic2VydmFibGVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBub3RpZnlJbmFjdGl2ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZS0tO1xuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gMCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrSXRlcmF0b3JzKCkge1xuICAgIGNvbnN0IGl0ZXJhdG9ycyA9IHRoaXMuaXRlcmF0b3JzO1xuICAgIGNvbnN0IGxlbiA9IGl0ZXJhdG9ycy5sZW5ndGg7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuXG4gICAgLy8gYWJvcnQgaWYgbm90IGFsbCBvZiB0aGVtIGhhdmUgdmFsdWVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGl0ZXJhdG9yID0gaXRlcmF0b3JzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBpdGVyYXRvci5oYXNWYWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiAhaXRlcmF0b3IuaGFzVmFsdWUoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHNob3VsZENvbXBsZXRlID0gZmFsc2U7XG4gICAgY29uc3QgYXJnczogYW55W10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgaXRlcmF0b3IgPSBpdGVyYXRvcnNbaV07XG4gICAgICBsZXQgcmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAvLyBjaGVjayB0byBzZWUgaWYgaXQncyBjb21wbGV0ZWQgbm93IHRoYXQgeW91J3ZlIGdvdHRlblxuICAgICAgLy8gdGhlIG5leHQgdmFsdWUuXG4gICAgICBpZiAoaXRlcmF0b3IuaGFzQ29tcGxldGVkKCkpIHtcbiAgICAgICAgc2hvdWxkQ29tcGxldGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcmdzLnB1c2gocmVzdWx0LnZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9qZWN0KSB7XG4gICAgICB0aGlzLl90cnlQcm9qZWN0KGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0aW5hdGlvbi5uZXh0KGFyZ3MpO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRDb21wbGV0ZSkge1xuICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RyeVByb2plY3QoYXJnczogYW55W10pIHtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IHRoaXMucHJvamVjdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHJlc3VsdCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIExvb2tBaGVhZEl0ZXJhdG9yPFQ+IGV4dGVuZHMgSXRlcmF0b3I8VD4ge1xuICBoYXNWYWx1ZSgpOiBib29sZWFuO1xuICBoYXNDb21wbGV0ZWQoKTogYm9vbGVhbjtcbn1cblxuY2xhc3MgU3RhdGljSXRlcmF0b3I8VD4gaW1wbGVtZW50cyBMb29rQWhlYWRJdGVyYXRvcjxUPiB7XG4gIHByaXZhdGUgbmV4dFJlc3VsdDogSXRlcmF0b3JSZXN1bHQ8VD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVyYXRvcjogSXRlcmF0b3I8VD4pIHtcbiAgICB0aGlzLm5leHRSZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG4gIH1cblxuICBoYXNWYWx1ZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG5leHQoKTogSXRlcmF0b3JSZXN1bHQ8VD4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMubmV4dFJlc3VsdDtcbiAgICB0aGlzLm5leHRSZXN1bHQgPSB0aGlzLml0ZXJhdG9yLm5leHQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaGFzQ29tcGxldGVkKCkge1xuICAgIGNvbnN0IG5leHRSZXN1bHQgPSB0aGlzLm5leHRSZXN1bHQ7XG4gICAgcmV0dXJuIG5leHRSZXN1bHQgJiYgbmV4dFJlc3VsdC5kb25lO1xuICB9XG59XG5cbmNsYXNzIFN0YXRpY0FycmF5SXRlcmF0b3I8VD4gaW1wbGVtZW50cyBMb29rQWhlYWRJdGVyYXRvcjxUPiB7XG4gIHByaXZhdGUgaW5kZXggPSAwO1xuICBwcml2YXRlIGxlbmd0aCA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcnJheTogVFtdKSB7XG4gICAgdGhpcy5sZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIH1cblxuICBbU3ltYm9sX2l0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5leHQodmFsdWU/OiBhbnkpOiBJdGVyYXRvclJlc3VsdDxUPiB7XG4gICAgY29uc3QgaSA9IHRoaXMuaW5kZXgrKztcbiAgICBjb25zdCBhcnJheSA9IHRoaXMuYXJyYXk7XG4gICAgcmV0dXJuIGkgPCB0aGlzLmxlbmd0aCA/IHsgdmFsdWU6IGFycmF5W2ldLCBkb25lOiBmYWxzZSB9IDogeyB2YWx1ZTogbnVsbCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgaGFzVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXJyYXkubGVuZ3RoID4gdGhpcy5pbmRleDtcbiAgfVxuXG4gIGhhc0NvbXBsZXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5hcnJheS5sZW5ndGggPT09IHRoaXMuaW5kZXg7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFppcEJ1ZmZlckl0ZXJhdG9yPFQsIFI+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIFI+IGltcGxlbWVudHMgTG9va0FoZWFkSXRlcmF0b3I8VD4ge1xuICBzdGlsbFVuc3Vic2NyaWJlZCA9IHRydWU7XG4gIGJ1ZmZlcjogVFtdID0gW107XG4gIGlzQ29tcGxldGUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogUGFydGlhbE9ic2VydmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHBhcmVudDogWmlwU3Vic2NyaWJlcjxULCBSPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFQ+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgW1N5bWJvbF9pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBOT1RFOiB0aGVyZSBpcyBhY3R1YWxseSBhIG5hbWUgY29sbGlzaW9uIGhlcmUgd2l0aCBTdWJzY3JpYmVyLm5leHQgYW5kIEl0ZXJhdG9yLm5leHRcbiAgLy8gICAgdGhpcyBpcyBsZWdpdCBiZWNhdXNlIGBuZXh0KClgIHdpbGwgbmV2ZXIgYmUgY2FsbGVkIGJ5IGEgc3Vic2NyaXB0aW9uIGluIHRoaXMgY2FzZS5cbiAgbmV4dCgpOiBJdGVyYXRvclJlc3VsdDxUPiB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDAgJiYgdGhpcy5pc0NvbXBsZXRlKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogbnVsbCwgZG9uZTogdHJ1ZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogYnVmZmVyLnNoaWZ0KCksIGRvbmU6IGZhbHNlIH07XG4gICAgfVxuICB9XG5cbiAgaGFzVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyLmxlbmd0aCA+IDA7XG4gIH1cblxuICBoYXNDb21wbGV0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmlzQ29tcGxldGU7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZSgpIHtcbiAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUluYWN0aXZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IGFueSxcbiAgICAgICAgICAgICBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIFI+KTogdm9pZCB7XG4gICAgdGhpcy5idWZmZXIucHVzaChpbm5lclZhbHVlKTtcbiAgICB0aGlzLnBhcmVudC5jaGVja0l0ZXJhdG9ycygpO1xuICB9XG5cbiAgc3Vic2NyaWJlKHZhbHVlOiBhbnksIGluZGV4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gc3Vic2NyaWJlVG9SZXN1bHQ8YW55LCBhbnk+KHRoaXMsIHRoaXMub2JzZXJ2YWJsZSwgdGhpcywgaW5kZXgpO1xuICB9XG59XG4iXX0=