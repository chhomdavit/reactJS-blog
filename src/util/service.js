import dayjs from "dayjs"


export const Config = {
    imagePath : "http://localhost:1001/auth/"
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

export const logout = () => {
  localStorage.removeItem("login","1")
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("ourUsersList");
}

export const getAccessToken = () => {
    var access_token = localStorage.getItem("access_token")
    if(!isEmptyOrNull(access_token)){
        return access_token;
    }else{
        return null
    }
}

export const getRefreshToken = () => {
    var refresh_token = localStorage.getItem("refresh_token")
    if(!isEmptyOrNull(refresh_token)){
        return refresh_token
    }else{
        return null
    }
}