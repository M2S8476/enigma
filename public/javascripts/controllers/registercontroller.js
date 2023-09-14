app.controller("RegisterController", ($scope, $http) => {
    $scope.onRegister = function () {
        if ($scope.form.password == $scope.form.Cpassword) {
            $http({
                url: BASE_URL + "register",
                method: "POST",
                catch: false,
                data: $scope.form,
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }).then(
                function (response) {
                    if (response.data.IsSuccess == true && response.data.Data != 0) {
                        window.location.href = "/"
                    } else {
                        swal("Oops", response.data.Message, "error")
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
        } else {
            swal("Oops", "Both Password ans confirm password must be identical", "error")
        }
    }
})