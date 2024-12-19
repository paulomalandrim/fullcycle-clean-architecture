import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit testes", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John Doe");
        }).toThrow("customer: Id is required");
    
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("customer: Name is required");
    })

    it("should change name", () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    })

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "11111", "São Paulo", "11111");
        customer.changeAddress(address);

        customer.activate();

        expect(customer.isActive()).toBe(true);
    })

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");
        
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    })

    it("should throw error when address is undefined", () => {

        expect (() => {
            const customer = new Customer("1", "Customer 1");    
            customer.activate();
        }).toThrow("Address must be set before activating the customer");
        
    })

    it("should throw error when name an id are empty", () => {
        expect (() => {
            let customer = new Customer("", "");    
        }).toThrow("customer: Id is required,customer: Name is required");
        
    })


});