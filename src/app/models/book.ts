export class Book {
    id: number
    title: string
    author: string
    price: number
    description: string
    createTime: Date = new Date();

    constructor(id?: number,title: string = "", price:number = 0){
        this.id = id;
        this.title = title;
        this.price = price;
    }
}
