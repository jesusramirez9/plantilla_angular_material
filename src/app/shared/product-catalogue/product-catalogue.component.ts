import { ProductoCatalogo } from 'src/app/models/ProductoCatalogo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.scss']
})
export class ProductCatalogueComponent implements OnInit {

  @Input() producto: ProductoCatalogo = {};
  constructor() { }

  ngOnInit(): void {
  }

}
