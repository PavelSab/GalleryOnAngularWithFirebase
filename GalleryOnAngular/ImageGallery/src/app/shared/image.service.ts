import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageList:AngularFireList<any>;

  constructor( public firebase:AngularFireDatabase) {}

    getImageList(){
      this.imageList=this.firebase.list('imageDetails');
    }
    insertImageList(imageDetails){
      this.imageList.push(imageDetails);
    }
}
