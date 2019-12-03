// @TODO: YOUR CODE HERE!
Highcharts.chart('scatter', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'The percentage of missing value'
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Missing value percentage'
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    pointFormat: 'Missing value: <b>{point.y:.2f}</b>'
  },
  series: [{
    name: 'Population',
    data: [
    ['PoolQC', 0.9952054794520548],
    ['MiscFeature', 0.963013698630137],
    ['Alley', 0.9376712328767123],
    ['Fence', 0.8075342465753425],
    ['FireplaceQu', 0.4726027397260274],
    ['LotFrontage', 0.1773972602739726],
    ['GarageCond', 0.05547945205479452],
    ['GarageType', 0.05547945205479452],
    ['GarageYrBlt', 0.05547945205479452],
    ['GarageFinish', 0.05547945205479452],
    ['GarageQual', 0.05547945205479452],
    ['BsmtExposure', 0.026027397260273973],
    ['BsmtFinType2', 0.026027397260273973],
    ['BsmtFinType1', 0.025342465753424658],
    ['BsmtCond', 0.025342465753424658],
    ['BsmtQual', 0.025342465753424658],
    ['MasVnrArea', 0.005479452054794521],
    ['MasVnrType', 0.005479452054794521],
    ['Electrical', 0.0006849315068493151],
    ['Utilities', 0.0],
    ['YearRemodAdd', 0.0]
    ],
    dataLabels: {
      enabled: true,
      rotation: -90,
      color: '#FFFFFF',
      align: 'right',
      format: '{point.y:.2f}', // one decimal
      y: 10, // 10 pixels down from the top
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
  }]
});


