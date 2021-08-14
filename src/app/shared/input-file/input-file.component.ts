import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit {

  @Output() changeImage = new EventEmitter();
  @Output() deleteImage = new EventEmitter();
  @Input() isEmpty: boolean = false;
  @Input() nameInput: string = '';
  files: File[] = [];
  url: any;
  buttonDelete: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(target: any) {
    for (let file of target.files) {
      this.files.push(file);
      this.changeImage.emit(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = event.target?.result;
      }
      this.buttonDelete = true;
    }
  }

  deleteImagen(imgPrincipal: any){
    imgPrincipal.value = null;
    this.url = null;
    this.files.pop();
    this.buttonDelete = false;
    this.deleteImage.emit('');
    console.log(imgPrincipal);
    console.log(this.files);
  }
}
