import SmallChart from '../src/smallchart'

window.onload = function () {
  let line1 = SmallChart.init(document.getElementById('line1'))
  line1.setOption({
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      fill: '#8956FF',
      stroke: '#8956FF'
    }]
  })
  let line2 = SmallChart.init(document.getElementById('line2'))
  line2.setOption({
    // width: 200,
    // height: 100,
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      fill: '#8956FF',
      stroke: '#8956FF',
      strokeWidth: 4,
      // strokeDasharray: 5,
      smooth: true
    }]
  })
  let bar1 = SmallChart.init(document.getElementById('bar1'))
  bar1.setOption({
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'bar',
      fill: '#8956FF'
    }]
  })

  let line3 = SmallChart.init(document.getElementById('line3'))
  line3.setOption({
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      fill: '#8956FF',
      stroke: '#8956FF',
      markLine: {
        type: 'average',
        stroke: '#d14',
        strokeOpacity: 1,
        strokeDasharray: '2, 2'
      }
    }]
  })
}

