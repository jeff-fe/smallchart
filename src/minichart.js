import {dataToPoints, createNs, appendPolyline, pointsToPath, appendPath} from './utils/util'

class MiniChart {
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
    return new MiniChart(dom)
  }

  dealSeries(series) {
    return series.map((item) => {
      const {
        data,
        limit = data.length,
        smooth  // 是否为平滑曲线
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
      // 展示的路径
      let pointsPath = pointsToPath(pointArr, smooth)
      // 闭合路径作为展示阴影
      const closePointsPath = pointsPath.concat([
        smooth ? `L ${pointArr[pointArr.length - 1].x}` : pointArr[pointArr.length - 1].x,
        this.height - this.margin,
        this.margin,
        this.height - this.margin,
      ])
      return {...item, pointsPath, closePointsPath}
    })
  }

  createPath(series) {
    const g = createNs('g')
    let data = this.dealSeries(series)
    data.forEach((i) => {
      switch (i.type) {
        case 'line':
          i.smooth ? appendPath(g, i) : appendPolyline(g, i)
          break
        case 'bar':
          // appendPolyline(g, i)
          break
        case 'pie':
          // appendPolyline(g, i)
          break
      }
    })
    return g
  }

  setOption(option = {}) {
    let {width = 100, height = 30, series, max, min, margin = 5} = option
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

export default MiniChart
