import connect from './database.js'; 

class Loaders {
	start(){
		connect();
	}
}

export default new Loaders();