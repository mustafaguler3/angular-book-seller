export class Purchase {
    id: number
    userId: number
    bookId: number
    price: number
    purchaseTime: Date = new Date();

    constructor(id?: number,bookId?: number, price?: number){
        this.id = id;
        this.bookId = bookId;
        this.price = price;
    }
}
