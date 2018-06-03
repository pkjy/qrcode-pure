/**
 * QREncode
 */
'use strict';
import QREncode from './encode'

let QREncodeConf = {
  /**
   * 配置
   */
  config: {
    text: 'QRCode', // 默认文字
    render: 'canvas',
    bgColor: '#FFF', // 背景色
    moduleColor: '#000', // 前景色
    moduleSize: 5, // 模块大小
    mode: 4, // 编码格式，默认8字节编码
    ECLevel: 2, // 纠错码等级，默认30%
    margin: 4, // 留白
    logo: '', // logo;
    error: () => { }
  },
  Render: {
    canvas: function (self, callback) {
      var i;
      var j;
      var cfg = self.config;
      var mSize = cfg.moduleSize;
      var size = self.pixArr.length;
      var outSize = 2 * cfg.margin + size;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      function getRGB(color) {
        var red, green, blue;

        if (color.indexOf('#') === 0) {
          color = color.substr(1);
        }

        if (color.length === 6) {
          red = color.substr(0, 2);
          green = color.substr(2, 2);
          blue = color.substr(4, 2);
        } else if (color.length === 3) {
          red = color.substr(0, 1);
          red += red;
          green = color.substr(1, 1);
          green += green;
          blue = color.substr(2, 1);
          blue += blue;
        } else {
          throw new Error('Error color');
        }

        return 'rgb(' + parseInt(red, 16) + ', ' + parseInt(green, 16) + ', ' + parseInt(blue, 16) + ')';
      }

      // 初始化画布
      function init(size) {
        size = cfg.margin * 2 + size;
        canvas.width = size * mSize;
        canvas.height = size * mSize;
        ctx.fillStyle = getRGB(cfg.bgColor);

        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 设置色块
      function setBlock(i, j) {
        ctx.fillStyle = getRGB(cfg.moduleColor);
        ctx.fillRect(i * mSize, j * mSize, mSize, mSize);
      }

      // 渲染logo
      function renderLogo(callback) {
        var img = new Image();

        img.onload = function () {
          var x;
          var y;
          var zoom;
          var imgW = img.width;
          var imgH = img.height;
          var imgSize = Math.max(imgW, imgH);

          if (imgSize > size * mSize * 0.3) {
            zoom = (size * mSize * 0.3) / imgSize;
            imgW = imgW * zoom;
            imgH = imgH * zoom;
          }

          x = Math.round((outSize * mSize - imgW) / 2);
          y = Math.round((outSize * mSize - imgH) / 2);

          ctx.drawImage(img, x, y, imgW, imgH);

          typeof callback === 'function' && callback();


          img.onload = null;
        };

        img.src = cfg.logo;
      }

      init(size);

      for (i = cfg.margin; i < size + cfg.margin; i++) {
        for (j = cfg.margin; j < size + cfg.margin; j++) {
          if (self.pixArr[i - cfg.margin][j - cfg.margin]) {
            setBlock(i, j, getRGB(cfg.moduleColor));
          }
        }
      }

      if (cfg.logo) {
        renderLogo(function () {
          typeof callback === 'function' && callback(canvas);
        });
      } else {
        typeof callback === 'function' && callback(canvas);
      }
    }
  }
};

/**
 * 二维码编码
 * @param config
 * @param callback
 * @returns {*}
 * @constructor
 */
function Encode(config, callback) {
  this.config = config;

  // 初始化
  return this._init(callback);
}

Encode.prototype = {
  _init: function (callback) {
    var config = this.config;

    this.qr = new QREncode();
    // 含有 Logo，使用最大容错
    if (config.logo) {
      config.ECLevel = 2;
    }

    try {
      this.version = this.qr.getVersionFromLength(config.ECLevel, config.mode, config.text);
      this.pixArr = this.qr.encodeToPix(config.mode, config.text, this.version, config.ECLevel);
    } catch (e) {
      typeof error === 'function' && config.error(e);
    }
    this.pixArr && QREncodeConf.Render[config.render](this, callback);
  }
};

/**
 * 二维码编码
 * @param cfg
 * @constructor
 */
export default function (cfg) {
  var that = this;
  var config = {};

  if (typeof (cfg) === 'string') {
    config.text = cfg;
  } else {
    config = Object.assign({}, QREncodeConf.config, cfg)
  }

  config.moduleSize = Math.round(config.moduleSize);
  config.margin = Math.round(config.margin);
  config.moduleSize = config.moduleSize > 0 ? config.moduleSize : QREncodeConf.config.moduleSize;
  config.margin = config.margin < 0 ? QREncodeConf.config.margin : config.margin;

  let result
  let encodeobj = new Encode(config, function (qrdom) {
    result = qrdom
  })

  return {
    canvas: result
  }
};
