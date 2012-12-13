node-qqwry
==========

基于cz88纯真IP数据库的lbs解析，IP转高德经纬度

可实现：
  IP转地址
  IP转行政区划名称，目前可精确到国内城市级
  IP转行政区划对应的坐标bounds，坐标类型为高德系


## Installation
通过npm 进行安装
```js
  npm install node-qqwry

或通过github 进行安装
```js
  git clone https://github.com/yhostc/node-qqwry.git

## Examples 

通过IP获取地址

    var lbs = require('./index.js');
    lbs.getAddress('106.155.177.79');
    lbs.getArea('106.155.177.79');
    lbs.getBounds('106.155.177.79');

## Tests
  
    node test.js

## 版权

BSD 谁爱用谁用    [ yhostc ]( http://yhostc.com )
