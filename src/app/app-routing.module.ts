import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
  { path: 'gallery', loadChildren: './pages/gallery/gallery.module#GalleryPageModule' },
  { path: 'image-viewer/:url/:title/:type', loadChildren: './pages/image-viewer/image-viewer.module#ImageViewerPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'logs', loadChildren: './pages/logs/logs.module#LogsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
