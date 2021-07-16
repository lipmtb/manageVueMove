import {tipAxios} from "./request";

//获取技巧所有类型
export function getAllTipClass(){
    return tipAxios({
        url:'/tip/tipClass'
    })
}

// 获取某页技巧
export function getAllTipEssay(page){
    return tipAxios({
        url:'/manage/allTip',
        params:{
            page:page
        }
    })
}


//获取tip详情
export function getTipDetail(tipId){
    return tipAxios({
        url:'/tip/tipEssayDetail',
        params:{
            tipId:tipId
        }
    })
}

//获取评论
export function getTipComment(tipId,skipnum){
    return tipAxios({
        url:'/tip/commentList',
        params:{
            tipId:tipId,
            skipNum:skipnum
        }
    })
}

//删除tip
export function deleteTipById(tid){
    return tipAxios({
        url:'/manage/deleteTip',
        method:'delete',
        params:{
            tipId:tid
        }
    })
}