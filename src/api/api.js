import axios from "axios";
import {
    TOKEN,
    NFT_API_ENDPOINT,
} from "./_keys";
class Api {

    getCollectionList(data) {
        return axios.get(`${NFT_API_ENDPOINT}/nft/nfts?batched=true&token=${TOKEN}&page=${data.page}&count=${data.pageSize}&onsale=${data.onsale}&hidden=${data.hidden}`).then(res => res.data);
    }
}

export default new Api()