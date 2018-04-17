const config = {
	dev:{
		protocol: 'http',
		host: '192.168.241.11',
		port: '8086'    
	},
	production: {
		protocol: '',
		host: '',
		prot: ''
	}
};
const dev = config.dev.protocol+'://'+config.dev.host+':'+config.dev.port;
// const dev = 'https://api.github.com/';
// const dev = 'http://ov6jc8fwp.bkt.clouddn.com/net.json';
export default {
	devApi:dev
};