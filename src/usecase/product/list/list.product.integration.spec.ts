import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/produtct/repository/sequelize/procuct.model";
import ProductRepository from "../../../infrastructure/produtct/repository/sequelize/product.repository";
import FindProductUseCase from "../find/find.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.customer.usecase";

describe("Test update product use case", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();        
    })

    it ("should listing a product", async () => {

        const productRepository = new ProductRepository();
        const createUsecase = new CreateProductUseCase(productRepository);

        const product1 = {
            name: "product1",
            price: 100,
        }

        const product2 = {
            name: "product2",
            price: 200,
        }
        

        await createUsecase.execute(product1);
        await createUsecase.execute(product2);

        const listUsecase = new ListProductUseCase(productRepository);
        const result = await listUsecase.execute({});

        expect(result.products.length).toEqual(2);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].price).toBe(product1.price);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].price).toBe(product2.price);       
    });

});