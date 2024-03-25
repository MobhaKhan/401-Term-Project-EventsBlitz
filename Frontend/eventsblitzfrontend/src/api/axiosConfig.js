import axios from 'axios';

export default axios.create({
    baseURL: 'https://spatial-dryad-381108.uw.r.appspot.com/api'
});