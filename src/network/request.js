import serverUrl from "./server";
import axios from "axios";

// 登录
export function loginAxios(config) {
    let loginInstance = axios.create({
        baseURL: serverUrl,
        withCredentials: true,
        timeout: 5000
    });
    loginInstance.interceptors.request.use(function(config){
        if(config.url=='/login/isLogin'){
            config.headers={
                "Cache-Control":"no-cache"
            }
        }
        return config;
    })

    loginInstance.interceptors.response.use(function(res){
        return res.data;
    })

    return loginInstance(config);

}


//获取钓友圈

export function talkAxios(config) {
    let talkInstance = axios.create({
        baseURL: serverUrl,
        withCredentials: true,
        timeout: 5000
    });
 

    talkInstance.interceptors.response.use(function(res){
        return res.data;
    })

    return talkInstance(config);

}

//技巧axios
export function tipAxios(config) {
    let tipInstance = axios.create({
        baseURL: serverUrl,
        withCredentials: true,
        timeout: 5000
    });
 

    tipInstance.interceptors.response.use(function(res){
        return res.data;
    })

    return tipInstance(config);

}


//用户信息
export function userAxios(config) {
    let userInfoInstance = axios.create({
        baseURL: serverUrl,
        withCredentials: true,
        timeout: 5000
    });
 

    userInfoInstance.interceptors.response.use(function(res){
        return res.data;
    })

    return userInfoInstance(config);

}