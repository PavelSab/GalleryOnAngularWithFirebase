import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageService } from 'src/app/shared/image.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {
  formTemplate=new FormGroup({
    caption:new FormControl(''),
    imageUrl:new FormControl('')
  })

    selectedImage:any=null;
    imgSrc: string;
    isSubmit:boolean;

  constructor(private service:ImageService,
    private storage:AngularFireStorage) { }

  ngOnInit(): void {
    this.service.getImageList();
    this.resetForm();
  }

  showPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader=new FileReader();
      reader.onload=(e:any)=>this.imgSrc=e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage=event.target.files[0];
    }
    else{
      this.imgSrc='/assets/image.png';
      this.selectedImage=null;
    }
  }
  onSubmit(formValue){
    this.isSubmit=true;
    let filePath=`images/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const fileRef=this.storage.ref(filePath);
    this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          formValue['imageUrl']=url;
          this.service.insertImageList(formValue);
          this.resetForm();
        })
      })
      ).subscribe();
  }
  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption:'',
      imageUrl:''
    });
    this.imgSrc='/assets/image.png';
    this.selectedImage=null;
    this.isSubmit=false;
  }
}
