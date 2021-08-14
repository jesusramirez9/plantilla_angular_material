import { Producto } from '../../../../models/Producto';
import { Component, OnInit } from '@angular/core';
import { ProductIntranetService } from 'src/app/services/intranet/product-intranet.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  listProducts: Producto[] = [];
  loading: boolean = true;
  msgNoData: boolean = false;
  buttonActive: number = 9;

  constructor(private productService: ProductIntranetService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getAllProducts();
  }

  getAllProducts(): void{
    this.loading = true;
    this.msgNoData = false;
    this.listProducts = [];
    this.buttonActive = 9;
    this.productService.getListaProductos('9/0').subscribe(result => {
      console.log(result);
      this.loading = false;
      this.listProducts = result.data;
      if(this.listProducts.length == 0){
        this.msgNoData = true;
      }
    }, error => {
      this.loading = false;
      this.msgNoData = true;
    });
  }

  getActivatedProducts(): void{
    this.loading = true;
    this.msgNoData = false;
    this.listProducts = [];
    this.buttonActive = 1;
    this.productService.getListaProductos('1/0').subscribe(result => {
      console.log(result);
      this.loading = false;
      this.listProducts = result.data;
      if(this.listProducts.length == 0){
        this.msgNoData = true;
      }
    }, error => {
      this.loading = false;
      this.msgNoData = true;
    });
  }

  getDisabledProducts(): void{
    this.loading = true;
    this.msgNoData = false;
    this.listProducts = [];
    this.buttonActive = 2;
    this.productService.getListaProductos('2/0').subscribe(result => {
      console.log(result);
      this.loading = false;
      this.listProducts = result.data;
      if(this.listProducts.length == 0){
        this.msgNoData = true;
      }
    }, error => {
      this.loading = false;
      this.msgNoData = true;
    });
  }

  getIncompleteProducts(): void{
    this.loading = true;
    this.msgNoData = false;
    this.listProducts = [];
    this.buttonActive = 0;
    this.productService.getListaProductos('0/1').subscribe(result => {
      console.log(result);
      this.loading = false;
      this.listProducts = result.data;
      if(this.listProducts.length == 0){
        this.msgNoData = true;
      }
    }, error => {
      this.loading = false;
      this.msgNoData = true;
    });
  }
}
