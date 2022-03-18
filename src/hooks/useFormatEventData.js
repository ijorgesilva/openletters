import { DateTime } from 'luxon'

import config from '../../data/SiteConfig'
import { getDate } from '../components/utils/utils'

export const useFormatEventData = ( dates, locale, format ) => {
    
    let dateLocale = locale ? locale : config.dateLocale
    let dateFormat = format ? format : config.dateFormat

    let today = new Date()
    
    let datesObject = []

    if ( dates.length > 0 ) {
        dates.map( _ => {
            datesObject.push(
                {
                    eventDateObject: DateTime.fromISO(_.eventDate),
                    eventDateYYMMDD: _.eventDate,
                    eventDate: getDate( _.eventDate, 2, dateLocale, dateFormat ),
                    eventTime: _.eventTime,
                }
            )
        })
    }

    let eventData = {
        expired: DateTime.fromJSDate(today) > datesObject[0].eventDateObject ? true : false,
        dates: datesObject,
    } 

    return eventData
}