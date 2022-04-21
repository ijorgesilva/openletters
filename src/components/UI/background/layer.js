
import React from 'react'

export default function Layer ( { params, zindex, className } ) {

    const layerType = ( params ) ? params.backgroundLayerType.split(':')[0] : ''
    
    switch( layerType ){

        case 'color':{
            const layerColor = {
                color: params.backgroundLayerColor.backgroundLayerColorColor,
                opacity: params.backgroundLayerColor.backgroundLayerColorOpacity,
            }
            return (
                <div
                    className   =   { `layer-color ${ className ? className : '' }` }
                    style       =   {{
                                        'zIndex': zindex,
                                        'backgroundColor': layerColor.color,
                                        'opacity': layerColor.opacity,
                                    }}
                >
                </div>
            )
        }

        case 'image':{

            if(params.backgroundLayerImage.backgroundLayerImageImage?.localFile){
                const layerImage = {
                    imageFile: params.backgroundLayerImage.backgroundLayerImageImage?.localFile.publicURL,
                    position: params.backgroundLayerImage.backgroundLayerImagePosition.replace('-',' '),
                    repeat: params.backgroundLayerImage.backgroundLayerImageRepeat,
                    size: params.backgroundLayerImage.backgroundLayerImageSize?.split(':')[0],
                    sizeCustom: params.backgroundLayerImage.backgroundLayerImageSizeCustom,
                    opacity: params.backgroundLayerImage.backgroundLayerImageOpacity,
                    fixed: params.backgroundLayerImage.backgroundLayerImageFixed,
                }
                
                return (
                    <div
                        className   =   { `layer-image ${ className ? className : '' }` }
                        style       =   {{
                                            'zIndex': zindex,
                                            'backgroundImage': "url('"+layerImage.imageFile+"')",
                                            'backgroundPosition': layerImage.position,
                                            'backgroundRepeat': ( layerImage.fixed ) ? 'no-repeat' : layerImage.repeat,
                                            'backgroundSize': ( layerImage.size === 'custom' ) ? layerImage.sizeCustom : layerImage.size,
                                            'opacity': layerImage.opacity,
                                            'backgroundColor': 'transparent',
                                            'backgroundAttachment': ( layerImage.fixed ) ? 'fixed' : 'unset',
                                        }}
                    >
                    </div>
                )
            }
            return <></>
        }

        case 'gradient':{

            let steps = ''
            const layerGradient = params.backgroundLayerGradient
            const layerGradientSteps = params.backgroundLayerGradient.backgroundLayerGradientSteps
            const angle =   ( layerGradient.backgroundLayerGradientAngle ) ? 
                                layerGradient.backgroundLayerGradientAngle + 'deg' + ','
                            : 
                                '90deg'  + ','

            if( layerGradientSteps.length > 0 ) {
                layerGradientSteps.forEach( ( _, i ) => {
                    steps += `${_.step.color} ${( _.step.stop ) ? _.step.stop + '%' : '0%'}${ ( layerGradientSteps.length === i+1 ) ? '' : ', ' }`
                })
            }
            const layerGradientStyle = layerGradient.backgroundLayerGradientType + '-gradient(' + angle +' '+ steps + ')'

            return (
                <div
                    className               =   { `layer-gradient ${ className ? className : '' }` }
                    style                   =   {{
                                                    'zIndex': zindex,
                                                    'opacity': '',
                                                    'background': layerGradientStyle,
                                                }}
                >
                </div>
            )
        }

        case 'text':{
            const layerText = {
                content: params.backgroundLayerText.backgroundLayerTextText,
                opacity: params.backgroundLayerText.backgroundLayerTextOpacity
            }
            return (
                <div
                    className               =   { `layer-text ${ className ? className : '' }` }
                    style                   =   {{
                                                    'zIndex': zindex,
                                                    'opacity': layerText.opacity,
                                                }}
                    dangerouslySetInnerHTML = {{__html:layerText.content}}
                >
                </div>
            )
        }
        default:
            return <></>
    }

}