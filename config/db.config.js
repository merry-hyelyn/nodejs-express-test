export default {
	HOST: "localhost",
  	USER: "merryn",
  	PASSWORD: "1234",
  	DB: "node_test",
  	dialect: "postgres",
  	pool: {
		max: 5,
  		min: 0,
  		acquire: 30000,
  		idle: 10000
	}
};