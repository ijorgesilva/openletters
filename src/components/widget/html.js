
import React from 'react'
import sanitizeHtml from 'sanitize-html'

export default function Html( 
    { 
        code
    } 
) {
    const sanitizedHTML = sanitizeHtml(code,  {
        allowedTags: [  "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
        "h5", "h6", "hgroup",  "nav", "section", "blockquote", "dd", "div",
        "dl", "dt", "figcaption", "figure", "hr", "li", "ol", "p", "pre",
        "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
        "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
        "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
        "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "iframe" ],
        allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'tel' ],
        allowedAttributes: {
            a: [ 'href', 'name', 'target', 'class', 'style' ],
            img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'class', 'style'  ],
            div: [ 'class', 'style' ], p: [ 'class', 'style' ],
            ul: [ 'class', 'style' ], li: [ 'class', 'style' ],
            table: [ 'class', 'style' ],
            h1: [ 'class', 'style' ], h2: [ 'class', 'style' ], h3: [ 'class', 'style' ], h4: [ 'class', 'style' ], h5: [ 'class', 'style' ], h6: [ 'class', 'style' ],
            iframe: [ 'scrolling', 'frameborder', 'id', 'title', 'style', 'src', 'width', 'sandbox', 'allowfullscreen', 'allow', 'height', 'loading', 'referrerpolicy']
        },
        selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta', 'iframe' ],
        allowProtocolRelative: true,
    })
    return (
        <div className = 'html' dangerouslySetInnerHTML={{__html: sanitizedHTML}}></div>
    )
}