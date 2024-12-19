import ProductB from "./product-b";

describe("Product unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new ProductB("", "Product 1", 100);
        }).toThrow("product: Id is required");
    
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new ProductB("123", "", 100);
        }).toThrow("product: Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            let product = new ProductB("123", "Product 1", -9);
        }).toThrow("product: Price must be greater or equal zero");
    });

    it("should change name", () => {
        const product = new ProductB("123", "Produto 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should throw error when change by a empty name", () => {
        const product = new ProductB("123", "Produto 1", 100);
        expect(() => {
            product.changeName("");
        }).toThrow("product: Name is required");
    });

    it("should change price", () => {
        const product = new ProductB("123", "Produto 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(400);
    });

    it("should throw error when change by a empty name", () => {
        const product = new ProductB("123", "Produto 1", 100);
        expect(() => {
            product.changePrice(-20);
        }).toThrow("product: Price must be greater or equal zero");
    });

    it("should throw error when id and name are empty", () => {
        expect(() => {
            let product = new ProductB("", "", 100);
        }).toThrow("product: Id is required,product: Name is required");
    
    });

});