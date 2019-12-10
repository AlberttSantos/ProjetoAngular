export class ItemCarrinho {
    constructor(
        public id: number,
        public imagem: Object,
        public titulo: string,
        public descricao_oferta: string,
        public valor: number,
        public quantidade: number
    ) { }
}