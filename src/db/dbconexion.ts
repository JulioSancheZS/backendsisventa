import {Sequelize} from 'sequelize'


// Option 3: Passing parameters separately (other dialects)
//LocalHost
const sequelize = new Sequelize('sisventa', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
  });

  //Produccion
/*
  const sequelize = new Sequelize('sisventa', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
  }); */

  export default sequelize