//public/core.js
var scotchTodo = angular.module('scotchTodo', []);

/*--------------------------------------------------------------------
 * mainController - main controller
 * -------------------------------------------------------------------
 */
var mainController = function($scope, $http)
{
  $scope.formData = {};

  $http.get('/api/todos')
       .success(function(data) {
         $scope.todos = data;
         console.log(data);
       })
       .error(function(data) {
         console.log('Error: ' + data);
       });

  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
         .success(function(data) {
           $scope.formData = {}; // Clear form
           $scope.todos = data;
           console.log(data);
         })
         .error(function(data) {
           console.log('Error: ' + data);
         });
  };

  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
         .success(function(data) {
           $scope.todos = data;
           console.log(data);
         })
         .error(function(data) {
           console.log('Error: ' +data);
         });
  };
}
