import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductVAlidatorFActory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface{

    private _name: string;
    private _price: number;

    constructor(_id: string, _name: string, _price: number){
        super();
        this._id = _id;
        this._name = _name;
        this._price = _price;
        this.validate();
    }

    validate(): boolean {
        
        ProductVAlidatorFActory.create().validate(this);

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

    changePrice(price: number){
        this._price = price;
        this.validate();
    }

    get price(): number{
        return this._price;
    }

}