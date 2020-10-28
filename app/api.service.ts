import { Injectable } from '@angular/core';
import { ClsContact } from './Contact';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://udy.epizy.com/Hayes/api";
  
  constructor(private httpClient: HttpClient) {}

  SaveContact(article: ClsContact): Observable<number> {
    let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return this.httpClient.post<ClsContact>(`${this.PHP_API_SERVER}/Insert.php`, article, {
        headers: httpHeaders,
        observe: 'response'
    }
    ).pipe(
        map(res => res.status),
        catchError(this.handleError)
    );
}

private handleError(error: any) {
  console.error(error);
  return throwError(error);
}

}