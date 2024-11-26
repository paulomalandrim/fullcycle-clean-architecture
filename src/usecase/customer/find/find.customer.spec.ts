import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import customerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";

describe("Test find customer use case", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();        
    })

    it ("should find a customer", async () => {

        const cutomerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository)

        const customer = new Customer("123", "Customer");
        const address = new Address("street", 123, "city", "state", "zip");
        customer.changeAddress(address);

        await cutomerRepository.create(customer);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "Customer",
            address: { 
                street: "street",
                number: 123,
                city: "city",
                state: "state",
                zip: "zip",
            }
        }

        const result = usecase.execute(input);

        expect(result).toEqual(output);
    });

});