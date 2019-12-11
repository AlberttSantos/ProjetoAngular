import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../services/ordem-compra.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pedido } from "../model/pedido.model"
import { CarrinhoService } from '../services/carrinho.service';
import { ItemCarrinho } from '../model/item-carrinho.model';

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
  public itensCarrinho: ItemCarrinho[];

  constructor(private ordemCompraService: OrdemCompraService, private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  confirmarCompra() {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('complemento').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();
    }
    else if (this.itensCarrinho.length === 0) {
      alert("carrinho vazio")
    }
    else {
      let pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.itensCarrinho);

      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((id: number) => {
          this.idPedido = id
          this.carrinhoService.removeAll();
        })
    }
  }

  removerItem(item: ItemCarrinho) {
    this.carrinhoService.removerItem(item);
  }
}
