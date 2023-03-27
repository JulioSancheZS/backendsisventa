import {Sequelize} from 'sequelize'


// Option 3: Passing parameters separately (other dialects)
//LocalHost
const sequelize = new Sequelize(
  process.env.DB_NAME || 'sisventa',
  process.env.DB_USER || 'root', 
  process.env.DB_PASSWORD || '1234', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  });

  //Produccion
/*
  const sequelize = new Sequelize('sisventa', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
  }); */

  export default sequelize