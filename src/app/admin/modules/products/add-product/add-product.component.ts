import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  
}
