import { Sequelize } from 'sequelize';

const db = new Sequelize('iot_smart_range_detect', 'root', "", {
    "host": "localhost",
    "dialect": "mysql"
});

export default db;