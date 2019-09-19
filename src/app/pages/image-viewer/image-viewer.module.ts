import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ImageViewerPage } from './image-viewer.page';
import 'gl-ionic-background-video';

const routes: Routes = [
  {
    path: '',
    component: ImageViewerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ImageViewerPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageViewerPageModule {}
