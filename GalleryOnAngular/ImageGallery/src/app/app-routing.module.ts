import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadComponent } from './gallery/upload/upload.component';
import { ListComponent } from './gallery/list/list.component';


const routes: Routes = [
  {path:'',redirectTo:'gallery/upload',pathMatch:'full'},
  {path:'gallery',component:GalleryComponent,children:[
    {path:'upload',component:UploadComponent},
    {path:'list',component:ListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
