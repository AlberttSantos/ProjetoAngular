import { Pedido } from '../model/pedido.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from '../app.api'
import { map } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {
    constructor(private http: HttpClient) { }

    efetivarCompra(pedido: Pedido): Observable<number> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append("Content-type", "aplication/json");

        return this.http.post(
            `${URL}pedidos`,
            pedido,
            ({ headers: headers })
        ).pipe(
            map(
                (response: any) => {
                    return response.id;
                }))
    }
}