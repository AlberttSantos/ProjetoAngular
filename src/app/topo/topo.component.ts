import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../services/ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../model/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {
  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();
  public responseOfertas: Oferta[];

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
      catchError((erro) => {
        return of<Oferta[]>([]);
      })
    )

    this.ofertas.subscribe((response: Oferta[]) => {
      this.responseOfertas = response;
      console.log(this.responseOfertas)
    })
  }

  pesquisa(termo: string) {
    this.subjectPesquisa.next(termo)
  }
}
