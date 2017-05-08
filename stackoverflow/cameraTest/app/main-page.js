"use strict";
var main_view_model_1 = require("./main-view-model");
var image_1 = require("ui/image");
var camera = require("nativescript-camera");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function takePhoto() {
    camera.takePicture({})
        .then(function (imageAsset) {
        var image = new image_1.Image();
        image.src = imageAsset;
    }).catch(function (err) {
        console.log(err.message);
    });
}
exports.takePhoto = takePhoto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxxREFBb0Q7QUFDcEQsa0NBQWdDO0FBQ2hDLDRDQUE4QztBQUU5QyxzQkFBNkIsSUFBZTtJQUV4QyxJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRTdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQUxELG9DQUtDO0FBRUQ7SUFDSSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztTQUNyQixJQUFJLENBQUMsVUFBQSxVQUFVO1FBQ1osSUFBSSxLQUFLLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBUkQsOEJBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgSGVsbG9Xb3JsZE1vZGVsIH0gZnJvbSAnLi9tYWluLXZpZXctbW9kZWwnO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIlxuaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XG5cbiAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIZWxsb1dvcmxkTW9kZWwoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRha2VQaG90bygpIHtcbiAgICBjYW1lcmEudGFrZVBpY3R1cmUoe30pXG4gICAgLnRoZW4oaW1hZ2VBc3NldCA9PiB7XG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBpbWFnZUFzc2V0O1xuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKTtcbiAgICB9KVxufSJdfQ==