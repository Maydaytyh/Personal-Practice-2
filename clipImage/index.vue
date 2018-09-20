<template>
  <div>
    <canvas id="canvas" style="border: 1px solid #ccc;cursor: grab;" width="260" height="208">

    </canvas>
    <div>
      <img id="source" :src="src">
    </div>
    <Button @click="upLoad">上传七牛云</Button>
  </div>
</template>

<script>
import apiCms from '@/api/cms';
import pageConfig from '@/pageConfig';

export default {
  name: 'index',
  data() {
    return {
      dWidth: 260,
      dHeight: '',
      downY: 0,
      upY: 0,
      offset: 0,
      canvas: '',
      src: '',
      image: '',
    };
  },
  mounted() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const image = document.getElementById('source');
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = image;
    this.image.setAttribute('crossOrigin', 'Anonymous');
    this.src = 'http://ov6jc8fwp.bkt.clouddn.com/2440018536-58e12656c3533_huge256.jpg';
    image.onload = () => {
      const rate = parseFloat((image.width / 260).toFixed(10));
      this.dHeight = parseFloat(image.height / rate).toFixed(10);
      ctx.drawImage(image, 0, 0, this.dWidth, this.dHeight);
    };

    let lastOffsetY;

    const handleMousemove = (e) => {
      const currentOffsetY = e.offsetY;
      this.offset = this.offset + (currentOffsetY - lastOffsetY);
      const topBorder = 0;
      const bottomBorder = -this.dHeight + 208;
      if (this.offset < 0 && this.offset > -this.dHeight + 208) {
        this.render(this.offset);
      } else if (this.offset < bottomBorder) {
        this.offset = bottomBorder;
      } else if (this.offset > topBorder) {
        this.offset = topBorder;
      }
      lastOffsetY = e.offsetY;
    };

    canvas.addEventListener('mousedown', (e) => {
      console.log('帅哥按下了鼠标：', 'x:', e.offsetX, 'y:', e.offsetY);
      lastOffsetY = e.offsetY;
      this.downY = e.offsetY;
      canvas.addEventListener('mousemove', handleMousemove);
    });

    canvas.addEventListener('mouseup', (e) => {
      console.log('帅哥松开了鼠标：', 'y:', e.offsetY);
      canvas.removeEventListener('mousemove', handleMousemove);
    });
    canvas.addEventListener('mouseleave', (e) => {
      console.log('帅哥离开了画布：', 'y:', e.offsetY);
      canvas.removeEventListener('mousemove', handleMousemove);
    });
  },
  methods: {
    render(offset) {
      this.ctx.clearRect(0, 0, 260, 208);
      this.ctx.drawImage(this.image, 0, offset, this.dWidth, this.dHeight);
    },
    async upLoad() {
      console.log('上传到七牛云');
      const dataUrl = this.canvas.toDataURL();
      const { hash } = await apiCms.uploadQiNiu({ base64Str: dataUrl });
      this.image = `${pageConfig.QINIU_IMG_URL}/${hash}`;
      console.log(this.image);
    },
  },
};
</script>

<style scoped>
</style>
