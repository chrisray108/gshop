import { getCategories, addCategory, removeCategory } from 'api/category';
import { addProduct, fetchProducts, fetchKeeps, fetchProductDetail, changeProductStatus } from 'api/production';

const production = {
	state:{},
	mutations:{},
	actions: {
		AddProduct({ commit }, product)
		{
			return new Promise((resolve, reject) => {
	          addProduct(product).then(response => {
	          resolve(response.data);
	        }).catch(error => {
	          reject(error);
	        });
	      });
		},

		FetchProducts({ commit })
		{
			return new Promise((resolve, reject) => {
	          fetchProducts().then(response => {
	            resolve(response.data);
	          }).catch(error => {
	            reject(error);
	          });
	        });
		},

		FetchProductDetail({ commit }, detailId)
		{
	        return new Promise((resolve, reject) => {
	          fetchProductDetail(detailId).then(response => {
	            resolve(response.data);
	          }).catch(error => {
	            reject(error);
	          });
	        });
		},

		ChangeProductStatus({ commit }, data)
		{
			return new Promise((resolve, reject) => {
	          changeProductStatus(data.pid, data.status).then(response => {
	            resolve(response.data);
	          }).catch(error => {
	            reject(error);
	          });
	        });
		},

		FetchKeeps({ commit }, pid)
		{
			return new Promise((resolve, reject) => {
	          fetchKeeps(pid).then(response => {
	            resolve(response.data);
	          }).catch(error => {
	            reject(error);
	          });
	        });
		},

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
