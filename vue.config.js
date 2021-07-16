module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'util': '@/util'
            }
        }
    },
    devServer:{
        port:8080,
        host:'127.0.0.1'
    }
}