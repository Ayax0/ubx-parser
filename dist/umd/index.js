!function(r,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["ubx-parser"]=t():r["ubx-parser"]=t()}(this,(()=>(()=>{"use strict";var r={89:(r,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PacketParser=void 0;var e=function(){function r(r,t){this.packet_class=r,this.packet_id=t}return r.prototype.compareSignature=function(r,t){return this.packet_class==r&&this.packet_id==t},r}();t.PacketParser=e},609:(r,t,e)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UBXParser=void 0;var n=e(508),a=e(299),o=e(425),i=function(){function r(){this.parsers=[],this.packetListeners=new Map,this.localBuffer=Buffer.from(""),this.registerParser(new o.UBX_NAV_PVT_Parser),this.registerParser(new a.UBX_ESF_STATUS_Parser),this.registerParser(new n.UBX_ESF_MEAS_Parser)}return r.prototype.parse=function(r){var t,e,n,a=this;this.localBuffer=Buffer.concat([this.localBuffer,r]);var o=this.localBuffer.indexOf(Buffer.from([181,98])),i=this.localBuffer.indexOf(Buffer.from([181,98]),2);if(0!=o&&i>0)return this.localBuffer=this.localBuffer.subarray(i),null===(t=this.packetListeners.get("warning"))||void 0===t?void 0:t.forEach((function(r){return r(new Error("invalide packet droped"))}));if(0==o&&-1!=i){var s=this.localBuffer.subarray(0,i);if(this.localBuffer=this.localBuffer.subarray(i),s.length<8)return null===(e=this.packetListeners.get("error"))||void 0===e?void 0:e.forEach((function(r){return r(new Error("invalide packet size"))}));var d=s.readUInt8(2),u=s.readUInt8(3),c=s.readUInt16LE(4),f=s.subarray(6,6+c);if(f.length!=c)return null===(n=this.packetListeners.get("error"))||void 0===n?void 0:n.forEach((function(r){return r(new Error("invalide packet payload"))}));this.parsers.forEach((function(r){var t;r.compareSignature(d,u)&&(null===(t=a.packetListeners.get("data"))||void 0===t||t.forEach((function(t){var e;try{var n=r.parse(f);n.packet_class=d,n.packet_id=u,t(n)}catch(r){null===(e=a.packetListeners.get("error"))||void 0===e||e.forEach((function(t){return t(r)}))}})))}))}},r.prototype.registerParser=function(r){this.parsers.push(r)},r.prototype.unregisterParser=function(r){this.parsers=this.parsers.filter((function(t){return t!=r}))},r.prototype.on=function(r,t){var e;this.packetListeners.has(r)?null===(e=this.packetListeners.get(r))||void 0===e||e.push(t):this.packetListeners.set(r,[t])},r}();t.UBXParser=i},287:(r,t)=>{function e(r,t,e){return void 0===t&&(t=0),void 0===e&&(e=1),(r&255>>8-e<<t)>>t}function n(r,t,n){if(void 0===t&&(t=0),void 0===n&&(n=1),t<=7&&t+n>8){var a=e(255&r,t,t+n>8?8-t:n);return e(r>>8&255,0,t+n-8)<<8-t|a}return t<=7?e(r,t,n):e(r>>8&255,t-8,n)}Object.defineProperty(t,"__esModule",{value:!0}),t.readBitFromUInt32=t.readBitFromUInt16=t.readBitFromUInt8=void 0,t.readBitFromUInt8=e,t.readBitFromUInt16=n,t.readBitFromUInt32=function(r,t,e){if(void 0===t&&(t=0),void 0===e&&(e=1),t<=15&&t+e>16){var a=n(65535&r,t,t+e>16?16-t:e);return n(r>>16&65535,0,t+e-16)<<16-t|a}return t<=15?n(r,t,e):n(r>>16&65535,t-16,e)}},508:function(r,t,e){var n,a=this&&this.__extends||(n=function(r,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t}||function(r,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(r[e]=t[e])},n(r,t)},function(r,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function e(){this.constructor=r}n(r,t),r.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)});Object.defineProperty(t,"__esModule",{value:!0}),t.UBX_ESF_MEAS_Parser=void 0;var o=e(287),i=function(r){function t(){return r.call(this,16,2)||this}return a(t,r),t.prototype.parse=function(r){for(var t={timeTag:r.readUInt32LE(0),timeMarkSent:(0,o.readBitFromUInt16)(r.readUInt16LE(4),0,2),timeMarkEdge:(0,o.readBitFromUInt16)(r.readUInt16LE(4),2),calibTtagValid:1==(0,o.readBitFromUInt16)(r.readUInt16LE(4),3),numMeas:(0,o.readBitFromUInt16)(r.readUInt16LE(4),11,5),measurements:[]},e=0;e<t.numMeas;e++){var n=r.subarray(8+4*e,12+4*e);4==n.length&&t.measurements.push({dataField:(0,o.readBitFromUInt32)(n.readUInt32LE(0),0,24),dataType:(0,o.readBitFromUInt32)(n.readUInt32LE(0),24,6),calibTtag:r.readUInt32LE(1)})}return t},t}(e(89).PacketParser);t.UBX_ESF_MEAS_Parser=i},299:function(r,t,e){var n,a=this&&this.__extends||(n=function(r,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t}||function(r,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(r[e]=t[e])},n(r,t)},function(r,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function e(){this.constructor=r}n(r,t),r.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)});Object.defineProperty(t,"__esModule",{value:!0}),t.UBX_ESF_STATUS_Parser=void 0;var o=e(287),i=function(r){function t(){return r.call(this,16,16)||this}return a(t,r),t.prototype.parse=function(r){for(var t={iTOW:r.readUInt32LE(0),version:r.readUInt8(4),wtInitStatus:(0,o.readBitFromUInt8)(r.readUInt8(5),0,2),mntAlgStatus:(0,o.readBitFromUInt8)(r.readUInt8(5),2,3),insInitStatus:(0,o.readBitFromUInt8)(r.readUInt8(5),5,2),imuInitStatus:(0,o.readBitFromUInt8)(r.readUInt8(6),0,2),fusionMode:r.readUInt8(12),numSens:r.readUInt8(15),sensors:[]},e=0;e<t.numSens;e++){var n=r.subarray(16+4*e,20+4*e);4==n.length&&t.sensors.push({type:(0,o.readBitFromUInt8)(n.readUInt8(0),0,6),used:1==(0,o.readBitFromUInt8)(n.readUInt8(0),6),ready:1==(0,o.readBitFromUInt8)(n.readUInt8(0),7),calibStatus:(0,o.readBitFromUInt8)(n.readUInt8(1),0,2),timeStatus:(0,o.readBitFromUInt8)(n.readUInt8(1),2,2),freq:n.readUInt8(2),badMeas:(0,o.readBitFromUInt8)(n.readUInt8(3),0),badTTag:(0,o.readBitFromUInt8)(n.readUInt8(3),1),missingMeas:(0,o.readBitFromUInt8)(n.readUInt8(3),2),noisyMeas:(0,o.readBitFromUInt8)(n.readUInt8(3),3)})}return t},t}(e(89).PacketParser);t.UBX_ESF_STATUS_Parser=i},425:function(r,t,e){var n,a=this&&this.__extends||(n=function(r,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t}||function(r,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(r[e]=t[e])},n(r,t)},function(r,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function e(){this.constructor=r}n(r,t),r.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)});Object.defineProperty(t,"__esModule",{value:!0}),t.UBX_NAV_PVT_Parser=void 0;var o=e(287),i=function(r){function t(){return r.call(this,1,7)||this}return a(t,r),t.prototype.parse=function(r){return{iTOW:r.readUInt32LE(0),year:r.readUInt16LE(4),month:r.readUInt8(6),day:r.readUInt8(7),hour:r.readUInt8(8),min:r.readUInt8(9),sec:r.readUInt8(10),validDate:1==(0,o.readBitFromUInt8)(r.readUInt8(11),0),validTime:1==(0,o.readBitFromUInt8)(r.readUInt8(11),1),fullyResolved:1==(0,o.readBitFromUInt8)(r.readUInt8(11),2),validMag:1==(0,o.readBitFromUInt8)(r.readUInt8(11),3),tAcc:r.readUInt32LE(12),nano:r.readInt32LE(16),fixType:r.readUInt8(20),gnssFixOK:1==(0,o.readBitFromUInt8)(r.readUInt8(21),0),diffSoln:1==(0,o.readBitFromUInt8)(r.readUInt8(21),1),psmState:(0,o.readBitFromUInt8)(r.readUInt8(21),2,3),headVehValid:1==(0,o.readBitFromUInt8)(r.readUInt8(21),5),carrSoln:(0,o.readBitFromUInt8)(r.readUInt8(21),6,2),confirmedAvai:1==(0,o.readBitFromUInt8)(r.readUInt8(22),5),confirmedDate:1==(0,o.readBitFromUInt8)(r.readUInt8(22),6),confirmedTime:1==(0,o.readBitFromUInt8)(r.readUInt8(22),7),numSV:r.readUInt8(23),lon:1e-7*r.readInt32LE(24),lat:1e-7*r.readInt32LE(28),height:r.readInt32LE(32),hMSL:r.readInt32LE(36),hAcc:r.readUInt32LE(40),vAcc:r.readUInt32LE(44),velN:r.readInt32LE(48),velE:r.readInt32LE(52),velD:r.readInt32LE(56),gSpeed:r.readInt32LE(60),headMot:1e-5*r.readInt32LE(64),sAcc:r.readUInt32LE(68),headAcc:1e-5*r.readUInt32LE(72),pDOP:.01*r.readUInt16LE(76),invalidLlh:1==(0,o.readBitFromUInt16)(r.readUInt16LE(78),0),lastCorrectionAge:(0,o.readBitFromUInt16)(r.readUInt16LE(78),1,4),headVeh:1e-5*r.readInt32LE(84),magDec:.01*r.readInt16LE(88),magAcc:.01*r.readUInt16LE(90)}},t}(e(89).PacketParser);t.UBX_NAV_PVT_Parser=i}},t={};function e(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return r[n].call(o.exports,o,o.exports,e),o.exports}var n={};return(()=>{var r=n;Object.defineProperty(r,"__esModule",{value:!0}),r.readBitFromUInt32=r.readBitFromUInt16=r.readBitFromUInt8=r.PacketParser=r.UBXParser=void 0;var t=e(609);Object.defineProperty(r,"UBXParser",{enumerable:!0,get:function(){return t.UBXParser}});var a=e(89);Object.defineProperty(r,"PacketParser",{enumerable:!0,get:function(){return a.PacketParser}});var o=e(287);Object.defineProperty(r,"readBitFromUInt8",{enumerable:!0,get:function(){return o.readBitFromUInt8}}),Object.defineProperty(r,"readBitFromUInt16",{enumerable:!0,get:function(){return o.readBitFromUInt16}}),Object.defineProperty(r,"readBitFromUInt32",{enumerable:!0,get:function(){return o.readBitFromUInt32}})})(),n})()));