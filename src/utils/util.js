export function arrayMin(data) {
  return Math.min.apply(Math, data)
}

export function arrayMax(data) {
  return Math.max.apply(Math, data)
}

export function median(data) {
  return data.sort((a, b) => a - b)[Math.floor(data.length / 2)]
}

export function average(data) {
  return data.reduce((a, b) => a + b) / data.length
}

export function createNs(type) {
  return document.createElementNS("http://www.w3.org/2000/svg", type)
}

export function appendPolyline(parent, i) {
  let path = createNs('polyline')
  path.setAttribute('points', i.pointsPath)
  path.setAttribute('stroke', i.stroke || 'slategray')
  path.setAttribute('stroke-width', i.strokeWidth || 2)
  path.setAttribute('stroke-dasharray', i.strokeDasharray || 'none')
  path.setAttribute('fill', 'none')
  parent.appendChild(path)
  if (i.fill) {
    let fillPath = createNs('polyline')
    fillPath.setAttribute('points', i.closePointsPath)
    fillPath.setAttribute('fill', i.fill)
    fillPath.setAttribute('fill-opacity', i.fillOpacity || '.2')
    parent.insertBefore(fillPath, path)
  }
}

export function appendPath(parent, i) {
  let path = createNs('path')
  path.setAttribute('d', `M${i.pointsPath.join(' ')}`)
  path.setAttribute('stroke', i.stroke || 'slategray')
  path.setAttribute('stroke-width', i.strokeWidth || 2)
  path.setAttribute('stroke-dasharray', i.strokeDasharray || 'none')
  path.setAttribute('fill', 'none')
  parent.appendChild(path)
  if (i.fill) {
    let fillPath = createNs('path')
    fillPath.setAttribute('d', `M${i.closePointsPath.join(' ')}`)
    fillPath.setAttribute('fill', i.fill)
    fillPath.setAttribute('fill-opacity', i.fillOpacity || '.2')
    parent.insertBefore(fillPath, path)
  }
}

export function appendRect(parent, i, {x, y, width, height, num}) {
  let rect = createNs('rect')
  rect.setAttribute('x', x)
  rect.setAttribute('y', y)
  rect.setAttribute('width', width)
  rect.setAttribute('height', height)
  rect.setAttribute('num', num)
  rect.setAttribute('fill', i.fill || '#409EFF')
  parent.appendChild(rect)
}

export function dataToPoints(
  {
    data,
    limit,
    width = 1,
    height = 1,
    max = arrayMax(data),
    min = arrayMin(data),
    margin
  }
) {
  const len = data.length

  if (limit && limit < len) {
    data = data.slice(len - limit)
  }

  const h = (height - margin * 2) / ((max - min) || 2)
  const w = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0))

  return data.map((d, i) => ({
    x: i * w + margin,
    y: (max === min ? 1 : (max - d)) * h + margin
  }))
}

export function pointsToPath(pointArr, smooth) {
  let pointsPath
  if (smooth) {
    let prev

    function curve(p) {
      let res
      if (!prev) {
        res = [p.x, p.y]
      } else {
        const len = (p.x - prev.x) * 0.5
        res = [
          'C',
          prev.x + len,
          prev.y,
          p.x - len,
          p.y,
          p.x,
          p.y
        ]
      }
      prev = p
      return res
    }

    pointsPath = pointArr.map(p => curve(p)).reduce((a, b) => a.concat(b))
  } else {
    pointsPath = pointArr.map(p => [p.x, p.y]).reduce((a, b) => a.concat(b))
  }
  return pointsPath
}

export function dealLineData(item, _this, g) {
  let {pointArr, smooth} = item
  // 展示的路径
  let pointsPath = pointsToPath(pointArr, smooth)
  // 闭合路径作为展示阴影
  const closePointsPath = pointsPath.concat([
    smooth ? `L ${pointArr[pointArr.length - 1].x}` : pointArr[pointArr.length - 1].x,
    _this.height - _this.margin,
    _this.margin,
    _this.height - _this.margin,
  ])
  let d = {...item, pointsPath, closePointsPath}
  smooth ? appendPath(g, d) : appendPolyline(g, d)
}

export function dealBarData(item, _this, g) {
  let {pointArr, data, limit} = item
  const marginWidth = _this.margin ? 2 * _this.margin : 0
  const noLimit = data.length === limit
  const barWidth = noLimit
    ? ((_this.width - limit * marginWidth) / limit)
    : (pointArr && pointArr.length >= 2 ? Math.max(0, pointArr[1].x - pointArr[0].x - marginWidth) : 0)

  if (barWidth < 1) {
    throw new Error('Too much data, please enlarge the width or reduce the margin')
  }

  pointArr.forEach((p, i) => {
    const x = noLimit ? Math.ceil((barWidth + marginWidth) * i + _this.margin) : Math.ceil(p.x * i)
    const y = Math.ceil(p.y)
    const width = Math.ceil(barWidth)
    const height = Math.ceil(Math.max(0, _this.height - p.y))
    const num = data[i]
    appendRect(g, item, {x, y, width, height, num})
  })
}

export function dealMarkLine(item, g) {
  const {markLine, pointArr} = item
  /**
   * type 可输入的值
   *  min 最小值
   *  max 最大值
   *  average 平均值
   *  median 中位数
   */

  let {type = 'average', stroke = '#d14', strokeOpacity = 1, strokeDasharray = '2,2'} = markLine
  const yPoints = pointArr.map(p => p.y)
  let y = ''

  switch (type) {
    case 'min':
      y = arrayMax(yPoints)
      break
    case 'max':
      y = arrayMin(yPoints)
      break
    case 'average':
      y = average(yPoints)
      break
    case 'median':
      y = median(yPoints)
      break

  }
  let rect = createNs('line')
  rect.setAttribute('shape-rendering', 'crispEdges')
  rect.setAttribute('stroke', stroke)
  rect.setAttribute('stroke-opacity', strokeOpacity)
  rect.setAttribute('stroke-dasharray', strokeDasharray)
  rect.setAttribute('x1', pointArr[0].x)
  rect.setAttribute('y1', y)
  rect.setAttribute('x2', pointArr[pointArr.length - 1].x)
  rect.setAttribute('y2', y)
  g.appendChild(rect)
}
