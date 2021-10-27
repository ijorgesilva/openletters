import { DateTime } from 'luxon';
import React from 'react'

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function getHeroDescription(data) {
    let heroDescription
    if( data.videoDetails.videoOneLiner != null ){
        heroDescription = data.videoDetails.videoOneLiner
    }
    else if( data.excerpt != null ){
        heroDescription = data.excerpt
    }
    else {
        heroDescription = ''
    }
    return heroDescription
}

export function getSerieLink(data){
    let serieLink
    if(data.videoDetails.videoSeries  != null ) {
        serieLink = data.videoDetails.videoSeries.slug 
    }
    else {
        return undefined
    }
    return serieLink
}

export function getHeroBackground(data) {
    let heroImage
    
    if(data.featuredImage.node.localFile.childImageSharp) {
        heroImage = data.featuredImage.node.localFile.childImageSharp.fluid.src
    }
    else if(data.videoDetails.videoSeries.serieGraphics.poster) {
        heroImage = data.videoDetails.videoSeries.serieGraphics.poster.localFile.childImageSharp.fluid.src
    }
    return heroImage
}

export function getDate(input, len, locale, format) {
     const date = input.match(new RegExp('.{1,' + len + '}(?=(.{' + len + '})+(?!.))|.{1,' + len + '}$', 'g'))
     const formattedDate = DateTime.fromObject({year: date[0]+date[1], month: date[2], day: date[3] }).setLocale(locale).toFormat(format)
     return formattedDate
}

export function ShowCurrentYear() {
    return (
      <div>
          {new Date().getFullYear()}
      </div>
    )
}