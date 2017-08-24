
import { ITemplateSelector } from "nativescript-carousel-view";
import * as builder from "ui/builder";
import * as frame from 'ui/frame';

export class MyTemplateSelector implements ITemplateSelector {
    
    OnSelectTemplate(position: number, bindingContext: any) {

        var page = frame.topmost().currentPage;

        var view = builder.load({
            path: "~/Views/Slides",
            name: "slider-view",
            page: page
        });

        // required
        view.bindingContext = bindingContext;

        return view;
    }
}