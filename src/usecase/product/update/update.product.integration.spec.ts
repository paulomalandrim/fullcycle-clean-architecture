import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/produtct/repository/sequelize/procuct.model";
import ProductRepository from "../../../infrastructure/produtct/repository/sequelize/product.repository";
import FindProductUseCase from "../find/find.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

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

    it ("should update a product", async () => {

        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const newProduct = {
            name: "product",
            price: 100,
        }

        const productCreated = await usecase.execute(newProduct);

        const findUsecase = new FindProductUseCase(productRepository);
        const productFound = await findUsecase.execute({id: productCreated.id});

        expect(productCreated).toEqual(productFound);

        const productToBeUpdated = {
            id: productCreated.id,
            name: "updatedProduct",
            price: 200,
        }

        const updateUsecase = new UpdateProductUseCase(productRepository);
        const productUpdated = await updateUsecase.execute(productToBeUpdated);

        expect(productUpdated).toEqual(productToBeUpdated);
    });

});