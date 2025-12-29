import { User } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";


const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "wizkids_app",
    host: "localhost",
    port: 5432,
    username: "Shravan",
    entities:[User],
    logging: ['schema','error'],
    synchronize:true
};

export default config;
