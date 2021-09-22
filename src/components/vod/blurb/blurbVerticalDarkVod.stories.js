import React from 'react'

import BlurbVerticalDarkVod from '../blurb/blurbVerticalDarkVod'

export default {
    title: 'vod/blurb/blurbVerticalDarkVod',
    component: BlurbVerticalDarkVod,
    parameters: {
        backgrounds: {
          default: 'dark-purple'
        }
    }
}
  
const Template = (args) => <BlurbVerticalDarkVod {...args} />

export const Primary = Template.bind({})
Primary.args = {
    className: '',
    link: '#',
    iconImage: '',
    featuredImage: '',
    title: 'Test',
    serieTitle: 'Building the House',
    serieLink: '#',
    excerpt: 'Lorem ipsum dolor sit amet'
}