import React from 'react'
import { Dropdown } from 'react-bootstrap'

export default function MediaProvider ( 
    {
        type, 
        items,
        key,
    } 
) {
    
    switch ( type ) {
        case 'amazon':
            return (
                <a href = { items.availableonAmazon } target = { '_blank' } rel = { 'noreferrer' } >
                    Amazon
                </a>
            )
        break

        case 'apple':
            return (
                <a href = { items.availableonApple } target = { '_blank' } rel = { 'noreferrer' } >
                    Apple Music
                </a>
            )
        break

        case 'deezer':
            return (
                <a href = { items.availableonDeezer } target = { '_blank' } rel = { 'noreferrer' } >
                    Deezer
                </a>
            )
        break

        case 'pandora':
            return (
                <a href = { items.availableonPandora } target = { '_blank' } rel = { 'noreferrer' } >
                    Pandora
                </a>
            )
        break

        case 'spotify':
            return (
                <a href = { items.availableonSpotify } target = { '_blank' } rel = { 'noreferrer' } >
                    Spotify
                </a>
            )
        break

        case 'tidal':
            return (
                <a href = { items.availableonTidal } target = { '_blank' } rel = { 'noreferrer' } >
                    Tidal
                </a>
            )
        break

        default:
            return undefined
        break
    }
}