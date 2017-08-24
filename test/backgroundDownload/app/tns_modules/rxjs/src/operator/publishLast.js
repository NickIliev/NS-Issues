"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AsyncSubject_1 = require("../AsyncSubject");
var multicast_1 = require("./multicast");
/**
 * @return {ConnectableObservable<T>}
 * @method publishLast
 * @owner Observable
 */
function publishLast() {
    return multicast_1.multicast.call(this, new AsyncSubject_1.AsyncSubject());
}
exports.publishLast = publishLast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaExhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwdWJsaXNoTGFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdEQUErQztBQUMvQyx5Q0FBd0M7QUFHeEM7Ozs7R0FJRztBQUNIO0lBQ0UsTUFBTSxDQUFDLHFCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLDJCQUFZLEVBQUssQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFGRCxrQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFzeW5jU3ViamVjdCB9IGZyb20gJy4uL0FzeW5jU3ViamVjdCc7XG5pbXBvcnQgeyBtdWx0aWNhc3QgfSBmcm9tICcuL211bHRpY2FzdCc7XG5pbXBvcnQgeyBDb25uZWN0YWJsZU9ic2VydmFibGUgfSBmcm9tICcuLi9vYnNlcnZhYmxlL0Nvbm5lY3RhYmxlT2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogQHJldHVybiB7Q29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+fVxuICogQG1ldGhvZCBwdWJsaXNoTGFzdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1Ymxpc2hMYXN0PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4pOiBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gbXVsdGljYXN0LmNhbGwodGhpcywgbmV3IEFzeW5jU3ViamVjdDxUPigpKTtcbn1cbiJdfQ==