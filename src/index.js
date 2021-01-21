import MiniChart from '../src/minichart'

window.onload = function () {
  let btn = document.getElementById('btn')
  let box = document.getElementById('box')
  let m = MiniChart.init(box)
  let op = {
    // width: 450,
    // height: 200,
    // max: 1500,
    // min:700,
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      fill: '#8956FF',
      // strokeWidth: 10,
      stroke: '#8956FF'
    }]
  }
  m.setOption(op)
  console.log(666)
  btn.onclick = function () {
    op.series[0].data.push(Math.floor(Math.random() * 800))
    m.setOption(op)
  }
}

