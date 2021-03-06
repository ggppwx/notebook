var app = angular.module('myapp', ['ngRoute', 'ngQuill', 'chart.js', 'ui.bootstrap']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {templateUrl: '/views/welcome.html'})
    	.when('/notelist', {templateUrl: '/views/notelist.html', controller: NotelistCtrl})
    	.when('/note', {templateUrl: '/views/editor.html', controller: EditorCtrl})
    	.when('/note/:id', {templateUrl: '/views/editor.html', controller: EditorCtrl})
    	.when('/editor', {templateUrl: '/views/editor.html', controller: EditorCtrl})

    	.when('/chart', {templateUrl: '/views/chartlist.html', controller: ChartListCtrl})
        .when('/chart/:id', {templateUrl: '/views/chart.html', controller: ChartCtrl})
        .otherwise({redirectTo:'/'});
}]);



 app.config(['ngQuillConfigProvider', function (ngQuillConfigProvider) {
 	var toolbarOptions = [
	  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	  ['blockquote', 'code-block'],

	  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
	  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
	  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
	  [{ 'direction': 'rtl' }],                         // text direction

	  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
	  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

	  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
	  [{ 'font': [] }],
	  [{ 'align': [] }],
	  ['clean']                                         // remove formatting button
	];
 	ngQuillConfigProvider.set({
 		modules: {
 			toolbar: toolbarOptions
 		},
    	theme: 'snow'
	});
 }]);





