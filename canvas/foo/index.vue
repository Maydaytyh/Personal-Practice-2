<template>
  <canvas ref="canvas" width="500" height="500"></canvas>
</template>

<script>
import { MainCanvas, CanvasImage } from './merge';
import defaultQR from '@/assets/defaultQR.png';
import Bus from '@/store/bus';

export default {
  name: 'demo',
  props: {
    mainPic: {
      type: String,
      default: 'text',
    },
    qr: {
      type: String,
      default: 'text',
    },
  },
  mounted() {
    // this.defaultQR = 'http://img.test.weidiango.com/FvkWr_oq8kxsLtfhiknYLyEyHaG2';
  },
  watch: {
    mainPic() {
      this.renderCanvas(defaultQR, this.$props.mainPic);
    },
    qr() {
      this.renderCanvas(this.$props.qr, this.$props.mainPic);
      const data = this.canvasToBase64();
      Bus.$emit('base-image', data);
    },
  },
  methods: {
    renderCanvas(qr, mainPic) {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');

      const currentQr = qr;
      const currentMainPic = mainPic;

      const source = new CanvasImage(currentQr, 500, 500).imageElement;

      /*
          desc: callback hell
        */
      /*
        source.onload = function() {
          const target = new CanvasImage(url, 80, 80).imageElement;
          target.onload = function() {
            const main = new MainCanvas(source, target, 'right').canvasElement;

            // console.log(Object.prototype.toString.call(main));
            context.drawImage(main, 0, 0, 500, 500);
          };
        };
        */

      /*
          desc：Promise方式
        */
      /*
        const sourcePromise = new Promise((resolve) => {
          setTimeout(() => {
            const target = new CanvasImage(url, 80, 80).imageElement;
            resolve(target); // 代码正常执行！
          }, 0);
        });
        source.onload = function() {
          sourcePromise.then((target) => {
            const main = new MainCanvas(source, target, 'right').canvasElement;

            context.drawImage(main, 0, 0, 500, 500);
          });
        };
        */

      /*
          desc: async/await方式
         */
      function sourceCanvasImage() {
        return new Promise((resolve) => {
          setTimeout(() => {
            const target = new CanvasImage(currentMainPic, 80, 80).imageElement;
            target.onload = () => {
              resolve(target);
            };
          }, 0);
        });
      }

      async function mergeCanvas() {
        const targetElement = await sourceCanvasImage();
        const main = new MainCanvas(source, targetElement, 'bottom').canvasElement;
        context.drawImage(main, 0, 0, 500, 500);
      }

      source.onload = () => {
        mergeCanvas();
      };
    },
    canvasToBase64() {
      const canvas = this.$refs.canvas;
      const dataURL = canvas.toDataURL('image/jpeg');
      return dataURL;
    },
    data() {
      return {
        // defaultQR: '',
      };
    },
  },
};
</script>

<style scoped>
</style>
