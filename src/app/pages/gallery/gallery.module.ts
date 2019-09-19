import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GalleryPage } from './gallery.page';
import { GalleryComponent } from 'src/app/components/gallery/gallery.component';
import { SubListComponent } from 'src/app/components/sub-list/sub-list.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [GalleryPage, GalleryComponent, SubListComponent]
})
export class GalleryPageModule {}
