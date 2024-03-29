import React from 'react'

import BlurbHorizontal from '../blurb/blurbHorizontal'

export default {
    title: 'content/blurb/blurbHorizontal',
    component: BlurbHorizontal,
    parameters: {
        backgrounds: {
          default: 'light-gray'
        }
    }
}
  
const Template = (args) => <BlurbHorizontal {...args} />

export const Primary = Template.bind({})
Primary.args = {
    key: '',
    className: '',
    link: '#',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    tags: '',
    subtitle: 'Excepteur sint occaecat',
    linkText: '#',
    excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}