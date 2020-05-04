import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ProductFileReaderService {

  constructor(private httpClient: HttpClient) {
  }

  getJSONListOfProducts(): Observable<any> {
    return this.httpClient.get('../assets/data/products.json');
  }
}
