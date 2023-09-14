app.controller("LoginController", ($scope, $http) => {
    $scope.onLogin = function () {
        if ($scope.form && Object.keys($scope.form).length > 0) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.form.email) && $scope.form.password && $scope.form.password.trim() != '') {
                $http({
                    url: BASE_URL,
                    method: "POST",
                    catch: false,
                    data: $scope.form,
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                }).then(
                    function (response) {
                        if (response.data.IsSuccess == true && response.data.Data != 0) {
                            window.location.href = "/dashboard"
                        } else {
                            swal("Oops", response.data.Message, "error");
                        }
                    },
                    function (error) {
                        swal("Oops", error.data.Message, "error")
                        console.log(error);
                        if (error.status == 401) {
                            window.location.href = AUTO_LOGOUT;
                        }
                        console.error("Something Went Wrong! try again");
                    }
                )
            }
            else {
                swal("Oops", "Invalid data to login, please try again", "error");
            }
        } else {
            swal("Oops", "Invalid data to login, please try again", "error");
        }
    }

})