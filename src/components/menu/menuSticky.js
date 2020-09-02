import React from "react"

import "./menuSticky.scss"

export default function MenuSticky(props){
    return (

        <section id={props.id} className="c-fmenu sticky-top p-0 d-none d-sm-block" id="sticky-menu-lead">
            <div className="container-lg">
                <div className="c-fmenu__list navbar">
                    <nav className="navbar navbar-expand-sm h-scroll-horizontal" id="menulead">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarLead" aria-controls="navbarLead" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse c-fmenu__items" id="navbarLead">
                            <ul className="navbar-nav">
                                {props.menuLinks.map((menuLink, index) => (
                                    <li key={index}><a className="nav-item nav-link" href={menuLink.link}>{menuLink.linkText}</a></li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                    <div className="c-fmenu__cta">
                        <a className="btn btn--animation btn--three" href={props.link}>{props.linkText}</a>
                    </div>
                </div>
            </div>
        </section>
    )
}