import TabsPageVue from '@saveats/views/TabsPage.vue';
import { mount } from '@vue/test-utils';

import { describe, test } from 'vitest';

describe('TabsPage.vue', () => {
  test('renders the parent tab page', () => {
    const wrapper = mount(TabsPageVue);
  });
});
