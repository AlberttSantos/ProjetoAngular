import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../services/ordem-compra.service';
import { Pedido } from '../model/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public endereco: string = ""
  public numero: string = "";
  public complemento: string = "";
  public formaPagamento: string = "";

  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public formaPagamentoValido: boolean;

  public enderecoEstado: boolean = true;
  public numeroEstado: boolean = true;
  public complementoEstado: boolean = true;
  public formaPagamentoEstado: boolean = true;
  public formularioValido: string = "disabled";

  public idPedido: number;

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
  }

  atualizarEndereco(enderenco: string) {
    this.endereco = enderenco;

    if (this.endereco.length > 3)
      this.enderecoValido = true;
    else
      this.enderecoValido = false;

    this.enderecoEstado = false;

    this.habilitarFormulario();
  }

  atualizarNumero(numero: string) {
    this.numero = numero;

    if (this.numero.length > 0)
      this.numeroValido = true;
    else
      this.numeroValido = false;

    this.numeroEstado = false;

    this.habilitarFormulario();
  }

  atualizarComplemento(complemento: string) {
    this.complemento = complemento;

    if (this.complemento.length > 0)
      this.complementoValido = true;

    this.complementoEstado = false;

    this.habilitarFormulario();
  }

  atualizarFormaPagamento(formaPagamento: string) {
    this.formaPagamento = formaPagamento;

    if (this.formaPagamento.length > 0)
      this.formaPagamentoValido = true;
    else
      this.formaPagamentoValido = false;

    this.formaPagamentoEstado = false;

    this.habilitarFormulario();
  }

  habilitarFormulario() {
    if (this.enderecoValido && this.numeroValido && this.formaPagamentoValido)
      this.formularioValido = "";
    else
      this.formularioValido = "disabled";
  }

  confirmar() {
    let pedido = new Pedido(this.endereco, this.numero, this.complemento, this.formaPagamento);

    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((response: number) => {        
        this.idPedido = response;
      });
  }

}
