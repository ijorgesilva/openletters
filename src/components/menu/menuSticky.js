import React from "react"

import "./menuSticky.scss"

export default function MenuSticky( {id, menuLinks, link, linkText, className } ){

    return (
        <section id={id} className={`menuSticky c-fmenu sticky-top p-0 d-none d-sm-block ${className}`}>
            <div className="container-lg">
                <div className="items navbar">
                    <nav className="navbar navbar-expand-sm h-scroll-horizontal" id="menulead">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarLead" aria-controls="navbarLead" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse c-fmenu__items" id="navbarLead">
                            <ul className="navbar-nav">
                                {menuLinks.map((menuLink, index) => (
                                    <li key={index}><a className="nav-item nav-link" href={menuLink.link}>{menuLink.linkText}</a></li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                    <div className="cta">
                        <a className="button button--animation button--three" href={link} activeClassName="active">{linkText}</a>
                    </div>
                </div>
            </div>
        </section>
    )

}