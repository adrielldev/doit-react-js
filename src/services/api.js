import axios from 'axios'


const Api = axios.create({
    baseURL:'https://api-nodejs-todolist.herokuapp.com'
    }
);

export default Api