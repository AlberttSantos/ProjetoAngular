import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../services/ofertas.service';
import { Oferta } from '../model/oferta.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {
  public ofertas: Oferta[];

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria("restaurante")
      .then((result: Oferta[]) => this.ofertas = result)
      .catch((erro: any) => console.log("Deu ruim:" + erro));
  }

  getOfertasPorCategoria() {
    this.ofertasService.getOfertasPorCategoria("restaurante")
      .then((result: Oferta[]) => this.ofertas = result)
      .catch((erro: any) => console.log("Deu ruim"));
  }

}
