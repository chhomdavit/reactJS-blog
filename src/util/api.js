import axios from 'axios' 
import dayjs from "dayjs"
import { message } from "antd"

const BASE_URL = "https://springblog.onrender.com";
export const config = {
  base_server: `${BASE_URL}/`,
  image_path: `${BASE_URL}/auth/`,
  version: 1,
};

export const request = (method="",url="",data={}) => { 
	return axios ({
        method : method,
        url: config.base_server + url,
        data : data,
    }).then(res=>{
        return res
    }).catch((err) => {
            const status = err.response?.status;
            if (status === 404) {
              message.error('Route Not Found!');
            } else if (status === 403) {
                window.location.href="/"
            } else if (status === 500) {
              message.error('Internal server error!');
            } else if (status === 401) {
              message.error('Error on 401');
            } else {
              message.error(err.message);
            }
            return false;
          });
}

export const isEmptyOrNull = (value) => {
  if(value === "" || value === null || value === 'null' || value === undefined){
      return true;
  }
  return false;
}

export const formatDateForClient = (date) => {
  if(!isEmptyOrNull(date)){
      return dayjs(date).format("ថ្ងៃទី​ DD ខែ MM ឆ្នាំ YYYY ម៉ោង​ HH : MM")
  }
  return null
}

//================================================================================
// import axios from 'axios' 
// import { logout } from '../util/service';
// import { message } from "antd"

// export const Config = {
//   base_server: 'http://localhost:1001/',
//   image_path: '',
//   version: 1,
// };

// export const request = (method="",url="",data={}) => { 
//   var accessToken = localStorage.getItem('accessToken');
// 	return axios ({
//         method : method,
//         url: Config.base_server + url,
//         data : data,
//         headers: {
//           Authorization: accessToken ? `Bearer ${accessToken}` : '',
//         }
//     }).then(res=>{
//         return res
//     }).catch((err) => {
//             const status = err.response?.status;
//             if (status === 404) {
//               message.error('Route Not Found!');
//             } else if (status === 403) {
//                 logout();
//                 window.location.href="/"
//             } else if (status === 500) {
//               message.error('Internal server error!');
//             } else if (status === 401) {
//               message.error('Error on 401');
//             } else {
//               message.error(err.message);
//             }
//             return false;
//           });
// }



//================================================================================
// import axios from 'axios';
// import { logout } from '../util/service';
// import { message } from 'antd';

// export const Config = {
//   base_server: 'http://localhost:1001/',
//   image_path: '',
//   version: 1,
// };

// export const request = (method, url, data, newToken = null) => {
//   var accessToken = localStorage.getItem('accessToken');

//   if (newToken !== null) {
//     accessToken = newToken;
//   }

//   return axios({
//     method: method,
//     url: Config.base_server + url,
//     data: data,
//     headers: {
//       Authorization: accessToken ? `Bearer ${accessToken}` : '',
//     },
//   })
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       const status = err.response?.status;
//       if (status === 404) {
//         message.error('Route Not Found!');
//       } else if (status === 403 || status === 401) {
//         return refreshToken(url, method, data);
//       } else if (status === 500) {
//         message.error('Internal server error!');
//       } else if (status === 401) {
//         message.error('Error on 401');
//       } else {
//         message.error(err.message);
//       }
//       return false;
//     });
// };

// export const refreshToken = (url, method, data) => {
//   var refreshToken = localStorage.getItem('refreshToken');
//   return axios({
//     url: Config.base_server + 'auth/refresh',
//     method: 'post',
//     data: {
//       refreshToken: refreshToken,
//     },
//   }).then((res) => {
//       message.success('Refresh successful');
//       localStorage.setItem("refreshToken", res.data.refreshToken);
//       localStorage.setItem('accessToken', res.data.accessToken);
//       var newToken = res.data.accessToken;
//       return request(method, url, data, newToken);
//   }).catch((error) => {
//       logout();
//       window.location.href="/"
//       return false;
//     });
// };

