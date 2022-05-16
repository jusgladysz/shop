import React from 'react';
import { Button } from './Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BtnMode } from './interfaces';

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        mode: {
            options: [BtnMode.PRIMARY, BtnMode.SECONDARY, BtnMode.CANCEL, BtnMode.DARK],
            backgroundColor: { control: 'color' },
        },
        children: { constrol: 'text' },
        color: { control: true },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
    <Button {...args}>{args.children}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
    mode: BtnMode.PRIMARY,
    children: 'button text',
};
