// Components
import React from 'react'

export default function Layer ( { params, zindex, className } ) {

    const layerType = ( params ) ? params.sectionConfigurationBackgroundLayerType.split(':')[0] : ''
    
    switch( layerType ){

        case 'color':
            const layerColor = {
                color: params.sectionConfigurationBackgroundLayerColor.sectionConfigurationBackgroundLayerColorColor,
                opacity: params.sectionConfigurationBackgroundLayerColor.sectionConfigurationBackgroundLayerColorOpacity,
            }
            return (
                <div
                    className   =   { `layer-color ${ ( className ) ? className : '' }` }
                    style       =   {{
                                        'zIndex': zindex,
                                        'backgroundColor': layerColor.color,
                                        'opacity': layerColor.opacity,
                                    }}
                >
                </div>
            )
            break

        case 'image':
            const layerImage = {
                imageFile: params.sectionConfigurationBackgroundLayerImage.sectionConfigurationBackgroundLayerImageImage?.localFile.publicURL,
                position: params.sectionConfigurationBackgroundLayerImage.sectionConfigurationBackgroundLayerImagePosition.replace('-',' '),
                repeat: params.sectionConfigurationBackgroundLayerImage.sectionConfigurationBackgroundLayerImageRepeat,
                size: params.sectionConfigurationBackgroundLayerImage.sectionConfigurationBackgroundLayerImageSize?.split(':')[0],
                sizeCustom: params.sectionConfigurationBackgroundLayerImage.sectionConfigurationBackgroundLayerImageSizeCustom,
                opacity: params.sectionConfigurationBackgroundLayerImage.sectionConfigurationBackgroundLayerImageOpacity,
                fixed: params.sectionConfigurationBackgroundLayerImage.sectionConfigurationBackgroundLayerImageFixed,
            }
            
            return (
                <div
                    className   =   { `layer-image ${ ( className ) ? className : '' }` }
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
            break

        case 'gradient':

            let steps = ''
            const layerGradient = params.sectionConfigurationBackgroundLayerGradient
            const layerGradientSteps = params.sectionConfigurationBackgroundLayerGradient.sectionConfigurationBackgroundLayerGradientSteps
            const angle =   ( layerGradient.sectionConfigurationBackgroundLayerGradientAngle ) ? 
                                layerGradient.sectionConfigurationBackgroundLayerGradientAngle + 'deg' + ','
                            : 
                                '90deg'  + ','

            if( layerGradientSteps.length > 0 ) {
                layerGradientSteps.forEach( ( _, i ) => {
                    steps += `${_.step.color} ${( _.step.stop ) ? _.step.stop + '%' : '0%'}${ ( layerGradientSteps.length === i+1 ) ? '' : ', ' }`
                })
            }
            const layerGradientStyle = layerGradient.sectionConfigurationBackgroundLayerGradientType + '-gradient(' + angle +' '+ steps + ')'

            return (
                <div
                    className               =   { `layer-gradient ${ ( className ) ? className : '' }` }
                    style                   =   {{
                                                    'zIndex': zindex,
                                                    'opacity': '',
                                                    'background': layerGradientStyle,
                                                }}
                >
                </div>
            )
            break

        case 'text':
            const layerText = {
                content: params.sectionConfigurationBackgroundLayerText.sectionConfigurationBackgroundLayerTextText,
                opacity: params.sectionConfigurationBackgroundLayerText.sectionConfigurationBackgroundLayerTextOpacity
            }
            return (
                <div
                    className               =   { `layer-text ${ ( className ) ? className : '' }` }
                    style                   =   {{
                                                    'zIndex': zindex,
                                                    'opacity': layerText.opacity,
                                                }}
                    dangerouslySetInnerHTML = {{__html:layerText.content}}
                >
                </div>
            )
            break
        default:
            return <></>
    }

}