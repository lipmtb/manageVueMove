import {talkAxios} from "./request";

export function getAllTalk(page){
    return talkAxios({
        url:'/manage/allTalk',
        params:{
            page:page
        }
    })
}  

//获取talk详情
export function getTalkDetail(talkId){
    return talkAxios({
        url:'/talk/talkDetail',
        params:{
            talkId:talkId
        }
    })
}

//获取talk的评论和评论talk帖子
export function getTalkComment(talkId,skipnum){
    return talkAxios({
        url:'/talk/commentList',
        params:{
            talkId:talkId,
            skipNum:skipnum
        }
    })
}

//删除talk
export function deleteTalkById(tid){
    return talkAxios({
        url:'/manage/deleteTalk',
        method:'delete',
        params:{
            talkId:tid
        }
    })
}