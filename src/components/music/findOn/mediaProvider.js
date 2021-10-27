import React from 'react'

export default function MediaProvider ( 
    {
        type, 
        items,
    } 
) {
    
    switch ( type ) {
        case 'amazon':{
            return (
                <a href = { items.availableonAmazon } target = { '_blank' } rel = { 'noreferrer' } >
                    Amazon
                </a>
            )
        }

        case 'apple':{
            return (
                <a href = { items.availableonApple } target = { '_blank' } rel = { 'noreferrer' } >
                    Apple Music
                </a>
            )
        }

        case 'deezer':{
            return (
                <a href = { items.availableonDeezer } target = { '_blank' } rel = { 'noreferrer' } >
                    Deezer
                </a>
            )
        }

        case 'pandora':{
            return (
                <a href = { items.availableonPandora } target = { '_blank' } rel = { 'noreferrer' } >
                    Pandora
                </a>
            )
        }

        case 'spotify':{
            return (
                <a href = { items.availableonSpotify } target = { '_blank' } rel = { 'noreferrer' } >
                    Spotify
                </a>
            )
        }

        case 'tidal':{
            return (
                <a href = { items.availableonTidal } target = { '_blank' } rel = { 'noreferrer' } >
                    Tidal
                </a>
            )
        }

        default:{
            return undefined
        }
    }
}