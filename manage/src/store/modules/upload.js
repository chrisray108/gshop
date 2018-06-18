import { fetchToken } from 'api/operate';
var qiniu = require('qiniu-js')
const uuidv1 = require('uuid/v1');

const upload = {
  actions: {
    Upload({ commit }, file) {
      return new Promise((resolve, reject) => {
          fetchToken().then(response => {
          const data = {
            token  : response.data.token,
            domain : response.data.domain
          }
          uploadFile(data, file, resolve, reject);
        }).catch(error => {
          reject(error);
        });
      });
    },    
  }
};


function uploadFile(data, file, resolve, reject)
{
   var key = uuidv1()
   var observable = qiniu.upload(file, key, data.token, null, null)
   var observer = {
      next(res){
         
      },
      error(err){
        reject(err)
      }, 

      complete(res)
      {
        var imgLink = "http://" + data.domain + '/' + key;
        resolve(imgLink)
      }
   }
   var subscription = observable.subscribe(observer)
}

export default upload;