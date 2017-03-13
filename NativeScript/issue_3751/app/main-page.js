"use strict";
var main_view_model_1 = require("./main-view-model");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function onParentTap(args) {
    console.log("onParentTap");
}
exports.onParentTap = onParentTap;
function onChildTap(args) {
    console.log("onChildTap");
    var view = args.object;
    view.parent.off("tap"); // same valid for touch
}
exports.onChildTap = onChildTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxxREFBb0Q7QUFFcEQsc0JBQTZCLElBQWU7SUFFeEMsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUU3QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksaUNBQWUsRUFBRSxDQUFDO0FBQ2hELENBQUM7QUFMRCxvQ0FLQztBQUdELHFCQUE0QixJQUFlO0lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUZELGtDQUVDO0FBRUQsb0JBQTJCLElBQUk7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsdUJBQXVCO0FBQ2pELENBQUM7QUFKRCxnQ0FJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBIZWxsb1dvcmxkTW9kZWwgfSBmcm9tICcuL21haW4tdmlldy1tb2RlbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XG5cbiAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIZWxsb1dvcmxkTW9kZWwoKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gb25QYXJlbnRUYXAoYXJnczogRXZlbnREYXRhKSB7XG4gIGNvbnNvbGUubG9nKFwib25QYXJlbnRUYXBcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNoaWxkVGFwKGFyZ3MpIHtcbiAgY29uc29sZS5sb2coXCJvbkNoaWxkVGFwXCIpO1xuICB2YXIgdmlldyA9IGFyZ3Mub2JqZWN0O1xuICB2aWV3LnBhcmVudC5vZmYoXCJ0YXBcIik7IC8vIHNhbWUgdmFsaWQgZm9yIHRvdWNoXG59XG4iXX0=