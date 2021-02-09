// Dependencies 
import React from 'react'

// Components
import BlurbVerticalDarkVod from '../blurb/blurbVerticalDarkVod'
import noImage from '../../../assets/img/global/noimage.jpg'

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
    noImage: noImage,
    title: 'Test',
    serieTitle: 'Building the House',
    serieLink: '#',
    excerpt: 'Lorem ipsum dolor sit amet'
}