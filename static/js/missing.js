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
      text: 'filling in the missing value'
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    formatter: function(){
      if (this.x === 0){
        return 'PoolQC : NA means "No Pool".';
      }
      else if (this.x === 1){
        return 'MiscFeature : NA means "no misc feature".';
      }
      else if (this.x === 2){
        return 'Alley : NA means "no alley access".';
      }
      else if (this.x === 3){
        return 'Fence : NA means "no fence".';
      }
      else if (this.x === 4){
        return 'FireplaceQu : NA means "no fireplace".';
      }
      else if (this.x === 5){
        return 'LotFrontage : Since the front area most likely have a similar area in its neighborhood , fill in missing values by the median LotFrontage of the neighborhood.';
      }
      else if (this.x === 6){
        return 'GarageCond : Replacing missing data with None.';
      }
      else if (this.x === 7){
        return 'GarageType : Replacing missing data with None.';
      }
      else if (this.x === 8){
        return 'GarageYrBlt : Replacing missing data with 0.';
      }
      else if (this.x === 9){
        return 'GarageFinish : Replacing missing data with None.';
      }
      else if (this.x === 10){
        return 'GarageQual : Replacing missing data with None.';
      }
      else if (this.x === 11){
        return 'BsmtExposure : missing values are likely zero for having no basement.';
      }
      else if (this.x === 12){
        return 'BsmtFinType2 : missing values are likely zero for having no basement.';
      }
      else if (this.x === 13){
        return 'BsmtFinType1 : missing values are likely zero for having no basement.';
      }
      else if (this.x === 14){
        return 'BsmtCond : NA means that there is no basement.';
      }
      else if (this.x === 15){
        return 'BsmtQual : NA means that there is no basement.';
      }
      else if (this.x === 16){
        return 'MasVnrArea : NA most likely means no masonry veneer for these houses.';
      }
      else if (this.x === 17){
        return 'MasVnrType : NA most likely means no masonry veneer for these houses.';
      }
      else if (this.x === 18){
        return 'Electrical : It has one NA value. Fill with most common one.';
      }
      else if (this.x === 19){
        return 'Utilities : No missing values.';
      }
      else{
        return 'YearRemodAdd: No missing values';
      }
    }
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


