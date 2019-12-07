import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: []
})
export class OrdemCompraComponent implements OnInit {
  @ViewChild('formulario', { static: false }) public form: NgForm

  constructor() { }

  ngOnInit() {
  }

  confirmar() {
    console.log(this.form)
  }
}
