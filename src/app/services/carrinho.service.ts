import { ItemCarrinho } from '../model/item-carrinho.model';
import { Oferta } from '../model/oferta.model';

export class CarrinhoService {
    public itens: ItemCarrinho[] = [];

    exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    incluirItem(oferta: Oferta) {
        let itemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );

        let itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemEncontrado) {
            itemEncontrado.quantidade = itemEncontrado.quantidade + 1;
        }
        else {
            this.itens.push(itemCarrinho);
        }
    }
}