import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() labelHeader: string = "";
  @Input() data: Producto = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPage(): void {
    if(this.data.productsStateAdd == 2){
      this.router.navigate(['/admin/product/add/step3/'+this.data.idproducts]);
    }else if(this.data.productsStateAdd == 1){
      this.router.navigate(['/admin/product/add/step2/'+this.data.idproducts]);
    }
  }
}
