import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../services/ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../model/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {
  private subjectPesquisa: Subject<string> = new Subject<string>();
  public ofertas: Observable<Oferta[]>;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {

        if (termo.trim() === "") {
          return of<Oferta[]>([]);
        }

        return this.ofertasService.pesquisaOfertas(termo)
      }),
      catchError((erro) => of<Oferta[]>([]))
    )
  }

  pesquisa(termo: string) {
    this.subjectPesquisa.next(termo)
  }

  limparPesquisa() {
    this.subjectPesquisa.next("");
  }
}
