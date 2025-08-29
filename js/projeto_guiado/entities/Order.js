module.exports = class Order {
    #total
    #items//e um produto e uma quantidade(um array)
    #user

    // Construtor da classe, que recebe os itens do pedido e o usuário
    constructor(items, user) {
        // Verifica se a quantidade de cada produto é maior que o estoque disponível
        items.forEach(({ product, quantity }) => {
            if (quantity > product.inStock) {
                throw new Error('Quantidade insuficiente em estoque!')
            }
        })
        this.#items = items
        this.#user = user
        // Calcula o total do pedido somando o preço de cada produto multiplicado pela quantidade

        this.#total = items.reduce((sum, { product, quantity }) => sum + (product.price * quantity), 0)
    }
    // Retorna um objeto contendo os itens, o usuário e o total
    get data() {
        return {
            items: this.#items,
            user: this.#user,
            total: this.#total
        }
    }
}