# qrcode-pure

### 简介
qrcode encode and decode in js (without jquery)

生成\解码二维码的函数。核心源码来自项目[qrcode](https://github.com/nuintun/qrcode)，但qrcode使用的是jquery封装，qrcode-pure在此将两个功能拆分了出来。

### 安装
``` bash
# 安装依赖
npm i install --save qrcode-pure
```

### 使用
在项目中使用：(vue单文件组件为例)
``` html
<!-- template -->
<input type="file" @change="handleChange">
<canvas ref="decode-canvas">
<button @click="decode">点击解码</button>
```
``` javascript
// 引入解码函数

// script 
import qedecode from 'qrcode-pure/lib/qrdecode'

// methods
handleChange(e) {
  var canvas = this.$refs['decode-canvas'],
    ctx = canvas.getContext('2d'),
    file = e.target.files[0],
    reader = new FileReader()

  reader.onload = function(e) {
    var img = new Image()

    img.onload = function() {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
    }

    img.src = e.target.result
  }

  file && reader.readAsDataURL(file)
}

// 调用解码函数
// 传入一个canvas，内容为二维码
// 如果是上传的图片，需要调用canvas的drawImage方法，生成canvas
function decode(){
  let result = qedecode(this.$refs['decode-canvas')

  // result返回值为解码后的值
  console.log('result', result)
}
```

### 在线体验
[qrcode-pure尝试](https://pkjy.github.io/#/gallery/qrcode-pure)
