import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  list:any[];
  rowIndexArray:any[];
  constructor( private service:ImageService ) { }

  ngOnInit() {
    this.service.imageList.snapshotChanges().subscribe(list=>{
      this.list=list.map(item=>{return item.payload.val()})
      console.log(this.list)
    })
  }

}
