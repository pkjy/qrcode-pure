/**
 * QRDecode
 */
'use strict';
import QRDecode from './decode'
/**
 * 二维码解码
 * @param canvas
 * @param error
 * @constructor
 */
function Decode(canvas, error) {
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
export default function (canvas) {
  var text = '';
  var error = function (e) {
    console.log('error', e)
  }
  text = (new Decode(canvas, error)).text;

  return text;
};
