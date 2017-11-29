exports.keys = '12345678';

exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl':'nunjucks'
    }
}

exports.news = {
    pageSize:5,
    serverUrl:'http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=%E9%AB%98%E5%87%AF&bk_length=600'
}

exports.middleware = [
    'robot'
];