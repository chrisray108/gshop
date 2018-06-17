import {getCategories, addCategory, removeCategory} from 'api/category';

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
	    },

	    RemoveCategory({ commit }, categoryId) {
	      return new Promise((resolve, reject) => {
	          removeCategory(categoryId).then(response => {
	          resolve(response.data);
	        }).catch(error => {
	          reject(error);
	        });
	      });
	    },	   
    }
};


export default production;
