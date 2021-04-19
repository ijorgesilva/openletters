import React, { useContext } from 'react'
import ContextConsumer from '../src/provider/context'



export const watchBrand =  {name: "Watch", link: `/watch`, as: "link"}
export const watchMenu = [
    {name: "Messages List", link: "/watch/messages/list", as: "link", target: ""},
    {name: "Series List", link: "/watch/series/list", as: "link", target: ""},
]

/*
 * Watch Menu
 */
export const watchDetailsBrand = {name: "Watch", link: `/watch`}
export const watchDetailsMenu = [
    // {name: "News", link: "/news", as: "", target: ""},
]


/*
 * Main Menu
 */
export const menuLocal = [
    
    {name: "About", link: "#", megamenu: true,
        submenu: [
            {name: "About us", link:"#", header: true,
                submenu: [
                    {name: "New Here?", link:"https://victoryatl.com/im-new/"},
                    {name: "Times + Location", link:"https://victoryatl.com/times-directions/"},
                    {name: "Pastors + Staff", link:"https://victoryatl.com/staff/"},
                    {name: "Campuses", link:"https://www.victoryatlanta.com/"},
                    {name: "Contact Us", link:"https://victoryatl.com/contact-us/"},
                    {name: "Statement of Faith", link:"https://victoryatl.com/statement-of-faith/"},
                    {name: "Store", link:"https://vwcstore.com/"},
                    {name: "Privacy Policy", link:"https://victoryatl.com/privacypolicy/"},
                    {name: "SMS Terms and conditions", link:"https://victoryatl.com/smspolicy/"},
                ]
            },
            {name: "Connect", link:"#", header: true,
                submenu: [
                    {name: "My.Victory", link: "https://my.victoryatl.com/"},
                    {name: "Small Groups", link: "/smallgroups/", as: "link"},
                    {name: "Serve", link: "https://victoryatl.com/serve/"},
                    {name: "Events", link: "https://victoryatl.com/events/", as: 'link'},
                    {name: "Download App", link: "https://victoryatl.com/app/"},
                    {name: "Subscribe", link: "https://victoryatl.com/newsletter/"}
                ]
            }
        ]
    },

    {name: "Watch", link: '/watch'},

    {name: "Grow", link:"", megamenu: true,
        submenu: [
            {name: "Classes", link:"#", header: true,
                submenu: [
                    {name: "About Classes", link: "https://victoryatl.com/classes/"},
                    {name: "Forward – Now Online", link: "https://victoryatl.com/forward/"},
                    {name: "Membership", link: "https://victoryatl.com/membership/"},
                    {name: "Marriage", link: "https://victoryatl.com/marriage/"},
                    {name: "Money + Work", link: "https://victoryatl.com/moneyandwork/"},
                    {name: "Online Learning", link: "https://learn.victoryatl.com/", target: "_blank"},
                    {name: "Victory at Home", link: "https://victoryatl.com/raisingdisciples/"},
                ]
            },
            {name: "Ministries", link:"#", header: true,
                submenu: [
                    {name: "Children", link: "https://victoryatl.com/vickids/"},
                    {name: "Special Needs", link: "https://victoryatl.com/specialneeds/"},
                    {name: "Middle School", link: "https://victoryatl.com/thecity/"},
                    {name: "High School", link: "https://victoryatl.com/thecapitol/"},
                    {name: "Young Adults", link: "https://victoryatl.com/fusion/"},
                    {name: "Women", link: "https://victoryatl.com/true/"},
                    {name: "Men", link: "https://victoryatl.com/menunited/"},
                    {name: "Small Groups", link: "https://victoryatl.com/smallgroups/", as: "Link"},
                    {name: "Adults (50+)", link: "https://victoryatl.com/050-2/"},
                    {name: "Vida", link: "https://victoryatl.com/victoryvida/"},
                    {name: "Missions", link: "https://victoryatl.com/missions/"},
                    {name: "Community Transformation", link: "https://victoryatl.com/localoutreaches/"},
                ]
            },
            {name: "Small Groups", link:"#", header: true,
                submenu: [
                    {name: "About Groups", link: "/smallgroups/"},
                    {name: "Find a Group", link: "https://victoryatl.com/default.aspx?page=4364"},
                    {name: "Host a Group", link: "/smallgroups/host"},
                    {name: "Leader Login", link: "https://my.victoryatl.com/default.aspx?page=4236", target: "_blank"},
                ]
            },
            {name: "Resources", link:"#", header: true,
                submenu: [
                    {name: "Discipleship Path", link: "https://victoryatl.com/nextsteps/"},
                    {name: "New Believers", link: "https://victoryatl.com/newfaith/"},
                    {name: "10 Qualities of a Disciple", link: "https://victoryatl.com/10qualities/"},
                    {name: "Water Baptism", link: "https://victoryatl.com/baptism/"},
                    {name: "Holy Spirit", link: "https://victoryatl.com/holyspirit/"},
                    {name: "Corporate Prayer", link: "https://victoryatl.com/corporateprayer/"},
                    {name: "Victory at Home", link: "https://victoryatl.com/victoryathome/"},
                    {name: "Lead Well", link: "https://www.leadwellpeople.com/", target: "_blank"},
                ]
            },
        ]
    },

    {name: "Need Prayer?", link: "#", class: "mobileonly",
        submenu: [
            {name: "Need Prayer?", link: "https://victoryatl.com/prayer"},
            {name: "Healed Sessions", link: "https://victoryatl.com/healed/"},
            {name: "Care / Financial", link: "https://victoryatl.com/care"},
            {name: "Say Something", link: "https://victoryatl.com/saysomething"},
        ]
    },

    {name: "Give", link: "https://victoryatl.com/give", class: "mobileonly"},

    {name: "Connect", link: "https://www.connecttovictory.com/", type:"button", target:"_blank"}
]

