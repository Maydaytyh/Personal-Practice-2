var PSD = require('psd');
var fs = require('fs')
var psd = PSD.fromFile("照片墙（极限照片）.psd");
psd.parse();
var psdContent = psd.tree().export();
psdContent = JSON.stringify(psdContent);


fs.writeFile('photo.json',psdContent,(err)=>{
  if(err) throw err;
  console.log("解析数据存入photo.json")
})

PSD.open("照片墙（极限照片）.psd").then(function (psd) {
  return psd.image.saveAsPng('./output.png');
}).then(function () {
  console.log("Finished!");
});