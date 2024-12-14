import express from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';

export const customerRoute = express.Router();

customerRoute.post('/', async (req, res) => {
    // Implementar a criação de um novo cliente
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                state: req.body.address.state,
                zip: req.body.address.zip,
                city: req.body.address.city,
            },
        }

        console.log("Tentativa de gravar na base...");
        
        const output = await usecase.execute(customerDto);
        
        res.status(201).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.get('/', async (req, res) => {
    // Implementar a listagem de clientes
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try {

        console.log("Tentativa de listar todos clientes...");
        
        const output = await usecase.execute({});

        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});