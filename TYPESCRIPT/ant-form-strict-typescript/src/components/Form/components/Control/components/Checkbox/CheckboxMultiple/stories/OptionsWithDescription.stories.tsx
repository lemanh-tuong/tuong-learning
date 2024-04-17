import { MehOutlined } from '@ant-design/icons';
import { ComponentStory, Meta } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { CheckboxMultiple } from '../CheckboxMultiple';

export default {
  title: 'Checkbox/CheckboxMultiple',
  component: CheckboxMultiple,
  argTypes: {},
  args: {},
  decorators: [withDesign],
} as Meta<typeof CheckboxMultiple>;

export const OptionsWithDescription: ComponentStory<typeof CheckboxMultiple> = args => {
  return (
    <CheckboxMultiple
      {...args}
      options={[
        {
          id: '1',
          label: 'Paypal',
          value: 'PAYPAL',
          disabled: true,
          description: (
            <div>
              Paypal payment is under maintenance <MehOutlined />
            </div>
          ),
        },
        { id: '2', label: 'Stripe', value: 'STRIPE' },
        { id: '3', label: 'Credit card', value: 'CREDIT' },
      ]}
      value={['STRIPE', 'CREDIT']}
    />
  );
};
