import { Sequelize } from 'sequelize';

const db = new Sequelize('iot_smart_range_detect', 'root', "", {
    "host": process.env.DB_HOST,
    "dialect": "mysql"
});

export default db;