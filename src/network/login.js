
import {loginAxios} from "./request";

export function adminLogin(username,userpassword){
    return loginAxios({
        url:"/login",
        data:{
            username:username,
            userpassword:userpassword
        },
        method:'post'
    })
}