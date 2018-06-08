import fetch from 'utils/fetch';

export function getUserList() {
  return fetch({
    url: '/user/queryList',
    method: 'get',
  });
}
