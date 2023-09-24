import { Route } from "@angular/router";
import { AboutMeComponent } from "./about-me/about-me.component";
import { ListComponent } from "./achievements/list/list.component";


export const commonRoute: Route[] = [
    {
        path: 'about-me',
        component: AboutMeComponent
    },
    {
        path: 'projects',
        component: ListComponent
    }
]