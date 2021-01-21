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
  path.setAttribute('points', i.points)
  path.setAttribute('stroke', i.stroke || 'slategray')
  path.setAttribute('stroke-width', i.strokeWidth || 2)
  path.setAttribute('stroke-dasharray', i.strokeDasharray || 'none')
  path.setAttribute('fill', 'none')
  parent.appendChild(path)
  if (i.fill) {
    let fillPath = createNs('polyline')
    fillPath.setAttribute('points', i.closePoints)
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
