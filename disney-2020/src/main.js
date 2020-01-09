import Vue from 'vue'
import Disney2020 from "./Disney2020";

Vue.config.productionTip = false;

new Vue({
  render: h => h(Disney2020),
}).$mount('#app');
