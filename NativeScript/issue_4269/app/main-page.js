"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
function navigatingTo(args) {
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function navWithClearHistory() {
    var navigationEntry = {
        moduleName: "sub-page",
        context: { "taskType": "type", "taskId": "taskId", "curPage": "curPage" },
        animated: false,
        clearHistory: true //if set false，the problem is solved，but we need set true
    };
    frame_1.topmost().navigate(navigationEntry);
}
exports.navWithClearHistory = navWithClearHistory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0NBQW1DO0FBRW5DLHNCQUE2QixJQUFlO0lBQ3hDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDakMsQ0FBQztBQUZELG9DQUVDO0FBRUQ7SUFDSSxJQUFJLGVBQWUsR0FBRztRQUNsQixVQUFVLEVBQUUsVUFBVTtRQUN0QixPQUFPLEVBQUUsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQztRQUN2RSxRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxJQUFJLENBQUMseURBQXlEO0tBQy9FLENBQUM7SUFFRixlQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQVRELGtEQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgbGV0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5hdldpdGhDbGVhckhpc3RvcnkoKSB7XHJcbiAgICB2YXIgbmF2aWdhdGlvbkVudHJ5ID0ge1xyXG4gICAgICAgIG1vZHVsZU5hbWU6IFwic3ViLXBhZ2VcIixcclxuICAgICAgICBjb250ZXh0OiB7XCJ0YXNrVHlwZVwiOiBcInR5cGVcIiwgXCJ0YXNrSWRcIjogXCJ0YXNrSWRcIiwgXCJjdXJQYWdlXCI6IFwiY3VyUGFnZVwifSxcclxuICAgICAgICBhbmltYXRlZDogZmFsc2UsXHJcbiAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlIC8vaWYgc2V0IGZhbHNl77yMdGhlIHByb2JsZW0gaXMgc29sdmVk77yMYnV0IHdlIG5lZWQgc2V0IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgdG9wbW9zdCgpLm5hdmlnYXRlKG5hdmlnYXRpb25FbnRyeSk7XHJcbn1cclxuIl19