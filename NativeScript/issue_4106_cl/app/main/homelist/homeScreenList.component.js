"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils = require("utils/utils");
var shared_1 = require("../../shared");
var shared_2 = require("../../shared");
var page_1 = require("ui/page");
var observable_array_1 = require("data/observable-array");
var router_1 = require("@angular/router");
var connectivity_1 = require("connectivity");
var application_settings_1 = require("application-settings");
var core_2 = require("@ngx-translate/core");
var HomeScreenList = (function () {
    function HomeScreenList(page, loginService, hieberService, router, translate) {
        var _this = this;
        this.page = page;
        this.loginService = loginService;
        this.hieberService = hieberService;
        this.router = router;
        this.homeListArray = [];
        //Activity indicatior
        this.isAuthenticating = false;
        this.itemVisible = "visible";
        translate.get('HOME.internet_connection', { value: '' }).subscribe(function (res) {
            _this.internet_connection_dialog = res;
        });
    }
    HomeScreenList.prototype.ngOnInit = function () {
        this.load();
        //   this.test();
    };
    HomeScreenList.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.timerForUpdateHomeList = setInterval(function () { return _this.load(); }, 2800);
    };
    HomeScreenList.prototype.ngOnDestroy = function () {
        // clearInterval when component is destroyed
        clearInterval(this.timerForUpdateHomeList);
    };
    HomeScreenList.prototype.load = function () {
        var _this = this;
        this.isAuthenticating = true;
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            clearInterval(this.timerForUpdateHomeList);
            this.isAuthenticating = false;
            shared_2.alert(this.internet_connection_dialog);
            return;
        }
        this.hieberService.getChatConversationAll()
            .subscribe(function (data) {
            var resultData = JSON.parse(JSON.stringify(data));
            _this.homeListArray = [];
            _this.homeList = new observable_array_1.ObservableArray(_this.homeListArray);
            for (var i = 0; i < resultData.length; i++) {
                var getData;
                var month = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
                if (resultData[i].UnreadMessageCount != 0) {
                    if (resultData[i].IsGroup === true) {
                        getData = { "Date": (new Date(resultData[i].Date).getTime() + new Date(resultData[i].Date).getTimezoneOffset() * 60 * 1000), "messageText": resultData[i].Message.Text, "groupName": resultData[i].Group.Name, "userItem": "collapsed", "grpItem": "visible", "groupId": resultData[i].Group.Id, "msgUnread": resultData[i].UnreadMessageCount, "userName": "", "userId": "", "grpNumber": true };
                        if (getData.msgUnread == 0) {
                            getData.msgUnread = "";
                            getData.grpNumber = false;
                        }
                    }
                    else {
                        getData = { "Date": (new Date(resultData[i].Date).getTime() + new Date(resultData[i].Date).getTimezoneOffset() * 60 * 1000), "messageText": resultData[i].Message.Text, "groupName": "", "userItem": "visible", "grpItem": "collapsed", "groupId": "", "msgUnread": resultData[i].UnreadMessageCount, "userName": resultData[i].User.Name, "userId": resultData[i].User.UserID, "grpNumber": true };
                        if (getData.msgUnread == 0) {
                            getData.msgUnread = "0";
                            getData.grpNumber = false;
                        }
                    }
                    _this.homeListArray.push(getData);
                }
            }
            if (_this.homeListArray.length != 0) {
                _this.homeList = new observable_array_1.ObservableArray(_this.homeListArray);
                _this.homeList.sort(function (left, right) { return left.Date == right.Date ? 0 : (left.Date > right.Date ? -1 : 1); });
            }
            else {
                _this.itemVisible = "collapsed";
            }
        }, function (error) {
            _this.isAuthenticating = false;
        }, function () {
            _this.isAuthenticating = false;
        });
    };
    HomeScreenList.prototype.homeNotificationListItemSelected = function (args) {
        var senderID = application_settings_1.getNumber("userID");
        var data = args.view.bindingContext;
        console.log("homeNotificationListItemSelected: " + "userid: " + data.userId + " " + "Name" + data.userName + " GrpName: " + data.GrpName + " " + "grpId: " + data.groupId);
        if (data.userId == "") {
            var navigationExtras = {
                queryParams: {
                    "groupName": data.groupName,
                    "chatGroupId": data.groupId
                }
            };
            this.router.navigate(["/tc-group-chat"], navigationExtras);
        }
        else {
            var navigationExtras = {
                queryParams: {
                    "OtherName": data.userName,
                    "chatUserId": data.userId,
                }
            };
            this.router.navigate(["/tc-chat"], navigationExtras);
        }
    };
    // The following trick makes the background color of each cell
    // in the UITableView transparent as it’s created.
    HomeScreenList.prototype.makeBackgroundTransparent = function (args) {
        var cell = args.ios;
        if (cell) {
            // support XCode 8
            cell.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
        }
    };
    // Document tab list on Tap Listener
    HomeScreenList.prototype.onItemTapHomeList = function (args) {
        console.log("Home list on click item: " + args.index);
    };
    // Delete item from the list for Android 
    HomeScreenList.prototype.remove = function (args) {
        console.log("index check: " + args.index);
        var btn = args.object;
        var tappedItemData = btn.bindingContext;
        this.homeList.splice(tappedItemData.id, 1);
        console.log("deleted");
    };
    return HomeScreenList;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HomeScreenList.prototype, "row", void 0);
