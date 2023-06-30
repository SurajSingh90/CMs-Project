import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SericesService {
  constructor(private http: HttpClient) {}
  registers(data: any) {
    return this.http.post('http://localhost:3500/v1/cretses', data);
  }
  login(data: any) {
    return this.http.post('http://localhost:3500/account/singin', data);
  }
  getallProducts() {
    return this.http.get('http://localhost:3500/all/products');
  }
  addProducts(data: any) {
    return this.http.post('http://localhost:3500/create/products', data);
  }
  productWithId(id: any) {
    return this.http.get('http://localhost:3500/get/product/byId/' + id);
  }
  purchageorder(data: any) {
    return this.http.post('http://localhost:3500/cretses/purchages', data);
  }
  invoiceDetails(data: any) {
    return this.http.get('http://localhost:3500/get/invoice/purchages/' + data);
  }
  getUsersProfile(data: any) {
    return this.http.get('http://localhost:3500/get/users/' + data);
  }
  updatesDetails(id: any, data: any) {
    return this.http.put('http://localhost:3500/updates/products/' + id, data);
  }
  deletdProducts(data: any) {
    return this.http.delete('http://localhost:3500/delete/products/' + data);
  }
  invoiceAdmine() {
    return this.http.get('http://localhost:3500/get/allProducts');
  }
}
