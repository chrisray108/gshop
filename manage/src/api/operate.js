import fetch from 'utils/fetch';

export function getUserList() {
  return fetch({
    url: '/user/queryList',
    method: 'get',
  });
}


export function removeUser(userId) {
  const data = {
    userId
  };
  return fetch({
    url: '/user/remove',
    method: 'post',
    data,
  });
}
