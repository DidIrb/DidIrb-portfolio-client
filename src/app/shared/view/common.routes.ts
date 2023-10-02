import { Route } from "@angular/router";
import { AboutMeComponent } from "./about-me/about-me.component";
import { ListComponent } from "./achievements/list/list.component";
import { AchievementsComponent } from "./achievement/achievement.component"
import { BlogsComponent } from "./blogs/blog.component";
import { ContactsComponent } from "./contact/contact.component";


export const commonRoute: Route[] = [
    {
        path: 'about-me',
        component: AboutMeComponent
    },
    {
        path: 'projects',
        component: ListComponent
    },
    {
        path: 'achievements',
        component: AchievementsComponent
    },
    {
        path: 'blogs',
        component: BlogsComponent
    },
    {
        path: 'contact',
        component: ContactsComponent
    }
]