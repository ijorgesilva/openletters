import React from 'react'

export default function FooterSimple( { text, links } ) {
    return (
        <footer className="c-footer z-index-2">
            <div className="c-container  z-index-1 position-relative">
                <div className="c-footer__logo"></div>
                <div className="c-footer__copyright">
                    {text}
                    {
                        links.map( ( link, index ) => (
                            <span key = { index }>&nbsp; <a href={link.link} className="c-footer__copyright--link">{link.linkText}</a></span>
                        ))
                    }
                </div>
            </div>
            <div className="c-footer__background z-index-0"></div>
        </footer>
    )
}