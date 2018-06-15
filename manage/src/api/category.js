import fetch from 'utils/fetch';

export function getCategories() {
  return fetch({
    url: '/production/categoryList',
    method: 'get',
  });
}


export function addCategory(category) {
  const data = category;
  return fetch({
    url: '/production/addCategory',
    method: 'post',
    data,
  });
}


export function removeCategory(categoryId) {
  const data = {
    cid : categoryId
  }
  return fetch({
    url: '/production/removeCategory',
    method: 'post',
    data,
  });
}
