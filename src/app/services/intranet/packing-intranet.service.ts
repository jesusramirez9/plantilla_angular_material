import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackingIntranetService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })
  };
  
  constructor(private http: HttpClient) { }

  getListaEmpaques(params: string){
    return this.http.get<any>(`${environment.apiURL}/intranet/packing/${params}`);
  }

  savePacking(form: FormData){
    return this.http.post<any>(`${environment.apiURL}/intranet/packing/addNewPacking`, form);
  }

  updatePacking(form: FormData){
    return this.http.post<any>(`${environment.apiURL}/intranet/packing/editPacking`, form);
  }

  getDetailPacking(id: number){
    return this.http.get<any>(`${environment.apiURL}/intranet/packing/packingDetail/${id}`);
  }

  changeStatePacking(id: number, state: number){
    return this.http.get<any>(`${environment.apiURL}/intranet/packing/packingChangeState/${id}/${state}`);
  }
}
