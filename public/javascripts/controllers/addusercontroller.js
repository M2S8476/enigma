app.controller("AdduserController", ($scope, $http) => {
    $scope.onAdduser = function () {
        if ($scope.form.password == $scope.form.Cpassword) {
            $http({
                url: BASE_URL + "adduser",
                method: "POST",
                catch: false,
                data: $scope.form,
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            }).then(
                function (response) {
                    if (response.data.IsSuccess == true && response.data.Data != 0) {
                        swal("Success", response.data.Message, "success")
                        window.location.href = "/users"
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