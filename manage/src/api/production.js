import fetch from 'utils/fetch';

export function addProduct(product) {
  const data = product
  return fetch({
    url: '/production/addProduct',
    method: 'post',
    data
  });
}


export function fetchProducts(product) {
  return fetch({
    url: '/production/productList',
    method: 'post',
  });
}