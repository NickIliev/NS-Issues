/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./main-view-model");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var dd;
var viewModel = new main_view_model_1.HelloWorldModel();
viewModel.set("cssClass", "default");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    var page = args.object;
    var items = new nativescript_drop_down_1.ValueList();
    dd = page.getViewById("dd");
    viewModel.set("items", items);
    viewModel.set("hint", "My Hint");
    viewModel.set("selectedIndex", null);
    viewModel.set("isEnabled", true);
    viewModel.set("cssClass", "default");
    page.bindingContext = viewModel;
    for (var loop = 0; loop < 200; loop++) {
        items.push({ value: "I" + loop, display: "Item " + loop });
    }
}
exports.navigatingTo = navigatingTo;
function changeStyles() {
    viewModel.set("cssClass", "changed-styles");
}
exports.changeStyles = changeStyles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0VBSUU7OztBQUlGLHFEQUFvRDtBQUNwRCxpRUFBNEY7QUFFNUYsSUFBSSxFQUFFLENBQUM7QUFDUCxJQUFJLFNBQVMsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztBQUN0QyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUVyQyx3RUFBd0U7QUFDeEUsc0JBQTZCLElBQWU7SUFDeEMsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixJQUFNLEtBQUssR0FBRyxJQUFJLGtDQUFTLEVBQVUsQ0FBQztJQUV0QyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBVyxJQUFJLENBQUMsQ0FBQztJQUV0QyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5QixTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNqQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUVyQyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztJQUVoQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBSSxJQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVEsSUFBTSxFQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0FBQ0wsQ0FBQztBQWpCRCxvQ0FpQkM7QUFFRDtJQUNJLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUZELG9DQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkluIE5hdGl2ZVNjcmlwdCwgYSBmaWxlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBhbiBYTUwgZmlsZSBpcyBrbm93biBhc1xuYSBjb2RlLWJlaGluZCBmaWxlLiBUaGUgY29kZS1iZWhpbmQgaXMgYSBncmVhdCBwbGFjZSB0byBwbGFjZSB5b3VyIHZpZXdcbmxvZ2ljLCBhbmQgdG8gc2V0IHVwIHlvdXIgcGFnZeKAmXMgZGF0YSBiaW5kaW5nLlxuKi9cblxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEhlbGxvV29ybGRNb2RlbCB9IGZyb20gJy4vbWFpbi12aWV3LW1vZGVsJztcbmltcG9ydCB7IERyb3BEb3duLCBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSwgVmFsdWVMaXN0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcblxubGV0IGRkOyBcbmxldCB2aWV3TW9kZWwgPSBuZXcgSGVsbG9Xb3JsZE1vZGVsKCk7XG52aWV3TW9kZWwuc2V0KFwiY3NzQ2xhc3NcIiwgXCJkZWZhdWx0XCIpO1xuXG4vLyBFdmVudCBoYW5kbGVyIGZvciBQYWdlIFwibmF2aWdhdGluZ1RvXCIgZXZlbnQgYXR0YWNoZWQgaW4gbWFpbi1wYWdlLnhtbFxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpbmdUbyhhcmdzOiBFdmVudERhdGEpIHtcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgY29uc3QgaXRlbXMgPSBuZXcgVmFsdWVMaXN0PHN0cmluZz4oKTtcbiAgICBcbiAgICBkZCA9IHBhZ2UuZ2V0Vmlld0J5SWQ8RHJvcERvd24+KFwiZGRcIik7XG5cbiAgICB2aWV3TW9kZWwuc2V0KFwiaXRlbXNcIiwgaXRlbXMpO1xuICAgIHZpZXdNb2RlbC5zZXQoXCJoaW50XCIsIFwiTXkgSGludFwiKTtcbiAgICB2aWV3TW9kZWwuc2V0KFwic2VsZWN0ZWRJbmRleFwiLCBudWxsKTsgICAgXG4gICAgdmlld01vZGVsLnNldChcImlzRW5hYmxlZFwiLCB0cnVlKTsgICAgXG4gICAgdmlld01vZGVsLnNldChcImNzc0NsYXNzXCIsIFwiZGVmYXVsdFwiKTtcblxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSB2aWV3TW9kZWw7XG5cbiAgICBmb3IgKGxldCBsb29wID0gMDsgbG9vcCA8IDIwMDsgbG9vcCsrKSB7XG4gICAgICAgIGl0ZW1zLnB1c2goeyB2YWx1ZTogYEkke2xvb3B9YCwgZGlzcGxheTogYEl0ZW0gJHtsb29wfWB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VTdHlsZXMoKSB7XG4gICAgdmlld01vZGVsLnNldChcImNzc0NsYXNzXCIsIFwiY2hhbmdlZC1zdHlsZXNcIik7XG59Il19