import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductIntranetService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })
  };
  
  constructor(private http: HttpClient) { }

  getListaProductos(params: string){
    return this.http.get<any>(`${environment.apiURL}/intranet/product/${params}`, this.httpOptions);
  }

  getListaCategorias(){
    return this.http.get<any>(`${environment.apiURL}/intranet/product/productFeature/option/category`);
  }

  getListaFestividades(){
    return this.http.get<any>(`${environment.apiURL}/intranet/product/productFeature/option/festivity`);
  }

  getListaTipoProducto(){
    return this.http.get<any>(`${environment.apiURL}/intranet/product/productFeature/option/type`);
  }

  getListaColores(){
    return this.http.get<any>(`${environment.apiURL}/intranet/product/productFeature/option/color`);
  }

  saveProductoStep1(form: FormData){
    return this.http.post<any>(`${environment.apiURL}/intranet/product/addNewProduct/Part1`, form);
  }

  saveProductoStep2(form: FormData){
    return this.http.post<any>(`${environment.apiURL}/intranet/product/addNewProduct/Part2`, form);
  }

  saveProductoStep3(data: any){
    return this.http.post<any>(`${environment.apiURL}/intranet/product/addNewProduct/Part3`, data);
  }

  getDetalleProducto(id: number){
    return this.http.get<any>(`${environment.apiURL}/intranet/product/productDetail/all/${id}`);
  }

  updateProductoStep1(form: FormData){
    return this.http.post<any>(`${environment.apiURL}/intranet/product/editProduct/Part1`, form);
  }

  updateProductoStep2(form: FormData){
    return this.http.post<any>(`${environment.apiURL}/intranet/product/editProduct/Part2`, form);
  }

  updateProductoStep3(data: any){
    return this.http.post<any>(`${environment.apiURL}/intranet/product/editProduct/Part3`, data);
  }
}
