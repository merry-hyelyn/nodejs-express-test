import dbConfig from '../../config/db.config.js';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
  	dialect: dbConfig.dialect,
  	operatorsAliases: false,
  
  	pool: {
    	max: dbConfig.pool.max,	
   		min: dbConfig.pool.min,
      	acquire: dbConfig.pool.acquire,
      	idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import tutorialModel from './tutorial.model.js';
db.Tutorial = tutorialModel(sequelize, Sequelize)

export default db;