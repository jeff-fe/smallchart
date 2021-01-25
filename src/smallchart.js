import {dataToPoints, createNs, dealLineData, dealBarData} from './utils/util'

class SmallChart {
  constructor(dom) {
    this.dom = dom
    this.width = ''
    this.height = ''
    this.svg = ''
    this.max = ''
    this.min = ''
    this.margin = ''
  }

  static init(dom) {
    return new SmallChart(dom)
  }

  dealSeries(series) {
    return series.map((item) => {
      const {
        data,
        limit = data.length
      } = item
      const pointArr = dataToPoints({
        data,
        limit,
        width: this.width,
        height: this.height,
        max: this.max,
        min: this.min,
        margin: this.margin
      })
      return {...item, limit, pointArr}
    })
  }

  createPath(series) {
    const g = createNs('g')
    let data = this.dealSeries(series)
    data.forEach((i) => {
      switch (i.type) {
        case 'line':
          dealLineData(i, this, g)
          break
        case 'bar':
          dealBarData(i, this, g)
          break
        case 'pie':
          // appendPolyline(g, i)
          break
      }
    })
    return g
  }

  setOption(option = {}) {
    let {width = 100, height = 30, series, max, min, margin = 2} = option
    this.width = width
    this.height = height
    this.max = max
    this.min = min
    this.margin = margin
    if (!series) {
      throw new Error('Please option must have series!')
    }
    if (!this.svg) {
      this.svg = createNs('svg')
      this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
      this.svg.setAttribute('style', `width:${width}px; height:${height}px`)
      this.svg.appendChild(this.createPath(series))
      this.dom.appendChild(this.svg)
    } else {
      this.svg.innerHTML = ''
      this.svg.appendChild(this.createPath(series))
    }
  }
}

export default SmallChart
