import Customer from "../../customer/entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit testes", () => {

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");

        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(20);

    })

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });


    it("should get total of all orders", () => {

        const item1 = new OrderItem("i1", "item 1", 100, "p1", 1);
        const item2 = new OrderItem("i2", "item 2", 200, "p2", 1);
        const item3 = new OrderItem("i3", "item 3", 250, "p3", 2);
        
        const order1 = new Order("o1", "c1",[item1]);
        const order2 = new Order("o2","c1",[item2,item3]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(800);
    });
});