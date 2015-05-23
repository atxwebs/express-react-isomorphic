module.exports = {
	root: require('path').normalize(__dirname + '/..'),
	app: {
		name: 'App'
	},
	port: 3000,
	db: {
    host: process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost',
    port: process.env.MONGO_PORT_27017_TCP_PORT || 27017,
    database: 'dbname'
  }
};