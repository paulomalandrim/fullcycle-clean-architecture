import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class ProductB extends Entity implements ProductInterface{

    private _name: string;
    private _price: number;

    constructor(_id: string, _name: string, _price: number){
        super();  // Call the constructor of the parent class (Entity)
        this._id = _id;
        this._name = _name;
        this._price = _price;
        this.validate();
    }

    validate(): boolean {
        if (this._id.length === 0){
            this.notification.addError({
                context: 'product',
                message: 'Id is required'
            })
        }
        if (this._name.length === 0){
            this.notification.addError({
                context: 'product',
                message: 'Name is required'
            })
        }     
        if (this._price < 0){
            this.notification.addError({
                context: 'product',
                message: 'Price must be greater or equal zero'
            })
        }
        if (this.notification.hasError()){
            throw new NotificationError(this.notification.getErrors());
        }
        return true;
    }

    changeName(name: string){
        this._name = name;
        this.validate();
    }

    get name(): string{
        return this._name;
    }

    get id(): string{
        return this._id;
    }

    changePrice(price: number){
        this._price = price;
        this.validate();
    }

    get price(): number{
        return this._price * 2;
    }

}