import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })
  };
  
  constructor(private http: HttpClient) { }

  getListaProductos(params: any){
    return this.http.post<any>(`${environment.apiURL}/web/catalogue/listProducts`, params);
  }

  getFiltros(){
    return this.http.get<any>(`${environment.apiURL}/web/catalogue/getData/filter`);
  }

  getDetalleProducto(id: number){
    return this.http.get<any>(`${environment.apiURL}/web/catalogue/getData/detail/${id}`);
  }
  
  getProductosRelacionados(params: any){
    return this.http.post<any>(`${environment.apiURL}/web/catalogue/getData/relatedProducts`, params);
  }

}
