import fetch from 'utils/fetch';

export function addProduct(product) {
  return fetch({
    url: '/production/addProduct',
    method: 'post',
    product
  });
}
