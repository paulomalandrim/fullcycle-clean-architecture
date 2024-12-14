import express from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../produtct/repository/sequelize/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list.customer.usecase';

export const productRoute = express.Router();

productRoute.post('/', async (req, res) => {
    // Implementar a criação de um novo produto
    const usecase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price,
        }

        console.log("Tentativa de gravar produto na base...");
        
        const output = await usecase.execute(productDto);
        
        res.status(201).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get('/', async (req, res) => {
    // Implementar a listagem de produtos
    const usecase = new ListProductUseCase(new ProductRepository());
    try {

        console.log("Tentativa de listar todos produtos...");
        
        const output = await usecase.execute({});

        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});