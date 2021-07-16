export default {
    menuLists:[
        {
            title:'帖子发布',
            path:'/home/essay',
            icon:'el-icon-circle-check',
            childmenu:[{
                title:'钓友圈',
                path:'/home/essay/talk',
                
            },{
                title:'技巧',
                path:'/home/essay/tip'
            }]
        },{
            title:'用户信息',
            path:'/home/usermanage',
            icon:'el-icon-menu'
        },{
            title:'数据统计',
            path:'/home/analysis',
            icon:'el-icon-share',
            childmenu:[{
                title:'技巧分类统计',
                path:'/home/analysis/tipclass',
                
            },{
                title:'用户昵称统计',
                path:'/home/analysis/username'
            },{
                title:'用户发布统计',
                path:'/home/analysis/usersend'
            }]
        }
    ]
}