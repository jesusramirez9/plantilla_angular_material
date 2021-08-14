import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copy-product',
  templateUrl: './copy-product.component.html',
  styleUrls: ['./copy-product.component.scss']
})
export class CopyProductComponent implements OnInit {

  files: File[] = [];
  urlPrincipal: any;
  buttonDelete: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  handleFileInput(target: any) {
    for (let file of target.files) {
      this.files.push(file);
      console.log(this.files);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.urlPrincipal = event.target?.result;
      }
      this.buttonDelete = true;
    }
  }

  deleteImagen(imgPrincipal: any){
    imgPrincipal.value = null;
    this.urlPrincipal = null;
    this.files.pop();
    this.buttonDelete = false;
    console.log(imgPrincipal);
    console.log(this.files);
  }

  changeImagen(file:any){
    this.files.push(file);
    console.log(this.files);
  }
}
