# minichart

## Installing

Using npm:

```bash
$ npm install minichart
```

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>minichart</title>
</head>
<body>
<div id="chart"></div>
</body>
</html>
```

```js
// get dom
let chart = MiniChart.init(document.getElementById('chart'))
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
