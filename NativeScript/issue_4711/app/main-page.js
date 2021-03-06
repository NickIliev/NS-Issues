"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./main-view-model");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function onPinch(args) {
    console.log(args.android);
    console.log(args.ios);
    console.log(args.eventName);
    console.log(args.object);
    console.log(args.scale);
    console.log(args.state);
    console.log(args.type);
    console.log(args.view);
    console.log(args.getFocusX());
    console.log(args.getFocusY());
}
exports.onPinch = onPinch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscURBQW9EO0FBSXBELHNCQUE2QixJQUFlO0lBRXhDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztBQUNoRCxDQUFDO0FBTEQsb0NBS0M7QUFFRCxpQkFBd0IsSUFBMkI7SUFFL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQTtJQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO0FBQ2pDLENBQUM7QUFkRCwwQkFjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBIZWxsb1dvcmxkTW9kZWwgfSBmcm9tICcuL21haW4tdmlldy1tb2RlbCc7XG5cbmltcG9ydCB7IFBpbmNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xuXG4gICAgbGV0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcblxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgSGVsbG9Xb3JsZE1vZGVsKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvblBpbmNoKGFyZ3M6IFBpbmNoR2VzdHVyZUV2ZW50RGF0YSkge1xuXG4gICAgY29uc29sZS5sb2coYXJncy5hbmRyb2lkKVxuICAgIGNvbnNvbGUubG9nKGFyZ3MuaW9zKVxuXG4gICAgY29uc29sZS5sb2coYXJncy5ldmVudE5hbWUpXG4gICAgY29uc29sZS5sb2coYXJncy5vYmplY3QpXG4gICAgY29uc29sZS5sb2coYXJncy5zY2FsZSlcbiAgICBjb25zb2xlLmxvZyhhcmdzLnN0YXRlKVxuICAgIGNvbnNvbGUubG9nKGFyZ3MudHlwZSlcbiAgICBjb25zb2xlLmxvZyhhcmdzLnZpZXcpXG5cbiAgICBjb25zb2xlLmxvZyhhcmdzLmdldEZvY3VzWCgpKVxuICAgIGNvbnNvbGUubG9nKGFyZ3MuZ2V0Rm9jdXNZKCkpXG59Il19