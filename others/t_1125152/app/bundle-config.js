if (global.TNS_WEBPACK) {
    // registers tns-core-modules UI framework modules
    require("bundle-entry-points");
    global.registerModule("nativescript-telerik-ui/listview", function () { return require("../node_modules/nativescript-telerik-ui/listview"); });
    // register application modules
    global.registerModule("cars/cars-list-page", function () { return require("./cars/cars-list-page"); });
    global.registerModule("cars/car-detail-page/car-detail-page", function () { return require("./cars/car-detail-page/car-detail-page"); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1bmRsZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDckIsa0RBQWtEO0lBQ2xELE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRS9CLE1BQU0sQ0FBQyxjQUFjLENBQUMsa0NBQWtDLEVBQ3BELGNBQU0sT0FBQSxPQUFPLENBQUMsa0RBQWtELENBQUMsRUFBM0QsQ0FBMkQsQ0FBQyxDQUFDO0lBRXZFLCtCQUErQjtJQUMvQixNQUFNLENBQUMsY0FBYyxDQUFDLHFCQUFxQixFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO0lBQ3JGLE1BQU0sQ0FBQyxjQUFjLENBQUMsc0NBQXNDLEVBQ3hELGNBQU0sT0FBQSxPQUFPLENBQUMsd0NBQXdDLENBQUMsRUFBakQsQ0FBaUQsQ0FBQyxDQUFDO0FBQ2pFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoZ2xvYmFsLlROU19XRUJQQUNLKSB7XHJcbiAgICAvLyByZWdpc3RlcnMgdG5zLWNvcmUtbW9kdWxlcyBVSSBmcmFtZXdvcmsgbW9kdWxlc1xyXG4gICAgcmVxdWlyZShcImJ1bmRsZS1lbnRyeS1wb2ludHNcIik7XHJcblxyXG4gICAgZ2xvYmFsLnJlZ2lzdGVyTW9kdWxlKFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXdcIixcclxuICAgICAgICAoKSA9PiByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL2xpc3R2aWV3XCIpKTtcclxuXHJcbiAgICAvLyByZWdpc3RlciBhcHBsaWNhdGlvbiBtb2R1bGVzXHJcbiAgICBnbG9iYWwucmVnaXN0ZXJNb2R1bGUoXCJjYXJzL2NhcnMtbGlzdC1wYWdlXCIsICgpID0+IHJlcXVpcmUoXCIuL2NhcnMvY2Fycy1saXN0LXBhZ2VcIikpO1xyXG4gICAgZ2xvYmFsLnJlZ2lzdGVyTW9kdWxlKFwiY2Fycy9jYXItZGV0YWlsLXBhZ2UvY2FyLWRldGFpbC1wYWdlXCIsXHJcbiAgICAgICAgKCkgPT4gcmVxdWlyZShcIi4vY2Fycy9jYXItZGV0YWlsLXBhZ2UvY2FyLWRldGFpbC1wYWdlXCIpKTtcclxufVxyXG4iXX0=