export const menuHelp = [
    {name: "Need Prayer?", link: "https://victoryatl.com/prayer"},
    {name: "Healed Sessions", link: "https://victoryatl.com/healed/"},
    {name: "Care / Financial", link: "https://victoryatl.com/care"},
    {name: "Say Something", link: "https://victoryatl.com/saysomething"},
    {divider: true},
    {name: "How to Help?", link: "https://victoryatl.com/howtohelp"},
]

export const menuGive = [
    {name: "Norcross", link: "https://pushpay.com/g/victorynorcross?utm_source=pushpay&utm_medium=email&utm_content=link6&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
    {name: "Hamilton Mill", link: "https://pushpay.com/g/victoryhamiltonmill?utm_source=pushpay&utm_medium=email&utm_content=link4&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
    {name: "Midtown", link: "https://pushpay.com/g/victorymidtown?utm_source=pushpay&utm_medium=email&utm_content=link5&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
    {name: "Online", link: "https://pushpay.com/g/victoryonline?utm_source=pushpay&utm_medium=email&utm_content=link7&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
    {divider: true},
    {title: "Mail your gift?", content: "5905 Brook Hollow Parkway, Norcross GA 30071 | Specify campus / designation in the memo portion of the check."},
    {divider: true},
    {name: "View all options", link: "https://victoryatl.com/give"}
]

export const footerLinks = [
    {
        link: "#", 
        linkText:"Privacy Policy"
    }
]


/*
 * Section Menues
 */
export const blogMenuBrand = {name: "Blog", link: "/blog"}
export const blogMenu = [
    {name: "News", link: "/news", as: "", target: ""},
]

export const smallGroupBrand =  {name: "Small Groups", link: "/smallgroups"}
export const smallGroupMenu = [
    {name: "Join", link: "/smallgroups", as: "", target: ""},
    {name: "Host", link: "/smallgroups/host", as: "", target: ""},
    {name: "Events", link: "/smallgroups/events", as: "", target: ""},
    {name: "Blog & News", link: "/smallgroups/blog", as: "", target: ""},
    {name: "Leader Login", link: "https://my.victoryatl.com/default.aspx?page=4236", as: "", target: "_blank"},
]

export const eventsBrand =  {name: "Events", link: "/events", as: "link"}
export const eventsMenu = [
    // {name: "Events", link: "/events", as: "", target: ""},
]


