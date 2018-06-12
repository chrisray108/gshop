import {getCategories} from 'api/operate';

const production = {
	state:{},
	mutations:{},
	actions: {
	    FetchCategories({ commit }) {
	      return new Promise((resolve, reject) => {
	          getCategories().then(response => {
	          resolve(response.data);
	        }).catch(error => {
	          reject(error);
	        });
	      });
	    }
    }
};


export default production;
