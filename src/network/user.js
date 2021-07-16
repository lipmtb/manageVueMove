import {userAxios} from "./request";

//获取所有用户信息（发帖数）
export function getAllUserInfoByPage(page,limit=5){
    return userAxios({
        url:'/manage/allUserLists',
        params:{
            page:page,
            limit:limit
        }
    })
}

//获取用户总数
export function getTotalUser(){
    return userAxios({
        url:'/manage/userTotal'
    })
}

//获取近6个月所有用户发布的钓友圈和技巧帖子数
export function getAllSendForMonth(){
    return userAxios({
        url:'/manage/allSendForMonth'
    })
}