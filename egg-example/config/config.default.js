exports.keys = '12345678';

exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl':'nunjucks'
    }
}

exports.news = {
    pageSize:5,
    serverUrl:'https://hacker-news.firebaseio.com/v0'
}