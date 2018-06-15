import {getCategories, addCategory, removeCategory} from 'api/category';
import {getSpecOptions, addSpecOption, removeSpecOption} from 'api/spec';

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

	    FetchSpecOptions({ commit }) {
	      return new Promise((resolve, reject) => {
	          getSpecOptions().then(response => {
	          resolve(response.data);
	        }).catch(error => {
	          reject(error);
	        });
	      });
	    },

	    AddSpecOption({ commit }, option) {
	      return new Promise((resolve, reject) => {
	          addSpecOption(option).then(response => {
	          resolve(response.data);
	        }).catch(error => {
	          reject(error);
	        });
	      });
	    },

	    RemoveSpecOption({ commit }, optionId) {
	      return new Promise((resolve, reject) => {
	          removeSpecOption(optionId).then(response => {
	          resolve(response.data);
	        }).catch(error => {
	          reject(error);
	        });
	      });
	    }
    }
};


export default production;
