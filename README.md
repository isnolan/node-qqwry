node-qqwry
==========

基于cz88纯真IP数据库的lbs解析，IP转高德经纬度

可实现：

IP转地址;
P转行政区划名称，目前可精确到国内城市级;
IP转行政区划对应的坐标bounds，坐标类型为高德系;

## Installation
通过npm 进行安装
<pre>
  npm install node-qqwry
</pre>
或通过github 进行安装
<pre>
  git clone https://github.com/yhostc/node-qqwry.git
</pre>
## Examples 

通过IP获取地址
<pre>
var lbs = require('node-qqwry');
lbs.getAddress('106.155.177.79');
lbs.getArea('106.155.177.79');
lbs.getBounds('106.155.177.79');
</pre>
## Tests
<pre> 
node test.js
</pre>
## 版权

BSD 谁爱用谁用    [ yhostc ]( http://yhostc.com )
