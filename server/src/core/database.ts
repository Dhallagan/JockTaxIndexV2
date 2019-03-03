import {createConnection} from "typeorm";
import {User} from "../entity/User";
import {League} from "../entity/League";
import {TaxIndex} from "../entity/TaxIndex";

export class Database {
  //public static db: mysql.Connection

  public static async createConnection() {

    return createConnection({
        type: "mysql",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        synchronize: true,
        entities: [User, League, TaxIndex]
    });
  }
}
