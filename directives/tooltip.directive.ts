import { defineComponent } from 'vue';

declare const M: any;

export default defineComponent({
  bind(el: any, { value }: any) {
    M.Tooltip.init(el, { html: value });
  },
  unbind(el: any) {
    const tooltip = M.Tooltip.getInstance(el);
    if(tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  }
});