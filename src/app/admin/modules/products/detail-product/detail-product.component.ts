import { Color } from './../../../../models/Color';
import { TipoPago } from './../../../../models/TipoPago';
import { Precio } from './../../../../models/Precio';
import { ImagenProducto } from './../../../../models/ImagenProducto';
import { Caracteristica } from './../../../../models/Caracteristica';
import { Categoria } from './../../../../models/Categoria';
import { Producto } from './../../../../models/Producto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductIntranetService } from 'src/app/services/intranet/product-intranet.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  idProduct: number = 0;
  producto: Producto = {};
  categorias: Categoria[] = [];
  caracteristicas: Caracteristica[] = [];
  imagenes: ImagenProducto[] = [];
  imagenPrincipal: ImagenProducto = {};
  precios: Precio[] = [];
  tiposPago: TipoPago[] = [];
  colores: Color[] = [];

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductIntranetService,
    private router: Router) {
    this.activatedRoute.params.subscribe(p => {
      this.idProduct = p['id'];
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log(this.idProduct);
    this.getDetailProduct();
  }

  getDetailProduct(): void {
    this.productService.getDetalleProducto(this.idProduct).subscribe(response => {
      console.log(response);
      if (response.data){
        this.producto = response.data.product[0];
        this.categorias = response.data.category;
        this.caracteristicas = response.data.feature;
        this.imagenes = response.data.images;
        this.imagenes.forEach(item => {
          if(item.productsimageType == '1'){
            this.imagenPrincipal = item;
          }
        });
        this.imagenes = this.imagenes.filter(item => item.productsimageType != '1');
        this.precios = response.data.prices;
        this.tiposPago = response.data.typePayment;
        this.colores = response.data.color;
      }
    }, error => {
      console.log(error);
      this.router.navigate(['/admin/packing']);
    });
  }
}
