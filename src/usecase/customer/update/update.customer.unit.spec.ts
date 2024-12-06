import { Json } from "sequelize/types/utils";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John",
    new Address("street", 123, "city", "state", "zip")
    )

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "street updated",
        number: 122,
        city: "city updated",
        state: "state updated",
        zip: "zip updated"
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    }
}

describe("Unit test for customer update use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toStrictEqual(input);

    });
})
