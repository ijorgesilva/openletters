import React from 'react'

import { action } from "@storybook/addon-actions"

import '../src/components/global.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },

  backgrounds: {
    default: 'white',
    values: [
        { 
            name: 'white', 
            value: '#fff'
        },
        { 
            name: 'light-gray', 
            value: '#f8f8f8'
        },
        { 
            name: 'dark-purple', 
            value: '#0F0A1B' 
        },
      ],
  }
}

export const decorators = [(Story) => <div style={{ margin: '3em' }}><Story/></div>];

global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}

global.__BASE_PATH__ = "/"

window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}
