app.service('HelpService', function () {
    this.errorDetector = function (error) {
        if (error.status = 403) {
            swal(error.data.Message, { icon: "error" });
        }
        if (error.status = 401) {
            window.location.href = AUTO_LOGOUT;
        }
    };
    this.queryString = function (key) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var value = url.searchParams.get(key);
        return value;
    };
})