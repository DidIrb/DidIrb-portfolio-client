import { Route } from "@angular/router";

export const appRoute: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import ('src/app/auth/auth.routes').then((m) => m.registerRoute)
        // LoadChildren enables lazy loading
    },
    {
        path: 'administrator',
        loadChildren: () => import ('src/app/admin/admin.routes').then((m) => m.adminRoute)
        // LoadChildren enables lazy loading
    }
]
