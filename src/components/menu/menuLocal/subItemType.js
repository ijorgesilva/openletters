import React from 'react'

import Html from '../../widget/html'
import Apps from '../widgets/apps'
import Newsletter from '../widgets/newsletter'
import Social from '../widgets/social'

import SubMenu from './subMenu'

export default function SubItemType( 
    { 
        item, 
        mode 
    } 
){
    switch (item.type) {

        case 'header' : {
            return (
                <h6 dangerouslySetInnerHTML={{__html: item.name}}></h6>
            )
        }

        case 'customSub' : {
            return (
                <SubMenu item={item}></SubMenu>
            )
        }

        case 'watchSub' : {
            return (
                <SubMenu item={item}></SubMenu>
            )
        }

        case 'blogSub' : {
            return (
                <SubMenu item={item}></SubMenu>
            )
        }

        case 'newsSub' : {
            return (
                <SubMenu item={item}></SubMenu>
            )
        }

        case 'eventsSub' : {
            return (
                <SubMenu item={item}></SubMenu>
            )
        }

        case 'divider' : {
            return (
                <hr className = { item.class } />
            )
        }

        case 'html' : {
            return (
                <Html code = { item.code } className = { item.class } />
            )
        }

        case 'social-links' : {
            return (
                <Social
                    className = { item.class }
                    items = {item.items}
                    mode    = { mode }
                />
            )
        }

        case 'app-links' : {
            return (
                <Apps
                    className = { item.class }
                    items = {item.items}
                    mode    = { mode }
                />
            )
        }

        case 'newsletter' : {
            return (
                <Newsletter 
                    name        = { item.name }
                    description = { item.description }
                    className   = { item.class }
                    items       = { item.items }
                    mode        = { mode }
                />
            )
        }

        default:{
            return <></>
        }

    }
    
}