import React from 'react'

import Layer from './layer'

import './background.scss'

export default function Background ( { className, layers } ) {

    return (
        <>
            {
                layers?.length > 0 ?
                    <div className={`background ${ className ? className : '' }`}>
                        {
                            layers?.reverse().map( (_, index) => (
                                <Layer
                                    key         = { index }
                                    params      = { _ }
                                    zindex      = { index }
                                    className   = {`layer-${index}`}
                                />
                            ))
                        }
                    </div>
                :
                    undefined
            }
        </>
    )
}