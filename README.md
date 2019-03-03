# qrcode-pure

> 二维码编码与解码。
> 核心源码来自项目[qrcode](https://github.com/nuintun/qrcode)，但qrcode使用的是jquery封装，`qrcode-pure`在此将两个功能拆分了出来，单纯的作为两个函数调用。

### 安装
``` bash
# 安装依赖
npm i install --save qrcode-pure
```

### 文档
#### qrdecode 解码
##### 调用参数
需要传入一个canvas DOM

##### 返回值
调用`qrdecode`解码后返回的值为一个对象。

|参数|备注|
|-|:-:|
|text|解码后的值|
|canvas|解析的canvasDOM|

#### qrencode 编码
##### 调用参数
可参考项目[qrcode](https://github.com/nuintun/qrcode)内的参数。

##### 返回值
调用`qrencode`编码后返回的值为一个对象。

|参数|备注|
|-|:-:|
|canvas|编码后的的canvasDOM|

### 使用
#### 全部引入

``` javascript
// 全部引入
import qrcodePure from 'qrcode-pure'

// 解码
qrcodePure.QRDecode()

// 编码
qrcodePure.QREncode()

```

#### 单独引入
##### 解码
在项目中使用：(解析单张二维码)
``` html
<!-- template -->
<input type="file" @change="handleChange">
<canvas ref="decode-canvas">
<button @click="decode">点击解码</button>
```

``` javascript
// 引入解码函数

// script 
import qrdecode from 'qrcode-pure/lib/qrdecode'

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
  let result = qrdecode(this.$refs['decode-canvas')

  // result返回值为解码后的值
  console.log('result', result)
}
```

在项目中使用：(解析多张二维码)
``` html
<!-- template -->
<input type="file" multiple @change="handleChange">
```
``` javascript
// 引入解码函数

// script 
import qrdecode from 'qrcode-pure/lib/qrdecode'

// methods
handleChange(e) {
  if (e.target.files.length === 0) return
    Object.values(e.target.files).forEach(v => {
      let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        reader = new FileReader()

      reader.onload = function(e) {
        var img = new Image()

        img.onload = function() {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)

          // 调用结果 result 为对象，具体参数参考 文档 => decode 解码
          let result = qrdecode(canvas)
        }

        img.src = e.target.result
      }

      v && reader.readAsDataURL(v)
    })
}
```

##### 编码

在项目中使用：(vue单文件组件为例)
``` html
<!-- template -->
<el-button @click="encode" type="primary" size="mini" class="m-l_2">编码</el-button>
```
``` javascript
// 引入解码函数

// script 
import qrencode from 'qrcode-pure/lib/qrencode'

// methods
encode() {
  // 调用 qrencode 编码函数，可接受一个对象参数
  // 参数具体内容请参考项目[qrcode](https://github.com/nuintun/qrcode)，在此不再赘述。
  // 返回值为一个对象
  // 其中canvas属性为编码后二维码的canvas DOM
  let result = qrencode({ text: 'https://pkjy.github.io' })
}
```

### 在线体验
> 注：基于DRY原则，本项目目前不再更新，具体情况请查看[issue]()，本项目权当作为一个搜索引荐，因为创建本项目时就是因为没有搜到需要的库，如有帮助到你欢迎点颗:star:。

[qrcode-pure体验](https://pkjy.github.io/#/gallery/qrcode-pure)

