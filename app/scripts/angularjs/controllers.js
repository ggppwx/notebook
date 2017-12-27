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


function ChartListCtrl($scope, $http, $location) {
    // call API to list all charts
    // refresh the charts 
    $http.get('/api/chart')
        .then( 
            function(resp) {
                let data = resp.data;
                let records = [];
                for (let i = 0; i < data.notelist.length; i++) {
                    records.push({
                        id: data.notelist[i]._id,
                        title: data.notelist[i].title
                    });
                }
                $scope.records = records;
            }
        );



    $scope.add = function() {        
        $http.post('/api/chart/', {title: 'insert title',
                                   content: 'insert content'})
            .then(
                function(resp) {
                    let id = resp.data.note._id;
                    $location.url('/chart/' + id); 
                }, 
                function(resp) {
                    console.log('ERROR');
                }
            );

    };


}

function ChartCtrl($scope, $routeParams, $http) {

    // call API to get the info
    let id = $routeParams.id;
    console.log(id);

    $http.get('/api/chart/' + id).then(
        function(resp) {
            let title = resp.data.note.title;
            let content = resp.data.note.content;

            $scope.title = title;
            $scope.content = content;
            $scope.total = 100;
            $scope.maxValue = 100;



            // reading data from database



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

            
        },
        function(resp) {

        }
    );


  // callback


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

