// Dependencies 
import React from 'react'

// Components
import BlurbVerticalDark from '../blurb/blurbVerticalDark'
import noImage from '../../../assets/img/global/noimage.jpg'

export default {
    title: 'vod/blurb/blurbVerticalDark',
    component: BlurbVerticalDark,
    parameters: {
        backgrounds: {
          default: 'dark-purple'
        }
    }
}
  
const Template = (args) => <BlurbVerticalDark {...args} />

export const Primary = Template.bind({})
Primary.args = {
    className: '',
    link: '#',
    iconImage: '',
    featuredImage: '',
    noImage: noImage,
    title: 'Test',
    serieTitle: 'Building the House',
    serieLink: '#',
    excerpt: 'Lorem ipsum dolor sit amet'
}