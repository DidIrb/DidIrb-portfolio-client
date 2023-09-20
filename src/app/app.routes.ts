import { Route } from "@angular/router";
import { AuthGuard } from "./shared/services/route.guard.service";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

export const appRoute: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import ('src/app/auth/auth.routes').then((m) => m.registerRoute)
        // LoadChildren enables lazy loading
    },
    {
        path: 'administrator',
        component: AdminLayoutComponent,
        loadChildren: () => import ('src/app/admin/admin.routes').then((m) => m.adminRoute),
        canActivate: [AuthGuard],
        // LoadChildren enables lazy loading
    }
]
