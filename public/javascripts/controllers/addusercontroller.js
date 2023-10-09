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
    $scope.page = 1;
    $scope.limit = "10";
    $scope.search = "";
    $scope.users = [];
    $scope.pageNumberList = [];

    $scope.getUsers = () => {
        let request = {page: $scope.page, limit: $scope.limit, search: $scope.search};
        $http({
            url: BASE_URL + "users",
            method: "POST",
            data: request,
            catch: false,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },            
        }).then(
            function(responce){
                if(responce.data.IsSuccess = true){
                    $scope.users = responce.data.Data;
                    $scope.pageNumberList = HelperService.paginator($scope.users.totalPages, $scope.page, 9);
                }
            },
            function(error){
                console.log(error);
                if(error.status = 401){
                    window.location.href = AUTO_LOGOUT;
                }
            }
        )
    }
    $scope.getUsers();

    $scope.onSearch = () => {
        if($scope.search.length > 2 || $scope.search.length == 0){
            $scope.page = 1;
            $scope.getUsers();
        }
    }

    $scope.$watch("page", () => {$scope.getUsers() });
    $scope.onLimitChange = () => {$scope.page = 1; $scope.getUsers(); };
    $scope.switchPage = (page) => {
        $scope.page = page;
    }
})