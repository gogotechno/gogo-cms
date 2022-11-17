import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SiteGuard } from './cms-ui/route-guards.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'cms-admin',
    loadChildren: () => import('./cms-admin/cms-admin.module').then((m) => m.CmsAdminPageModule),
  },
  {
    path: 'winbox99',
    loadChildren: () => import('./winbox99/winbox99.module').then((m) => m.Winbox99PageModule),
    canActivate: [SiteGuard],
  },
  {
    path: 'tastefully',
    loadChildren: () => import('./tastefully/tastefully.module').then((m) => m.TastefullyPageModule),
    canActivate: [SiteGuard],
  },
  {
    path: 'teckguan',
    loadChildren: () => import('./teckguan/teckguan.module').then((m) => m.TeckguanPageModule),
  },
  {
    path: 'giver-form',
    loadChildren: () => import('./giver-form/giver-form.module').then((m) => m.GiverFormPageModule),
  },
  {
    path: 'jj-luckydraw',
    loadChildren: () => import('./jj-luckydraw/jj-luckydraw.module').then((m) => m.JJLuckydrawPageModule),
    canActivate: [SiteGuard],
  },
  {
    path: 'jj/membership',
    loadChildren: () => import('./jj-membership/jj-membership.module').then((m) => m.JJMembershipPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
