import apiService from "../api/api"

export const GET_COLLECTIONS = 'GET_COLLECTIONS';

export const getCollectionList = (data, cb) => dispatch => {
    
    apiService.getCollectionList(data)
    .then(collection_list => {
      if (cb) {
        cb(collection_list.nfts);
      }
    })
    .catch(error => {
      console.log('error', error)
    })
}
