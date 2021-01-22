# smallchart

## Installing

Using npm:

```bash
$ npm install smallchart
```

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>smallchart</title>
</head>
<body>
<div id="chart"></div>
</body>
</html>
```

```js
// get dom
let chart = SmallChart.init(document.getElementById('chart'))
let op = {
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        fill: '#8956FF',
        stroke: '#8956FF',
        smooth: true
    }]
}
chart.setOption(op)
```
