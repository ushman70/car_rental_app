const { Sequelize,DataTypes, UUIDV4, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
    
    });

    const a_t = sequelize.define("axios_tester", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
     {
        timestamps: false
     }
    )

    a_t.sync();

    module.exports = a_t;