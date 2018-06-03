/**
 * QRDecode
 */
'use strict';
var QRDecode = require('./decode')
/**
 * 二维码解码
 * @param canvas
 * @param error
 * @constructor
 */
function Decode(canvas, error) {
  this.canvas = canvas
  this.text = this._init(this.getImageData(canvas), error);
}

Decode.prototype = {
  _init: function (imageData, error) {
    var text = '';
    var qr = new QRDecode();

    try {
      text = qr.decodeImageData(imageData, this.width, this.height);
    } catch (e) {
      typeof error === 'function' && error(e);
    }
    console.log('', imageData)
    return text;
  },
  getImageData: function (canvas) {
    var ctx;
    if (canvas.nodeName.toLowerCase() !== 'canvas') {
      canvas = canvas

      if (!canvas) return null;
    }

    ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
};

/**
 * 二维码解码
 * @param error
 * @returns {string}
 * @constructor
 */

function render(canvas) {
  var error = function (e) {
    console.log('error', e)
  }
  const decodeObj = new Decode(canvas, error)

  return decodeObj;
};

module.exports = render
