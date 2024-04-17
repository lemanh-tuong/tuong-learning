import { ComponentStory, Meta } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { Input } from '../Input';

export default {
  title: 'Input/WithSuffixIcon',
  component: Input,
  argTypes: {},
  args: {},
  decorators: [withDesign],
} as Meta<typeof Input>;

export const WithSuffixIcon: ComponentStory<typeof Input> = args => {
  return <Input {...args} value={null} suffixIcon={<div>₫</div>} />;
};
