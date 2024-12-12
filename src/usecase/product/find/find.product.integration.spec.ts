import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/produtct/repository/sequelize/procuct.model";
import ProductRepository from "../../../infrastructure/produtct/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test find product use case", () => {
    
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

    it ("should find a product", async () => {

        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const product = new Product("123", "product", 100);
        
        await productRepository.create(product);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "product",
            price: 100,
        }

         const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

});