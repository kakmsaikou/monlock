import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;

Vue.component('Layout', Layout);
Vue.component('Icon', Icon);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

console.log();
if (matchMedia('(pointer:fine)').matches) {
  // window.alert('请使用手机打开本页面，以保证浏览效果。');
  const img = document.createElement('img')
  img.src = './img/qrcode.png'
  img.style.position = 'fixed'
  img.style.left = '50%'
  img.style.top = '50%'
  img.style.transform = 'translate(-50%,-50%)'
  img.style.height = '50vh'
  img.style.boxShadow = '0 0 10px rgba(0,0,0,0.05)'
  document.body.appendChild(img)
}