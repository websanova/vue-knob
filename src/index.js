import Knob from './component.vue';

Knob.install = function(Vue) {
  Vue.component(Knob.name, Knob);
};

export default Knob;