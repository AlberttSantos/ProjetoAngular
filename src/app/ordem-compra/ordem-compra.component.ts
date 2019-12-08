import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../services/ordem-compra.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pedido } from "../model/pedido.model"

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {
  public formulario: FormGroup = new FormGroup({
    "endereco": new FormControl(null, [Validators.minLength(3), Validators.required]),
    "numero": new FormControl(null, [Validators.required]),
    "complemento": new FormControl(null),
    "formaPagamento": new FormControl(null, [Validators.required])
  })

  public idPedido: number;

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {

  }

  confirmarCompra() {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('complemento').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();

      return;
    }

    let pedido = new Pedido(
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento);

    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((id: number) => this.idPedido = id)
  }
}
