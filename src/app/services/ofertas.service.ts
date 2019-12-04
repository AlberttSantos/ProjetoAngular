import { Oferta } from '../model/oferta.model'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { URL } from "../app.api"
import { Observable } from 'rxjs'
import { map, retry } from 'rxjs/operators';

@Injectable()
export class OfertasService {

    constructor(private http: HttpClient) { }

    async getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL}ofertas?destaque=true`)
            .toPromise()
            .then((result: any) => result)
    }

    async getOfertasPorCategoria(categoria: any): Promise<Oferta[]> {
        return this.http.get(`${URL}ofertas?categoria=${categoria}`)
            .toPromise()
            .then((result: any) => result)
    }

    async getOfertasPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL}ofertas?id=${id}`)
            .toPromise()
            .then((result: Oferta) => result[0])
    }

    async getComoUsarPorId(id: number): Promise<string> {
        return this.http.get(`${URL}como-usar/${id}`)
            .toPromise()
            .then((result: any) => result.descricao)
    }

    async getOndeFicaPorId(id: number): Promise<string> {
        return this.http.get(`${URL}onde-fica/${id}`)
            .toPromise()
            .then((result: any) => result.descricao)
    }

    pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL}ofertas?descricao_oferta_like=${termo}`)
            .pipe(map((result: any) => result), retry(3))
    }
}