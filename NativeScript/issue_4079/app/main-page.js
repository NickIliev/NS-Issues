"use strict";
var frame_1 = require("ui/frame");
function onLoaded(args) {
    var page = args.object;
    frame_1.topmost().ios.navBarVisibility = "always";
    var controller = frame_1.topmost().ios.controller;
    controller.navigationBar.tintColor = UIColor.redColor;
    controller.navigationBarHIdden = false;
}
exports.onLoaded = onLoaded;
function onTap(args) {
    frame_1.topmost().navigate("sub-page");
}
exports.onTap = onTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxrQ0FBbUM7QUFJbkMsa0JBQXlCLElBQWU7SUFDcEMsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUU3QixlQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0lBRTFDLElBQUksVUFBVSxHQUFHLGVBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFFMUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUN0RCxVQUFVLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0FBQzNDLENBQUM7QUFURCw0QkFTQztBQUVELGVBQXNCLElBQWU7SUFDakMsZUFBTyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFGRCxzQkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XG5cbmRlY2xhcmUgdmFyIFVJQ29sb3I6IGFueTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGxldCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG5cbiAgICB0b3Btb3N0KCkuaW9zLm5hdkJhclZpc2liaWxpdHkgPSBcImFsd2F5c1wiO1xuXG4gICAgdmFyIGNvbnRyb2xsZXIgPSB0b3Btb3N0KCkuaW9zLmNvbnRyb2xsZXI7XG5cbiAgICBjb250cm9sbGVyLm5hdmlnYXRpb25CYXIudGludENvbG9yID0gVUlDb2xvci5yZWRDb2xvcjtcbiAgICBjb250cm9sbGVyLm5hdmlnYXRpb25CYXJISWRkZW4gPSBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uVGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIHRvcG1vc3QoKS5uYXZpZ2F0ZShcInN1Yi1wYWdlXCIpO1xufSJdfQ==