import fetch from 'utils/fetch';

export function addProduct(product) {
  const data = product
  return fetch({
    url: '/production/addProduct',
    method: 'post',
    data
  });
}


export function fetchProducts() {
  return fetch({
    url: '/production/productList',
    method: 'post',
  });
}

export function fetchKeeps(pid) {
  const data = {
     pid : pid
  }
  return fetch({
    url: '/production/keepList',
    method: 'post',
    data
  });
}

export function fetchProductDetail(detailId) {
  const data = {
     detailId : detailId
  }
  return fetch({
    url: '/production/fetchDetail',
    method: 'post',
    data
  });
}


export function changeProductStatus(pid, status) {
  const data = {
     pid : pid,
     status : status
  }
  return fetch({
    url: '/production/changeProductStatus',
    method: 'post',
    data
  });
}