HomeScreenList = __decorate([
    core_1.Component({
        selector: "gr-home-list",
        templateUrl: "main/homelist/homeScreenList.component.html",
        styleUrls: ["main/main-common.css"]
    }),
    __metadata("design:paramtypes", [page_1.Page, shared_1.LoginService, shared_1.HieberService, router_1.Router, core_2.TranslateService])
], HomeScreenList);
exports.HomeScreenList = HomeScreenList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZVNjcmVlbkxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZVNjcmVlbkxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBIO0FBQzFILG1DQUFxQztBQUNyQyx1Q0FBMkQ7QUFDM0QsdUNBQXFDO0FBQ3JDLGdDQUErQjtBQUMvQiwwREFBd0Q7QUFHeEQsMENBQTJEO0FBQzNELDZDQUFpRTtBQUNqRSw2REFBNEQ7QUFDNUQsNENBQXVEO0FBT3ZELElBQWEsY0FBYztJQWdCdkIsd0JBQW9CLElBQVUsRUFBVSxZQUEwQixFQUFVLGFBQTRCLEVBQVUsTUFBYyxFQUFDLFNBQTBCO1FBQTNKLGlCQUlDO1FBSm1CLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVpoSSxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUduQixxQkFBcUI7UUFDckIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBUS9CLFNBQVMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFXO1lBQzlFLEtBQUksQ0FBQywwQkFBMEIsR0FBRyxHQUFHLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLGlCQUFpQjtJQUNyQixDQUFDO0lBRUQsMkNBQWtCLEdBQWxCO1FBQUEsaUJBRUM7UUFERyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsV0FBVyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsSUFBSSxFQUFFLEVBQVgsQ0FBVyxFQUFFLElBQUksQ0FB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SUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN0QixJQUFJLGNBQWMsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBR0wscUJBQUM7QUFBRCxDQUFDLEFBM0lELElBMklDO0FBeklZO0lBQVIsWUFBSyxFQUFFOzsyQ0FBSztBQUZKLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7S0FDdEMsQ0FBQztxQ0FpQjRCLFdBQUksRUFBd0IscUJBQVksRUFBeUIsc0JBQWEsRUFBa0IsZUFBTSxFQUFXLHVCQUFnQjtHQWhCbEosY0FBYyxDQTJJMUI7QUEzSVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEhpZWJlclNlcnZpY2UsIExvZ2luU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjtcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5kZWNsYXJlIHZhciBVSUNvbG9yOiBhbnk7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ1aS9saXN0LXZpZXdcIjtcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgeyBzZXROdW1iZXIsIGdldE51bWJlciB9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJnci1ob21lLWxpc3RcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJtYWluL2hvbWVsaXN0L2hvbWVTY3JlZW5MaXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJtYWluL21haW4tY29tbW9uLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lU2NyZWVuTGlzdCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICBASW5wdXQoKSByb3c7XG5cbiAgICBob21lTGlzdEFycmF5ID0gW107XG4gICAgcHJpdmF0ZSB0aW1lckZvclVwZGF0ZUhvbWVMaXN0OiBudW1iZXI7XG5cbiAgICAvL0FjdGl2aXR5IGluZGljYXRpb3JcbiAgICBpc0F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XG4gICAgaXRlbVZpc2libGU6IHN0cmluZyA9IFwidmlzaWJsZVwiO1xuXG4gICAgcHVibGljIGhvbWVMaXN0OiBPYnNlcnZhYmxlQXJyYXk8YW55PjtcblxuICAgIC8vIHRyYW5zbGF0ZSBBcHBsaWNhdGlvblxuICAgIGludGVybmV0X2Nvbm5lY3Rpb25fZGlhbG9nOnN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBsb2dpblNlcnZpY2U6IExvZ2luU2VydmljZSwgcHJpdmF0ZSBoaWViZXJTZXJ2aWNlOiBIaWViZXJTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLHRyYW5zbGF0ZTpUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgIHRyYW5zbGF0ZS5nZXQoJ0hPTUUuaW50ZXJuZXRfY29ubmVjdGlvbicsIHsgdmFsdWU6ICcnIH0pLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuaW50ZXJuZXRfY29ubmVjdGlvbl9kaWFsb2cgPSByZXM7XG4gICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICBcbiAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgIC8vICAgdGhpcy50ZXN0KCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRpbWVyRm9yVXBkYXRlSG9tZUxpc3QgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmxvYWQoKSwgMjgwMCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIGNsZWFySW50ZXJ2YWwgd2hlbiBjb21wb25lbnQgaXMgZGVzdHJveWVkXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lckZvclVwZGF0ZUhvbWVMaXN0KTtcbiAgICB9XG4gICAgbG9hZCgpIHtcbiAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKGdldENvbm5lY3Rpb25UeXBlKCkgPT09IGNvbm5lY3Rpb25UeXBlLm5vbmUpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lckZvclVwZGF0ZUhvbWVMaXN0KTtcbiAgICAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgYWxlcnQodGhpcy5pbnRlcm5ldF9jb25uZWN0aW9uX2RpYWxvZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWViZXJTZXJ2aWNlLmdldENoYXRDb252ZXJzYXRpb25BbGwoKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdERhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbWVMaXN0QXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbWVMaXN0ID0gbmV3IE9ic2VydmFibGVBcnJheSh0aGlzLmhvbWVMaXN0QXJyYXkpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0RGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0RGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vbnRoID0geyBKYW46IFwiMDFcIiwgRmViOiBcIjAyXCIsIE1hcjogXCIwM1wiLCBBcHI6IFwiMDRcIiwgTWF5OiBcIjA1XCIsIEp1bjogXCIwNlwiLCBKdWw6IFwiMDdcIiwgQXVnOiBcIjA4XCIsIFNlcDogXCIwOVwiLCBPY3Q6IFwiMTBcIiwgTm92OiBcIjExXCIsIERlYzogXCIxMlwiIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHREYXRhW2ldLlVucmVhZE1lc3NhZ2VDb3VudCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0RGF0YVtpXS5Jc0dyb3VwID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RGF0YSA9IHsgXCJEYXRlXCI6IChuZXcgRGF0ZShyZXN1bHREYXRhW2ldLkRhdGUpLmdldFRpbWUoKSArIG5ldyBEYXRlKHJlc3VsdERhdGFbaV0uRGF0ZSkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwICogMTAwMCksIFwibWVzc2FnZVRleHRcIjogcmVzdWx0RGF0YVtpXS5NZXNzYWdlLlRleHQsIFwiZ3JvdXBOYW1lXCI6IHJlc3VsdERhdGFbaV0uR3JvdXAuTmFtZSwgXCJ1c2VySXRlbVwiOiBcImNvbGxhcHNlZFwiLCBcImdycEl0ZW1cIjogXCJ2aXNpYmxlXCIsIFwiZ3JvdXBJZFwiOiByZXN1bHREYXRhW2ldLkdyb3VwLklkLCBcIm1zZ1VucmVhZFwiOiByZXN1bHREYXRhW2ldLlVucmVhZE1lc3NhZ2VDb3VudCwgXCJ1c2VyTmFtZVwiOiBcIlwiLCBcInVzZXJJZFwiOiBcIlwiLCBcImdycE51bWJlclwiOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldERhdGEubXNnVW5yZWFkID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RGF0YS5tc2dVbnJlYWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXREYXRhLmdycE51bWJlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldERhdGEgPSB7IFwiRGF0ZVwiOiAobmV3IERhdGUocmVzdWx0RGF0YVtpXS5EYXRlKS5nZXRUaW1lKCkgKyBuZXcgRGF0ZShyZXN1bHREYXRhW2ldLkRhdGUpLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MCAqIDEwMDApLCBcIm1lc3NhZ2VUZXh0XCI6IHJlc3VsdERhdGFbaV0uTWVzc2FnZS5UZXh0LCBcImdyb3VwTmFtZVwiOiBcIlwiLCBcInVzZXJJdGVtXCI6IFwidmlzaWJsZVwiLCBcImdycEl0ZW1cIjogXCJjb2xsYXBzZWRcIiwgXCJncm91cElkXCI6IFwiXCIsIFwibXNnVW5yZWFkXCI6IHJlc3VsdERhdGFbaV0uVW5yZWFkTWVzc2FnZUNvdW50LCBcInVzZXJOYW1lXCI6IHJlc3VsdERhdGFbaV0uVXNlci5OYW1lLCBcInVzZXJJZFwiOiByZXN1bHREYXRhW2ldLlVzZXIuVXNlcklELCBcImdycE51bWJlclwiOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldERhdGEubXNnVW5yZWFkID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RGF0YS5tc2dVbnJlYWQgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RGF0YS5ncnBOdW1iZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvbWVMaXN0QXJyYXkucHVzaChnZXREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob21lTGlzdEFycmF5Lmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG9tZUxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHRoaXMuaG9tZUxpc3RBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG9tZUxpc3Quc29ydChmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnQuRGF0ZSA9PSByaWdodC5EYXRlID8gMCA6IChsZWZ0LkRhdGUgPiByaWdodC5EYXRlID8gLTEgOiAxKSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVZpc2libGUgPSBcImNvbGxhcHNlZFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGhvbWVOb3RpZmljYXRpb25MaXN0SXRlbVNlbGVjdGVkKGFyZ3MpIHtcbiAgICAgICAgdmFyIHNlbmRlcklEID0gZ2V0TnVtYmVyKFwidXNlcklEXCIpO1xuICAgICAgICB2YXIgZGF0YSA9IGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dDtcbiAgICAgICAgY29uc29sZS5sb2coXCJob21lTm90aWZpY2F0aW9uTGlzdEl0ZW1TZWxlY3RlZDogXCIgKyBcInVzZXJpZDogXCIgKyBkYXRhLnVzZXJJZCArIFwiIFwiICsgXCJOYW1lXCIgKyBkYXRhLnVzZXJOYW1lICsgXCIgR3JwTmFtZTogXCIgKyBkYXRhLkdycE5hbWUgKyBcIiBcIiArIFwiZ3JwSWQ6IFwiICsgZGF0YS5ncm91cElkKTtcbiAgICAgICAgaWYgKGRhdGEudXNlcklkID09IFwiXCIpIHtcbiAgICAgICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiZ3JvdXBOYW1lXCI6IGRhdGEuZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImNoYXRHcm91cElkXCI6IGRhdGEuZ3JvdXBJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90Yy1ncm91cC1jaGF0XCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiT3RoZXJOYW1lXCI6IGRhdGEudXNlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiY2hhdFVzZXJJZFwiOiBkYXRhLnVzZXJJZCxcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90Yy1jaGF0XCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgdHJpY2sgbWFrZXMgdGhlIGJhY2tncm91bmQgY29sb3Igb2YgZWFjaCBjZWxsXG4gICAgLy8gaW4gdGhlIFVJVGFibGVWaWV3IHRyYW5zcGFyZW50IGFzIGl04oCZcyBjcmVhdGVkLlxuICAgIG1ha2VCYWNrZ3JvdW5kVHJhbnNwYXJlbnQoYXJncykge1xuICAgICAgICBsZXQgY2VsbCA9IGFyZ3MuaW9zO1xuICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgLy8gc3VwcG9ydCBYQ29kZSA4XG4gICAgICAgICAgICBjZWxsLmJhY2tncm91bmRDb2xvciA9IHV0aWxzLmlvcy5nZXR0ZXIoVUlDb2xvciwgVUlDb2xvci5jbGVhckNvbG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERvY3VtZW50IHRhYiBsaXN0IG9uIFRhcCBMaXN0ZW5lclxuICAgIHB1YmxpYyBvbkl0ZW1UYXBIb21lTGlzdChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSG9tZSBsaXN0IG9uIGNsaWNrIGl0ZW06IFwiICsgYXJncy5pbmRleCk7XG4gICAgfVxuXG4gICAgLy8gRGVsZXRlIGl0ZW0gZnJvbSB0aGUgbGlzdCBmb3IgQW5kcm9pZCBcbiAgICBwdWJsaWMgcmVtb3ZlKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbmRleCBjaGVjazogXCIgKyBhcmdzLmluZGV4KTtcbiAgICAgICAgdmFyIGJ0biA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICB2YXIgdGFwcGVkSXRlbURhdGEgPSBidG4uYmluZGluZ0NvbnRleHQ7XG4gICAgICAgIHRoaXMuaG9tZUxpc3Quc3BsaWNlKHRhcHBlZEl0ZW1EYXRhLmlkLCAxKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJkZWxldGVkXCIpO1xuICAgIH1cblxuXG59XG5cbiJdfQ==