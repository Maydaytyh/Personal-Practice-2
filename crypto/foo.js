const crypto = require('crypto');
const encrypto = (data) => {
  const { secretKey, groupId } = data;
  const tmp = crypto.createHmac('sha1', secretKey);
  tmp.update(groupId);
  return tmp.digest().toString('base64');
};
console.log(encrypto({secretKey:'foo',groupId:'bar'}));

// const crypto = require('crypto');
// const hmac = crypto.createHmac('sha1', 'foo');//创建一个key为a secret的Hmac实例。

// hmac.update('bar');//使用给定的数据更新Hmac实例内容，数据类型与key类型一致。
// console.log(hmac.digest('hex'));

//为什么没有用官方推荐的hmac.digest('hex')？
//为什么用的是sha1加密算法？