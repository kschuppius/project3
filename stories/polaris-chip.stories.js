import { html } from 'lit';
import '../src/polaris-chip.js';

export default {
  title: 'PolarisChip',
  component: 'polaris-chip',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <polaris-chip
      style="--polaris-chip-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </polaris-chip>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
