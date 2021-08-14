import { CategoriaFiltro } from './../../models/CategoriaFiltro';
import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/services/portal/catalogo.service';
import { ProductoCatalogo } from 'src/app/models/ProductoCatalogo';

@Component({
  selector: 'app-corporative-gifts',
  templateUrl: './corporative-gifts.component.html',
  styleUrls: ['./corporative-gifts.component.scss']
})
export class CorporativeGiftsComponent implements OnInit {

  listFilstrosCategory: CategoriaFiltro[] = [];
  listFilstrosPrice: any;
  listProducts: ProductoCatalogo[] = [];
  constructor(private catalogoSrv: CatalogoService) { 
    this.getFiltros();
    this.getProductos();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  getProductos(): void {
    const params = {
      order: "",
      strCategory: '',
      strPrice: {
        min:"10", 
        max:"2000"
      }
    };
    this.catalogoSrv.getListaProductos(params).subscribe(response => {
      console.log(response);
      this.listProducts = response.data;
    });
  }

  getFiltros(): void {
    this.catalogoSrv.getFiltros().subscribe(response => {
      console.log(response);
      this.listFilstrosCategory = response.data.category;
    });
  }

  changeState(event:any, index: number): void {
    console.log(event.checked);
    this.listFilstrosCategory[index].activo = event.checked;
  }

  applyFilters(): void {
    let strCategories = '';
    const listCategoriasActivas = this.listFilstrosCategory.filter(item => item.activo);
    listCategoriasActivas.forEach((item: CategoriaFiltro, index: number) => {
      strCategories += index == 0 ? `${item.id}`:`,${item.id}`;
    });
    const params = {
      order: "",
      strCategory: strCategories,
      strPrice: {
        min:"10", 
        max:"2000"
      }
    };
    this.catalogoSrv.getListaProductos(params).subscribe(response => {
      console.log(response);
      this.listProducts = response.data;
    });
  }
}
