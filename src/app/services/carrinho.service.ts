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

    getValorTotalCarrinho(): number {
        let total: number = 0;

        this.itens.map((item: ItemCarrinho) => {
            total = (item.valor * item.quantidade) + total;
        });

        return total;
    }

    adicionarItem(item: ItemCarrinho) {
        let itemEncontrato = this.itens.find((
            itemCarrinho: ItemCarrinho) => itemCarrinho.id === item.id);

        if (itemEncontrato)
            itemEncontrato.quantidade++;
    }

    removerItem(item: ItemCarrinho) {
        let itemEncontrato = this.itens.find((
            itemCarrinho: ItemCarrinho) => itemCarrinho.id === item.id);

        if (itemEncontrato) {
            itemEncontrato.quantidade--;

            if (itemEncontrato.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemEncontrato), 1)
            }
        }
    }

    removeAll() {
        this.itens = [];
    }
}