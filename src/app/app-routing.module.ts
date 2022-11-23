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
    canActivate: [SiteGuard],
    loadChildren: () => import('./winbox99/winbox99.module').then((m) => m.Winbox99PageModule),
  },
  {
    path: 'tastefully',
    canActivate: [SiteGuard],
    loadChildren: () => import('./tastefully/tastefully.module').then((m) => m.TastefullyPageModule),
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
    canActivate: [SiteGuard],
    loadChildren: () => import('./jj-luckydraw/jj-luckydraw.module').then((m) => m.JJLuckydrawPageModule),
  },
  {
    path: 'jj',
    canActivate: [SiteGuard],
    loadChildren: () => import('./jj/jj.module').then((m) => m.JJPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
