import {getCategories, addCategory} from 'api/operate';

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
	    },

	    AddCategory({ commit }, category) {
	      return new Promise((resolve, reject) => {
	          addCategory(category).then(response => {
	          resolve(response.data);
	        }).catch(error => {
	          reject(error);
	        });
	      });
	    }
    }
};


export default production;
