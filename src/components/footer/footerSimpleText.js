import React from 'react'

import "./footerSimpleText.scss"

export default function FooterSimpleText(props) {
    return (
        <footer className="c-footer z-index-2">
            <div className="c-container  z-index-1 position-relative">
                <div className="c-footer__copyright">
                    {props.text}
                    {
                        props.links.map( (link, index) => (
                            <span key={index}>&nbsp; <a href={link.link} className="c-footer__copyright--link">{link.linkText}</a></span>
                        ))
                    }
                </div>
            </div>
            <div className="c-footer__background z-index-0"></div>
        </footer>
    )
}