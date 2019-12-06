import { Pedido } from '../model/pedido.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrdemCompraService {
    constructor(private http: HttpClient) {

    }

    efetivarCompra(pedido: Pedido) {

    }
}