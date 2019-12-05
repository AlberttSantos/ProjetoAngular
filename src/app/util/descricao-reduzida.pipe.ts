import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: "descricaoReduzida"
})
export class DescricaoReduzida implements PipeTransform {
    transform(texto: string, min: number, max: number): string {
        if (texto.length > max) {
            return texto.substr(min, max) + "...";
        }

        return texto;
    }
}