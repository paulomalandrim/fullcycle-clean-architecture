import express, {Express} from 'express';
import { Sequelize } from "sequelize-typescript";
import CustomerModel from '../customer/repository/sequelize/customer.model';
import { customerRoute } from './routes/customer.route';
import { productRoute } from './routes/product.route';
import ProductModel from '../produtct/repository/sequelize/procuct.model';

export const app: Express = express();

app.use(express.json());
app.use("/customers", customerRoute);
app.use("/products", productRoute);

export let sequelize: Sequelize;

async function setupDb(){
    sequelize = new Sequelize({
        storage: ":memory:",

        dialect: 'sqlite',
        logging: false,
    });
    await sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync();
    console.log("Database connected successfully.");
}

setupDb();