<template>
  <canvas ref="canvas" width="500" height="500"></canvas>
</template>

<script>
import { MainCanvas, CanvasImage } from '../util/merge';

export default {
  name: 'demo',
  mounted() {
    const canvas = this.$refs.canvas;
    const context = canvas.getContext('2d');

    const url = 'http://ov6jc8fwp.bkt.clouddn.com/D43AA1E7-29E9-4C1B-B615-7D4172907531.png';

    const source = new CanvasImage(url, 500, 500).imageElement;

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
          const target = new CanvasImage(url, 80, 80).imageElement;
          resolve(target);
        }, 0);
      });
    }

    async function mergeCanvas() {
      const targetElement = await sourceCanvasImage();
      const main = new MainCanvas(source, targetElement, 'right').canvasElement;
      context.drawImage(main, 0, 0, 500, 500);
    }

    source.onload = function() {
      mergeCanvas();
    };
  },
};
</script>

<style scoped>
</style>
