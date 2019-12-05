import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../services/ofertas.service';
import { Oferta } from '../model/oferta.model';
import { FnParam } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

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
}
