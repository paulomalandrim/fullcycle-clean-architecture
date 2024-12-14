import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
   
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a new product", async () => {
        const response = await request(app)
           .post("/products")
           .send({ 
                name: "Product 1", 
                price: 100
           });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(100);
    });


    it("should not create a new product", async () => {
        const response = await request(app)
           .post("/products")
           .send({ 
                name: "Product 1", 
           });

        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response1 = await request(app)
        .post("/products")
        .send({ 
             name: "Product 1", 
             price: 100
        });
        expect(response1.status).toBe(201);

        const response2 = await request(app)
        .post("/products")
        .send({ 
             name: "Product 2", 
             price: 200
        });
        expect(response2.status).toBe(201);

        const response = await request(app)
        .get("/products")
        .send({});
        
        expect(response.status).toBe(200);        
        expect(response.body.products.length).toBe(2);
        expect(response.body.products[0].name).toBe("Product 1");
        expect(response.body.products[0].price).toBe(100);
        expect(response.body.products[1].name).toBe("Product 2");
        expect(response.body.products[1].price).toBe(200);
    })


});