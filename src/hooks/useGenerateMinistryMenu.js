import { orderBy } from 'lodash'
import { useTranslation } from 'react-i18next'

import config from '../../data/SiteConfig'

export const useGenerateMinistryMenu = ( breadcrumbs, pages, customPages ) => {

    const { t } = useTranslation()
    let tempMenu
    let ministryMenu = []

    if( pages.ministryPageGroups?.active ) {
        tempMenu = pages.ministryPageGroups
        ministryMenu.push( {
                name: tempMenu.menuTitle || t('global:global.groups.title'),
                weight: tempMenu.menuWeight || 4,
                link: `${breadcrumbs.rootApp}/${breadcrumbs.slug}/${config.groupsSlug}`, 
                as: 'Link', 
        } )
    }
    if( pages.ministryPageVolunteering?.active ) {
        tempMenu = pages.ministryPageVolunteering
        ministryMenu.push( {
                name: tempMenu.menuTitle || t('global:global.volunteering.serve'),
                weight: tempMenu.menuWeight || 5,
                link: `${breadcrumbs.rootApp}/${breadcrumbs.slug}/${config.volunteeringSlug}`, 
                as: 'Link', 
        } )
    }
    if( pages.ministryPageCourses?.active ) {
        tempMenu = pages.ministryPageCourses
        ministryMenu.push( {
                name: tempMenu.menuTitle || t('global:global.courses.title'),
                weight: tempMenu.menuWeight || 1,
                link: `${breadcrumbs.rootApp}/${breadcrumbs.slug}/${config.coursesSlug}`, 
                as: 'Link', 
        } )
    }
    if( pages.ministryPageEvents?.active ) {
        tempMenu = pages.ministryPageEvents
        ministryMenu.push( {
                name: tempMenu.menuTitle || t('global:global.events.title'),
                weight: tempMenu.menuWeight || 3,
                link: `${breadcrumbs.rootApp}/${breadcrumbs.slug}/${config.eventPostDetailsSlug}`, 
                as: 'Link', 
        } )
    }
    if( pages.ministryPageBlogNews?.active ) {
        tempMenu = pages.ministryPageBlogNews
        ministryMenu.push( {
                name: tempMenu.menuTitle || t('global:global.blog.blog-and-news-title'),
                weight: tempMenu.menuWeight || 0,
                link: `${breadcrumbs.rootApp}/${breadcrumbs.slug}/${config.blogPostDetailsSlug}`, 
                as: 'Link', 
        } )
    }
    if( pages.ministryPageVideos?.active ) {
        tempMenu = pages.ministryPageVideos
        ministryMenu.push( {
                name: tempMenu.menuTitle || t('global:global.watch.videos'),
                weight: tempMenu.menuWeight || 6,
                link: `${breadcrumbs.rootApp}/${breadcrumbs.slug}/${config.watchSlug}`, 
                as: 'Link', 
        } )
    }
    customPages?.map( _ => {
        switch( _.menuType ) {
            case 'link': {
                if (_.menuLink.menuItemType === 'internal'){
                    ministryMenu.push( {
                        name: _.menuTitle,
                        weight: _.menuWeight || 50,
                        link: _.menuLink.menuItemUrl, 
                        className: _.menuLink.menuItemCss,
                        removeDefaultCss: _.menuLink.menuItemRemoveCss ? true : false,
                        as: 'Link', 
                    } )
                }
                if (_.menuLink.menuItemType === 'external'){
                    ministryMenu.push( {
                        name: _.menuTitle,
                        weight: _.menuWeight || 50,
                        link: _.menuLink.menuItemUrl, 
                        className: _.menuLink.menuItemCss,
                        removeDefaultCss: _.menuLink.menuItemRemoveCss ? true : false,
                        target: '_blank',
                        as: 'a', 
                    } )
                }
                break
            }
            case 'page':
            default: {
                ministryMenu.push( {
                    name: _.menuTitle,
                    weight: _.menuWeight || 50,
                    link: `${breadcrumbs.rootApp}/${breadcrumbs.slug}/${ _.menuTitle.replace(/[^\w\s]/gi, '').replace(/ /g,"_").toLowerCase() }`, 
                    as: 'Link', 
                } )
                break
            }
        }
    })
    
    return orderBy(ministryMenu, ['weight'], ['asc'])

}