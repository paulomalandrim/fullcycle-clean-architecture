import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
   
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a new customer", async () => {
        const response = await request(app)
           .post("/customers")
           .send({ 
                name: "John Doe", 
                address: {
                    street: "Rua dos Bobos",
                    number: 123,
                    state: "SP",
                    city: "São Paulo",
                    zip: "01234567"
                }
           });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address.street).toBe("Rua dos Bobos");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.city).toBe("São Paulo");
        expect(response.body.address.zip).toBe("01234567");
    });


    it("should not create a new customer", async () => {
        const response = await request(app)
           .post("/customers")
           .send({ 
                name: "John Doe", 
                address: {
                    street: "Rua dos Bobos",
                    number: 123,
                    state: "SP",
                    zip: "01234567"
                }
           });

        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
        const response1 = await request(app)
        .post("/customers")
        .send({ 
             name: "John Doe", 
             address: {
                 street: "Rua dos Bobos",
                 number: 123,
                 state: "SP",
                 city: "São Paulo",
                 zip: "01234567"
             }
        });
        expect(response1.status).toBe(201);

        const response2 = await request(app)
        .post("/customers")
        .send({ 
             name: "Mary Jenkins", 
             address: {
                 street: "Rua Street",
                 number: 111,
                 state: "SP",
                 city: "São Paulo",
                 zip: "012223"
             }
        });
        expect(response2.status).toBe(201);

        const response = await request(app)
        .get("/customers")
        .send({});
        
        expect(response.status).toBe(200);
        expect(response.body.customers.length).toBe(2);
        expect(response.body.customers[0].name).toBe("John Doe");
        expect(response.body.customers[0].address.street).toBe("Rua dos Bobos");
        expect(response.body.customers[1].name).toBe("Mary Jenkins");
        expect(response.body.customers[1].address.street).toBe("Rua Street");
        

        const responseXML = await request(app)
        .get("/customers")
        .set('Accept', 'application/xml')
        .send({});

        expect(responseXML.status).toBe(200);
        expect(responseXML.text).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        expect(responseXML.text).toContain("<customers>");
        expect(responseXML.text).toContain("<customer>");
        expect(responseXML.text).toContain("<id>");
        expect(responseXML.text).toContain("<name>John Doe</name>");
        
        



    })


});