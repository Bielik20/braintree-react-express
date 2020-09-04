import React from 'react';
import { text } from '@storybook/addon-knobs';
import Task from './task';

export default {
  component: Task,
  title: 'Task',
};

export const Default = () => {
  const props = {
    id: text('id', '1'),
    title: text('title', 'Test Task'),
    state: text('state', 'TASK_INBOX'),
  };

  return <Task {...props} />;
};

