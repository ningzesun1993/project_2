// @TODO: YOUR CODE HERE!
Highcharts.chart('scatter', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Different single models rmse and leaderboard scores'
  },
  xAxis: {
    categories: [
        'Elasticnet',
        'Ridge',
        'Lasso',
        'Support Vector Regression',
        'RandomForest',
        'lightgbm',
        'GradientBoosting',
        'xgboost'
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
        text: 'The scores'
    }  
  },
  plotOptions: {
    column: {
        pointPadding: 0.2,
        borderWidth: 0
    }
  },
  series: [
    {
      name: 'RMSE',
      data: [0.11864, 0.12086, 0.11846, 0.12086, 0.13666, 0.12088, 0.12043, 0.11833]

    }, 
    {
      name: 'Leaderboard score',
      data: [0.11941, 0.11926, 0.11941, 0.12029, 0.14152, 0.12105, 0.12205, 0.12572]

    }]

});


