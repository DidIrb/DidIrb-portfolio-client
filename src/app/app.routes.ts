import { Route } from '@angular/router';
import { AuthGuard } from './shared/services/route.guard.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LandingComponent } from './shared/view/landing/landing.component';
import { PNFComponent } from './shared/components/pnf/pnf.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';

export const appRoute: Route[] = [
  {
    path: 'welcome',
    component: LandingComponent,
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.routes').then((m) => m.registerRoute),
  },
  {
    path: 'administrator',
    component: AdminLayoutComponent,
    loadChildren: () => import('src/app/admin/admin.routes').then((m) => m.adminRoute),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: CommonLayoutComponent,
    loadChildren: () => import('src/app/shared/view/common.routes').then((m) => m.commonRoute),
  },
  { 
    path: '**',
    component: PNFComponent,
  },
];
