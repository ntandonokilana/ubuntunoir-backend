import {createPool} from 'mysql2';
import { config } from 'dotenv';
config()
const pool = createPool({
    host:process.env.MYSQL_ADDON_HOST,
    database:process.env.MYSQL_ADDON_DB,
    user:process.env.MYSQL_ADDON_USER,
    port:process.env.MYSQL_ADDON_PORT,
    password:process.env.MYSQL_ADDON_PASSWORD,
}).promise()

export{pool}