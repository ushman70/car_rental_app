require('dotenv').config();
const { Sequelize,DataTypes, UUIDV4 } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

    const User = sequelize.define('User', {
      user_uuid: {
        type: DataTypes.UUID(UUIDV4),
        allowNull: false,
        primaryKey: true
        
        
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(55),
        allowNull: false
      },
      discounts_availible: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      car_taken: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      car_accidents: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      days_penalized: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(55),
        allowNull: false
      },
      reward_points: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(55),
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      refreshtoken: DataTypes.TEXT
    },{
      timestamps: false
    })

    const Car = sequelize.define('cars', {
      car_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
      },
      car_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      car_image: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      car_detail: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      availibility: {
        type: DataTypes.STRING(55),
        allowNull: false
      },
      car_price: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: false
      },
      date_taken:{
        type: DataTypes.STRING(55),
        allowNull: true
      },
      date_to_be_returned: {
        type: DataTypes.STRING(55),
        allowNull: true
      },
      time_taken:{
        type: DataTypes.STRING(55),
        allowNull: true
      },
      time_to_be_returned: {
        type: DataTypes.STRING(55),
        allowNull: true
      },
      date_past_return: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      user_uuid: {
        type: DataTypes.UUID(UUIDV4),
        allowNull: true
      },
      penalty_fee: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: true
      }

    }, { timestamps: false })
    Car.belongsTo(User)

    const Customer_bookings = sequelize.define('Customer_bookings', {
      booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
            },
       user_uuid: {
        type: DataTypes.UUID,
        allowNull: false
       },    
       car_name: {
         type: DataTypes.STRING(255),
         allowNull: false
       },
       date_taken:{
        type: DataTypes.STRING(55),
        allowNull: false
      },
      date_to_be_returned: {
        type: DataTypes.STRING(55),
        allowNull: false
      },
      time_taken:{
        type: DataTypes.STRING(55),
        allowNull: false
      },
      time_to_be_returned: {
        type: DataTypes.STRING(55),
        allowNull: false
      },
      date_purchased: {
        type: DataTypes.STRING(55),
        allowNull: false
      },
      order_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      }

    }, { timestamps: false })
    Customer_bookings.belongsTo(User)


   const Rewards = sequelize.define('Rewards', {
    reward_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    user_uuid: {
      type: DataTypes.UUID(UUIDV4),
      allowNull: false
    },
    discount_name: {
      type: DataTypes.STRING(55),
      allowNull: true
    }
   }, { timestamps: false })
   Rewards.belongsTo(User)

   const Employees = sequelize.define('Employees', {
      employee_uuid: {
        type: DataTypes.UUID(UUIDV4),
        allowNull: false,
        primaryKey: true
      },
      role: {
        type: DataTypes.STRING(55),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true
      }
   }, { timestamps: false })

     // Establish foreign keys 
     User.hasOne(Car,{
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

    User.hasOne(Customer_bookings,{
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

    User.hasOne(Rewards,{
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

    
    
     User.sync();
     Car.sync();
     Customer_bookings.sync();
     Rewards.sync();
     Employees.sync();


   

   


 
  
    



 

  module.exports = {
    User,
    Car,
    Customer_bookings,
    Rewards,
    Employees
  }
