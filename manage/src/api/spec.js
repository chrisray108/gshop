import fetch from 'utils/fetch';

export function getSpecOptions() {
  return fetch({
    url: '/spec/specOptionList',
    method: 'get',
  });
}


export function addSpecOption(option) {
  const data = option;
  return fetch({
    url: '/spec/addSpecOption',
    method: 'post',
    data,
  });
}


export function removeSpecOption(optionId) {
  const data = {
    opid : optionId
  }
  return fetch({
    url: '/spec/removeSpecOption',
    method: 'post',
    data,
  });
}
