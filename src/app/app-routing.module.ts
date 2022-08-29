import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SiteGuardService } from './cms-ui/route-guards.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'winbox99',
    loadChildren: () => import('./winbox99/winbox99.module').then(m => m.Winbox99PageModule),
    canActivate: [SiteGuardService]
  },
  {
    path: 'cms-admin',
    loadChildren: () => import('./cms-admin/cms-admin.module').then( m => m.CmsAdminPageModule)
  },  {
    path: 'tastefully',
    loadChildren: () => import('./tastefully/tastefully.module').then( m => m.TastefullyPageModule)
  },
  {
    path: 'teckguan',
    loadChildren: () => import('./teckguan/teckguan.module').then( m => m.TeckguanPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
