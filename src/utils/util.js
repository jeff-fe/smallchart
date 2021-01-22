export function arrayMin(data) {
  return Math.min.apply(Math, data)
}

export function arrayMax(data) {
  return Math.max.apply(Math, data)
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
