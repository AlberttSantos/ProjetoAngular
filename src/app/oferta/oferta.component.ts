import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../services/ofertas.service';
import { Oferta } from '../model/oferta.model';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.ofertasService.getOfertasPorId(params.id)
        .then((result: Oferta) => {
          this.oferta = result;
        })
    })
  }

  ngOnDestroy() {

  }

  Adicionar() {
    this.carrinhoService.incluirItem(this.oferta);
  }
}
