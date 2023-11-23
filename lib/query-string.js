function QueryString(url) {
    var array = url.split('?'), query = {}, search = array[1];

    if (search) {
        var array = decodeURIComponent(search).split(/[=&]/);
        for (var i = 0, n = array.length; i < n; i++) {
            query[array[i]] = array[++i]
        }
    }

    return query;
}

QueryString.string = function (query) {
    let arr = [];

    if (query) {
        for (let key in query) {
            arr.push([key, query[key]].join("="));
        }
    }
    return ("?" + arr.join("&"));
};

module.exports = QueryString;