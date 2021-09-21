
import React from 'react'


import Layer from './layer'


import './background.scss'

export default function Background ( { className, layers } ) {

    return (
        <div className={`background ${ ( className )? className : ''}`}>
            {
                layers?.map( (_, index) => (
                    <Layer
                        key         = { index }
                        params      = { _ }
                        zindex      = { index }
                        className   = {`layer-${index}`}
                    />
                ))
            }
        </div>
    )
}