import {
	Component, OnInit
	/// component core modules
} from "@angular/core";

import {
	BehaviorSubject
} from "rxjs/BehaviorSubject";

// START_CUSTOM_CODE_assetViewModelComponentImports
import { ActivatedRoute } from '@angular/router';
import {
	ListViewEventData, RadListView
} from "nativescript-telerik-ui/listview";
import { ObservableArray } from "data/observable-array";
// END_CUSTOM_CODE_assetViewModelComponentImports
/// component additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@Component({
	moduleId: module.id,
	selector: "ns-assetView",
	templateUrl: "assetView.component.html"
	/// component definitions
})

export class AssetViewComponent

	implements OnInit
/// component inheritance

{
	get title() {
		let result: string = "Assets";

		if (this._mode === shared.Modes.ADD) {

			result = "Create";

		} else if (this._mode === shared.Modes.EDIT) {

			result = "Edit";

		} else if (this._mode === shared.Modes.DETAIL) {

			let current: shared.Item = this._currentItem$.getValue();

			result = current.data.Name + "\0";

		}
		/// component custom title

		return result;
	}

	private _items$: ObservableArray<shared.Item>;
	private _currentItem$: BehaviorSubject<shared.Item>;
	private _mode: shared.Modes;

	modes = shared.Modes;

	get service() {
		return this._service;
	}

	get mode() {
		return this._mode;
	}

	get items$(): ObservableArray<shared.Item> {
		return this._items$;
	}

	get currentItem$() {
		return this._currentItem$.asObservable();
	}

	// START_CUSTOM_CODE_assetViewModelComponentProperties
	private _numberOfAddedItems: number;
	private sub: any;
	// END_CUSTOM_CODE_assetViewModelComponentProperties

	/// component additional properties

	constructor(

		// START_CUSTOM_CODE_assetViewModelComponentConstructorDependencies
		private route: ActivatedRoute,
		// END_CUSTOM_CODE_assetViewModelComponentConstructorDependencies

		/// component constructor dependencies

		private _service: common.AssetViewService
	) {

		this._mode = shared.Modes.LIST;

		this._items$ = new ObservableArray<shared.Item>();
		this._currentItem$ = new BehaviorSubject({
			id: "",
			data: {}
		});
		// START_CUSTOM_CODE_assetViewModelComponentConstructorMethod
		this._numberOfAddedItems = 0;
		// END_CUSTOM_CODE_assetViewModelComponentConstructorMethod

		/// component constructor method

	}

	ngOnInit() {
		this.onLoad();
		// START_CUSTOM_CODE_assetViewModelComponentOnInit

		this.sub = this.route.params.subscribe(params => {
			if (params["id"]) {
				//this.id = +params['id']; // (+) converts string 'id' to a number

				this._service.getById(params['id'])
					.subscribe((data) => {
						this.onSelect(
							{
								"item": {
									"id": data.Id,
									"data": data
								}
							}
						);
					}
					);

			}
		});

		// END_CUSTOM_CODE_assetViewModelComponentOnInit
	}

	onLoad() {

		this._items$ = new ObservableArray<shared.Item>();

		this._service.get()
			.subscribe(
			(data) => {
				data.forEach((item) => {

					let newItem: shared.Item = {
						"id": item.Id,
						"data": item
					};

					this.items$.push(newItem);
					
				});

				// START_CUSTOM_CODE_assetViewModelComponentCustomLoad
				this._numberOfAddedItems = this.items$.length;

				// END_CUSTOM_CODE_assetViewModelComponentCustomLoad
			}, (error) => {

				console.log(JSON.stringify(error));

			}
			);

	}

	onSelect(args) {
		this._currentItem$.next(args.item);
		this.onNavigate(shared.Modes.DETAIL);
	}

	onUpdate(args) {

		this._service.put(args.item.data)

			.subscribe(
			(data) => {
				let arr: ObservableArray<shared.Item> = this._items$;

				arr.forEach((itm, idx) => {
					if (itm.id === args.item.id) {
						arr[idx] = args.item;
					}
				});

				this._currentItem$.next(args.item);

				this.onNavigate(shared.Modes.DETAIL);
			}, (error) => {

				console.log(JSON.stringify(error));

			}
			);
	}

	onNavigateBack() {

		this.onNavigate(this._mode === shared.Modes.EDIT ? shared.Modes.DETAIL : shared.Modes.LIST);

	}

	onNavigate(mode: shared.Modes) {

		this._mode = mode;
	}
	// START_CUSTOM_CODE_assetViewModelComponentAdditionalMethods
	onLoadMoreItemsRequested(args: ListViewEventData) {
		let that = new WeakRef(this);

			let numberOfAddedItems: number = that.get()._numberOfAddedItems;

		that.get()._service.getNextX(numberOfAddedItems)
			.subscribe(
				(data) => {
					data.forEach((item) => {

						let newItem: shared.Item = {
							"id": item.Id,
							"data": item
						};

						that.get().items$.push(newItem);
						that.get()._numberOfAddedItems++;
					});

					var listView: RadListView = args.object;
					listView.notifyLoadOnDemandFinished();
					
				}, (error) => {

					console.log(JSON.stringify(error));

				}
			);

	}

	// END_CUSTOM_CODE_assetViewModelComponentAdditionalMethods
	/// component additional methods

}