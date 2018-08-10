function changeWord(str) {
    str = str.toLowerCase();
    return str.replace(/_(\w)/g, function($, $1) {
        return $1.toUpperCase();
    });
}

function changeUpper(str) {
    return str.replace(/([A-Z])/g, "_$1").toUpperCase();
}

function isObj(param) {
    return Object.prototype.toString.call(param).slice(8, -1) === 'Object';
}

function isDate(param) {
    return Object.prototype.toString.call(param).slice(8, -1) === 'Date';
}

function formatTime(time, fmt) { //author: meizz
    let o = {
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(), //日
        "h+": time.getHours(), //小时
        "m+": time.getMinutes(), //分
        "s+": time.getSeconds(), //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function transKey(obj) {
    var objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                var newKey = changeWord(key)
                    //判断ojb子元素是否为对象，如果是，递归复制
                if (isObj(obj[key]) || Array.isArray(obj[key])) {
                    objClone[newKey] = transKey(obj[key]);
                } else if (isDate(obj[key])) { // 时间类型
                    objClone[newKey] = formatTime(obj[key], 'yyyy-MM-dd');
                } else {
                    //如果不是，简单复制
                    objClone[newKey] = obj[key];
                }
            }
        }
    }
    return objClone;
}

function transSql() {

}

function andSql() {

}

module.exports = {
    transKey: transKey,
    changeUpper: changeUpper
}