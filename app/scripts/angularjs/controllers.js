function EditorCtrl($scope, $routeParams, $http){
	console.log('entering EditorCtrl');

	// $scope.message = "hello world";
  let id = $routeParams.id;
  console.log(id);


  // retrieve from database
  $http.get('/api/note/' + id).then(function(resp) {
    console.log(resp);
    let data = resp.data;
    if (data.status == 'OK') {
      let content = data.note.content;
      $scope.title = data.note.title;
      $scope.message = content;
    }

  }, function(resp) {


  });
	

/*
  	$scope.contentChanged = function (editor, html, text, delta, oldDelta, source) {
    	console.log('editor: ', editor, 'html: ', html, 'text:', text, 'delta: ', delta, 'oldDelta:', oldDelta, 'source:', source);
  	}
*/

	$scope.save = function() {
    let title = $scope.title;
		let content = $scope.message;
    let snapshot = $(content).text().substr(0,100);
		console.log(content);
    console.log(snapshot);
    // save to database 
    if (id) {
      // update 
      $http.put('/api/note/' + id, {title: title, content: content, snapshot: snapshot}).then(
        function(resp) {
          console.log(resp);
        }, 
        function(resp) {


      });





    } else {
      $http.post('/api/note', {title: title, content : content, snapshot: snapshot}).then(
        function(resp) {
          console.log(resp);

        }, 
        function(resp) {


      });
    }
  };
}



function NotelistCtrl($scope, $http) {
  refresh();
  $scope.delete = function(id) {
    $http.delete('/api/note/' + id ).then(
      function(resp) {
        refresh();
      },
      function(resp) {

      }
    );

  };


  function refresh() {
    $http.get('/api/note').then(function(resp) {
      console.log(resp);
      let data = resp.data;
      if (data.status == 'OK') {
        let records = [];
        for ( let i = 0; i < data.notelist.length; i++ ) {
          records.push(
          {
            id: data.notelist[i]._id,
            title: data.notelist[i].title,
            snapshot: data.notelist[i].snapshot
          });

        }
        $scope.records = records;
      }

    }, function(resp) {


    });

  }

}


function ChartListCtrl($scope, $http) {
  // call API to list all charts 




}

function ChartCtrl($scope) {

  // refresh 
  // getting data from database 
  // call API to get the info 



  // callback
  let task = {
    _id: 'test1',
    name: 'my test',
    total: 100,
    records: [
      {date: newDate(0), effort: 10},
      {date: newDate(1), effort: 30},
      {date: newDate(2), effort: 20},
      {date: newDate(3), effort: 10},
      {date: newDate(4), effort: 10}
    ]
  };

  let labels = [];
  let datas = [];
  let current_total_effort = 0;
  {
    $scope.task = task.name;
    $scope.maxValue = task.total;
    $scope.total = task.total;

    for ( let i = 0; i < task.records.length; ++i) {
      let date = task.records[i].date;
      labels.push(date);
      let effort = task.records[i].effort;
      datas.push(effort);
      current_total_effort += effort;
    }

  }

  $scope.progressValue = current_total_effort;
  function newDate(days) {
      return moment().add(days, 'd').toDate();
    }

  $scope.labels = labels;
  $scope.data =  [datas];
  
  $scope.options = {
    title:{
        display:true,
        text: "progress line chart"
    },
    scales: {
        xAxes: [{
          display: true,
            type: "time",
            position: 'bottom',
            time: {
              round: 'day',
              unit: 'day'
            }
          }, 
        ],
        yAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero: true
          }
        }]        
    }
  };

  // adding new data
  $scope.save = function() {
    console.log('saving task to database');

    let task = $scope.task;
    let total = $scope.total;
    let date = $scope.date;
    let effort = $scope.effort;
    // call API to save the info 

  };


  
}

