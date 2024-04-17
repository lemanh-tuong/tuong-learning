import { ComponentStory, Meta } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { Control } from '../Control';

export default {
  title: 'Control/Basic',
  component: Control,
  argTypes: {},
  args: {},
  decorators: [withDesign],
} as Meta<typeof Control>;

export const TimePickerRange: ComponentStory<typeof Control> = () => {
  return <Control type="TimePickerRange" />;
};

export const TimePickerSingle: ComponentStory<typeof Control> = () => {
  return <Control type="TimePickerSingle" />;
};
