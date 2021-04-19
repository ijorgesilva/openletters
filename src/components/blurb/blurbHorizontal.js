// Dependencies
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import TextTruncate from 'react-text-truncate'

// Components
import './blurbHorizontal.scss'

export default function BlurbHorizontal( { title, subtitle, keyIndex, featuredImage, className, noImage, link, tag, tags, tagClassName, excerpt, ...props } ) {

    const image = (featuredImage) ? featuredImage : (noImage) ? noImage : undefined

    const tagClass = (tagClassName) ? tagClassName : ""

    const tagsCounter = (tags) ? tags.nodes.length : 0

    return (
        <div key={(keyIndex) ? keyIndex : undefined} className={`card blurbHorizontal ${className}`} title={title}>
            
            <Link to={link}>

                <div className="card-img position-relative">
                    <GatsbyImage 
                        image={featuredImage} 
                        className="card-img-top"
                        height='100%'
                        alt=""
                    />
                </div>
                
                <div className="card-body">

                    <div>
                        {
                            (subtitle) ? 
                                <h6 className="card-subtitle">
                                    {subtitle}
                                </h6> 
                            : 
                                undefined
                        }
                        <h5 className="card-title h-color-one mt-2">
                            {title}
                        </h5>
                        <p className="card-text">
                            {
                                (excerpt) ? 
                                    <TextTruncate line={1} truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                                : 
                                    undefined
                            }
                        </p>
                    </div>

                    {
                        ( tagsCounter > 0 || tag ) ?
                            <div className="tags">
                                {
                                    ( tag ) ?
                                        <div className={`badge badge-pill badge-image ${tagClass}`} dangerouslySetInnerHTML={{__html: tag}}></div>
                                    :
                                        undefined
                                }
                                {
                                    ( tagsCounter > 0 ) ?
                                        tags.nodes.map( ( obj, index ) => (
                                            (index < 3) ?
                                                <div key={index} className={`badge badge-pill badge-image ${tagClass}`}>
                                                    {obj.name}
                                                </div>
                                            :
                                                undefined

                                        ))
                                    :
                                        undefined
                                }
                            </div>
                        :
                            undefined
                    }

                </div>

            </Link>

        </div>
    )
}