"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
        this.targetData = 12;
        this.categoryAxisField = "MeasurementDate";
        this.valueAxisField = "DistanceKM";
        this.targetValueAxisField = "Duration";
        this.dateFormat = "MM/dd/YYYY";
        this.majorStep = "Day";
        this.minDate = "01/06/2017";
        this.maxDate = "30/06/2017";
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.dayClick();
    };
    ItemsComponent.prototype.dayClick = function () {
        this.majorStep = "Day";
        this.dateFormat = "dd/MM";
        this.minDate = "09/06/2017";
        this.maxDate = "25/06/2017";
        this.chartData = [
            { MeasurementDate: "2017-06-10T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-11T00:00:00.000Z", Duration: 7, DistanceKM: 5.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-12T00:00:00.000Z", Duration: 7, DistanceKM: 3.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-13T00:00:00.000Z", Duration: 7, DistanceKM: 9.83, DistanceMiles: 2.6 },
            { MeasurementDate: "2017-06-14T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 3.6 },
            { MeasurementDate: "2017-06-15T00:00:00.000Z", Duration: 7, DistanceKM: 3.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-16T00:00:00.000Z", Duration: 7, DistanceKM: 9.83, DistanceMiles: 3.6 },
            { MeasurementDate: "2017-06-17T00:00:00.000Z", Duration: 7, DistanceKM: 4.83, DistanceMiles: 2.6 },
            { MeasurementDate: "2017-06-18T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 5.6 },
            { MeasurementDate: "2017-06-19T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-20T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-21T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-22T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-23T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-24T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
        ];
    };
    ItemsComponent.prototype.weekClick = function () {
        this.majorStep = "Week";
        this.dateFormat = "dd/MM/YY";
        this.minDate = "09/06/2017";
        this.maxDate = "25/06/2017";
        this.chartData = [
            { MeasurementDate: "2017-06-10T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-11T00:00:00.000Z", Duration: 7, DistanceKM: 5.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-12T00:00:00.000Z", Duration: 7, DistanceKM: 3.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-13T00:00:00.000Z", Duration: 7, DistanceKM: 9.83, DistanceMiles: 2.6 },
            { MeasurementDate: "2017-06-14T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 3.6 },
            { MeasurementDate: "2017-06-15T00:00:00.000Z", Duration: 7, DistanceKM: 3.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-06-16T00:00:00.000Z", Duration: 7, DistanceKM: 9.83, DistanceMiles: 3.6 },
            { MeasurementDate: "2017-06-17T00:00:00.000Z", Duration: 7, DistanceKM: 4.83, DistanceMiles: 2.6 },
            { MeasurementDate: "2017-06-18T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 5.6 },
            { MeasurementDate: "2017-06-19T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-20T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-21T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-22T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-23T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
            { MeasurementDate: "2017-06-24T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 9.6 },
        ];
    };
    ItemsComponent.prototype.monthClick = function () {
        this.majorStep = "Month";
        this.dateFormat = "dd/MM/YY";
        this.minDate = "01/06/2017";
        this.maxDate = "01/11/2017";
        this.chartData = [
            { MeasurementDate: "2017-06-01T00:00:00.000Z", Duration: 7, DistanceKM: 1.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-07-01T00:00:00.000Z", Duration: 7, DistanceKM: 2.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-08-01T00:00:00.000Z", Duration: 7, DistanceKM: 4.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-09-01T00:00:00.000Z", Duration: 7, DistanceKM: 3.83, DistanceMiles: 1.6 },
            { MeasurementDate: "2017-10-01T00:00:00.000Z", Duration: 7, DistanceKM: 0.83, DistanceMiles: 1.6 },
        ];
    };
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: "items.component.html"
    })
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBS2pELElBQWEsY0FBYztJQUozQjtRQU1XLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsc0JBQWlCLEdBQVcsaUJBQWlCLENBQUM7UUFDOUMsbUJBQWMsR0FBVyxZQUFZLENBQUM7UUFDdEMseUJBQW9CLEdBQVcsVUFBVSxDQUFDO1FBQzFDLGVBQVUsR0FBVyxZQUFZLENBQUM7UUFDbEMsY0FBUyxHQUFXLEtBQUssQ0FBQztRQUMxQixZQUFPLEdBQVcsWUFBWSxDQUFDO1FBQy9CLFlBQU8sR0FBVyxZQUFZLENBQUM7SUEwRTFDLENBQUM7SUF4RUcsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBRTVCLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDYixFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtZQUNsRyxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRTtTQUNyRyxDQUFDO0lBRU4sQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUc1QixJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2IsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDbEcsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7U0FDckcsQ0FBQztJQUVOLENBQUM7SUFFRCxtQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFFNUIsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNiLEVBQUUsZUFBZSxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFO1lBQ2xHLEVBQUUsZUFBZSxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFO1lBQ2xHLEVBQUUsZUFBZSxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFO1lBQ2xHLEVBQUUsZUFBZSxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFO1lBQ2xHLEVBQUUsZUFBZSxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFO1NBQ3JHLENBQUM7SUFFTixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBbkZELElBbUZDO0FBbkZZLGNBQWM7SUFKMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsc0JBQXNCO0tBQ3RDLENBQUM7R0FDVyxjQUFjLENBbUYxQjtBQW5GWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCJpdGVtcy5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwdWJsaWMgY2hhcnREYXRhOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyB0YXJnZXREYXRhOiBudW1iZXIgPSAxMjtcbiAgICBwdWJsaWMgY2F0ZWdvcnlBeGlzRmllbGQ6IHN0cmluZyA9IFwiTWVhc3VyZW1lbnREYXRlXCI7XG4gICAgcHVibGljIHZhbHVlQXhpc0ZpZWxkOiBzdHJpbmcgPSBcIkRpc3RhbmNlS01cIjtcbiAgICBwdWJsaWMgdGFyZ2V0VmFsdWVBeGlzRmllbGQ6IHN0cmluZyA9IFwiRHVyYXRpb25cIjtcbiAgICBwdWJsaWMgZGF0ZUZvcm1hdDogc3RyaW5nID0gXCJNTS9kZC9ZWVlZXCI7XG4gICAgcHVibGljIG1ham9yU3RlcDogc3RyaW5nID0gXCJEYXlcIjtcbiAgICBwdWJsaWMgbWluRGF0ZTogc3RyaW5nID0gXCIwMS8wNi8yMDE3XCI7XG4gICAgcHVibGljIG1heERhdGU6IHN0cmluZyA9IFwiMzAvMDYvMjAxN1wiO1xuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF5Q2xpY2soKTtcbiAgICB9XG5cbiAgICBkYXlDbGljaygpIHtcbiAgICAgICAgdGhpcy5tYWpvclN0ZXAgPSBcIkRheVwiO1xuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSBcImRkL01NXCI7XG4gICAgICAgIHRoaXMubWluRGF0ZSA9IFwiMDkvMDYvMjAxN1wiO1xuICAgICAgICB0aGlzLm1heERhdGUgPSBcIjI1LzA2LzIwMTdcIjtcblxuICAgICAgICB0aGlzLmNoYXJ0RGF0YSA9IFtcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDYtMTBUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogMS44MywgRGlzdGFuY2VNaWxlczogMS42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTExVDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDUuODMsIERpc3RhbmNlTWlsZXM6IDEuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNi0xMlQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiAzLjgzLCBEaXN0YW5jZU1pbGVzOiAxLjYgfSxcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDYtMTNUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogOS44MywgRGlzdGFuY2VNaWxlczogMi42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTE0VDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDEuODMsIERpc3RhbmNlTWlsZXM6IDMuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNi0xNVQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiAzLjgzLCBEaXN0YW5jZU1pbGVzOiAxLjYgfSxcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDYtMTZUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogOS44MywgRGlzdGFuY2VNaWxlczogMy42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTE3VDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDQuODMsIERpc3RhbmNlTWlsZXM6IDIuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNi0xOFQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiAxLjgzLCBEaXN0YW5jZU1pbGVzOiA1LjYgfSxcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDYtMTlUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogMC44MywgRGlzdGFuY2VNaWxlczogOS42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTIwVDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDAuODMsIERpc3RhbmNlTWlsZXM6IDkuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNi0yMVQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiAwLjgzLCBEaXN0YW5jZU1pbGVzOiA5LjYgfSxcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDYtMjJUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogMC44MywgRGlzdGFuY2VNaWxlczogOS42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTIzVDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDAuODMsIERpc3RhbmNlTWlsZXM6IDkuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNi0yNFQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiAwLjgzLCBEaXN0YW5jZU1pbGVzOiA5LjYgfSxcbiAgICAgICAgXTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgd2Vla0NsaWNrKCkge1xuICAgICAgICB0aGlzLm1ham9yU3RlcCA9IFwiV2Vla1wiO1xuICAgICAgICB0aGlzLmRhdGVGb3JtYXQgPSBcImRkL01NL1lZXCI7XG4gICAgICAgIHRoaXMubWluRGF0ZSA9IFwiMDkvMDYvMjAxN1wiO1xuICAgICAgICB0aGlzLm1heERhdGUgPSBcIjI1LzA2LzIwMTdcIjtcblxuXG4gICAgICAgIHRoaXMuY2hhcnREYXRhID0gW1xuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNi0xMFQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiAxLjgzLCBEaXN0YW5jZU1pbGVzOiAxLjYgfSxcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDYtMTFUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogNS44MywgRGlzdGFuY2VNaWxlczogMS42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTEyVDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDMuODMsIERpc3RhbmNlTWlsZXM6IDEuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNi0xM1QwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiA5LjgzLCBEaXN0YW5jZU1pbGVzOiAyLjYgfSxcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDYtMTRUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogMS44MywgRGlzdGFuY2VNaWxlczogMy42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTE1VDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDMuODMsIERpc3RhbmNlTWlsZXM6IDEuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNi0xNlQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiA5LjgzLCBEaXN0YW5jZU1pbGVzOiAzLjYgfSxcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDYtMTdUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogNC44MywgRGlzdGFuY2VNaWxlczogMi42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTE4VDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDEuODMsIERpc3RhbmNlTWlsZXM6IDUuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNi0xOVQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiAwLjgzLCBEaXN0YW5jZU1pbGVzOiA5LjYgfSxcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDYtMjBUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogMC44MywgRGlzdGFuY2VNaWxlczogOS42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTIxVDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDAuODMsIERpc3RhbmNlTWlsZXM6IDkuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNi0yMlQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiAwLjgzLCBEaXN0YW5jZU1pbGVzOiA5LjYgfSxcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDYtMjNUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogMC44MywgRGlzdGFuY2VNaWxlczogOS42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTI0VDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDAuODMsIERpc3RhbmNlTWlsZXM6IDkuNiB9LFxuICAgICAgICBdO1xuXG4gICAgfVxuXG4gICAgbW9udGhDbGljaygpIHtcbiAgICAgICAgdGhpcy5tYWpvclN0ZXAgPSBcIk1vbnRoXCI7XG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdCA9IFwiZGQvTU0vWVlcIjtcbiAgICAgICAgdGhpcy5taW5EYXRlID0gXCIwMS8wNi8yMDE3XCI7XG4gICAgICAgIHRoaXMubWF4RGF0ZSA9IFwiMDEvMTEvMjAxN1wiO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jaGFydERhdGEgPSBbXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA2LTAxVDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDEuODMsIERpc3RhbmNlTWlsZXM6IDEuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0wNy0wMVQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiAyLjgzLCBEaXN0YW5jZU1pbGVzOiAxLjYgfSxcbiAgICAgICAgICAgIHsgTWVhc3VyZW1lbnREYXRlOiBcIjIwMTctMDgtMDFUMDA6MDA6MDAuMDAwWlwiLCBEdXJhdGlvbjogNywgRGlzdGFuY2VLTTogNC44MywgRGlzdGFuY2VNaWxlczogMS42IH0sXG4gICAgICAgICAgICB7IE1lYXN1cmVtZW50RGF0ZTogXCIyMDE3LTA5LTAxVDAwOjAwOjAwLjAwMFpcIiwgRHVyYXRpb246IDcsIERpc3RhbmNlS006IDMuODMsIERpc3RhbmNlTWlsZXM6IDEuNiB9LFxuICAgICAgICAgICAgeyBNZWFzdXJlbWVudERhdGU6IFwiMjAxNy0xMC0wMVQwMDowMDowMC4wMDBaXCIsIER1cmF0aW9uOiA3LCBEaXN0YW5jZUtNOiAwLjgzLCBEaXN0YW5jZU1pbGVzOiAxLjYgfSxcbiAgICAgICAgXTtcblxuICAgIH1cbn1cbiJdfQ==