const Ip = {
    hosDev:'',
    hosBackup:'http://192.168.241.11:8080/'
}
const Get = {
    fydm:"user/q/fydm",
    ksdm:"user/q/ksdm?fydm=",
    group:"user/q/group",
    users:"user/q/user?currentPage=1&pageSize=2&name=0&description=xxx&province=xx&city=xxx",
    status:"user/q/status?name=xxx",
    name:"user/q/name?name=",
    limit:"user/q/fy?name="
}
const Post = {
    create:'user?add',
    delete:'user?delete',
    update:'user?update',
    enable:"user/{name}?enable=",
    ks:"user/q/ks"
}
export {
    Ip,
    Get,
    Post
}