import axios from "axios";

//function to get list of users from api
async function getUsers(startPage){
  const searchLink = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';
    let response = await axios({
      method: 'get',
      url: searchLink,
      params: {
        count: 6,
        page: startPage
      }
    })
    return response;
  }

//function to get list of positions from api
  export async function getPositions(){
    const searchLink = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions';
      let response = await axios({
        method: 'get',
        url: searchLink,
      })
      return response;
  }

//function to get token from api which you must have to add new user
  export async function getToken(){
    const searchLink = 'https://frontend-test-assignment-api.abz.agency/api/v1/token';
      let response = await axios({
        method: 'get',
        url: searchLink,
      })
      return response;
  }

//function to add new user to api database must have token
  export async function postUser(userData, token){
    const searchLink = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';
      let response = await axios({
        method: 'post',
        url: searchLink,
        headers:{'token': token},
        data: userData
      })
      return response;
  }
export default getUsers;