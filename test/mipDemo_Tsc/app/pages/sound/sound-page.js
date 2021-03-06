"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sound_view_model_1 = require("./sound-view-model");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new sound_view_model_1.SoundViewModel();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291bmQtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvdW5kLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx1REFBb0Q7QUFFcEQsd0VBQXdFO0FBQ3hFLFNBQWdCLFlBQVksQ0FBQyxJQUFlO0lBQ3hDLHVCQUF1QjtJQUN2QixJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQ0FBYyxFQUFFLENBQUM7QUFDL0MsQ0FBQztBQUpELG9DQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7IFNvdW5kVmlld01vZGVsIH0gZnJvbSBcIi4vc291bmQtdmlldy1tb2RlbFwiO1xyXG5cclxuLy8gRXZlbnQgaGFuZGxlciBmb3IgUGFnZSBcIm5hdmlnYXRpbmdUb1wiIGV2ZW50IGF0dGFjaGVkIGluIG1haW4tcGFnZS54bWxcclxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpbmdUbyhhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIC8vIEdldCB0aGUgZXZlbnQgc2VuZGVyXHJcbiAgICB2YXIgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBTb3VuZFZpZXdNb2RlbCgpO1xyXG59Il19