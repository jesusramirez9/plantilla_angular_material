import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoCatalogo } from 'src/app/models/ProductoCatalogo';
import { CatalogoService } from 'src/app/services/portal/catalogo.service';

export interface FeatureCatalogue{
  id?: number;
  question?: string;
  answer?: string;
}
export interface ImgCatalogue{
  idImage?: number;
  imageName?: string;
  imageType?: string;
}
export interface StockInfo{
  minQuantity?: number;
  maxQuantity?: number;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  amountProduct: number = 0;
  idProduct: number = 0;
  listImagenes: ImgCatalogue[] = [];
  detalleProducto: ProductoCatalogo = {};
  listPrecios = [];
  stockInfo: StockInfo = {};
  listCaracteristicas: FeatureCatalogue[] = [];
  linkImgPrincipal: string = '';
  activeImg: number = 0;
  listRelacionados: ProductoCatalogo[] = [];
  constructor(private catalogoSrv: CatalogoService, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(p => {
      this.idProduct = p['id'];
    });
    this.getDetailProduct();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log(this.idProduct);
    this.getProductosRelacionados();
  }

  getDetailProduct(): void {
    this.catalogoSrv.getDetalleProducto(this.idProduct).subscribe(response => {
      this.listImagenes = response.data.image;
      this.linkImgPrincipal = this.listImagenes[0].imageName!;
      this.detalleProducto = response.data.detail[0];
      this.listPrecios = response.data.price;
      this.stockInfo = response.data.stock[0];
      this.listCaracteristicas = response.data.features;
    });
  }

  reduceAmount(): void {
    if(this.amountProduct != 0){
      this.amountProduct--;
    }
  }

  increaseAmount(): void {
    this.amountProduct++;
  }

  changeImg(index: number): void {
    this.activeImg = index;
    this.linkImgPrincipal = this.listImagenes[index].imageName!;
  }

  getProductosRelacionados(): void {
    const params = {
      idProduct: this.idProduct,
      idCategory: "2"
    };
    this.catalogoSrv.getProductosRelacionados(params).subscribe(response => {
      this.listRelacionados = response.data;
    });
  }

}
