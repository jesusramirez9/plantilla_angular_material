import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-dialog-color',
  templateUrl: './dialog-color.component.html',
  styleUrls: ['./dialog-color.component.scss']
})
export class DialogColorComponent implements OnInit {

  state: string = '#000000';
  constructor(public dialogRef: MatDialogRef<DialogColorComponent>) { }

  ngOnInit(): void {
  }

  handleChange($event: ColorEvent){
    this.state = $event.color.hex;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
