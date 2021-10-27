import { Link } from "gatsby"
import React from "react"
import { Dropdown } from "react-bootstrap"

import "./dropdownMenu.scss"

export default function DropdownMenu( { className, title, data, as, mode } ){
    return (
        <Dropdown className={`dropdownmenu ${ ( mode ) ? mode : 'light' }${ className ? className : '' }`}>
            <Dropdown.Toggle variant="transparent">
                {title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    data.map((menu, index) => (
                        (menu.name && menu.link) ?
                            <Dropdown.Item 
                                key     = {index} 
                                as      = { (as === "link") ? Link : undefined } 
                                to      = {menu.link} href={menu.link}
                                target  = {menu.target}
                            >
                                {menu.name}
                            </Dropdown.Item>
                        :   
                            (
                                menu.divider === true ? 
                                    <div key={index} className="dropdown-divider"></div>
                                : 
                                    (
                                        (menu.content || menu.title) ?
                                            <div key={index}>
                                                <h6 className={"text-center"}>
                                                    {menu.title}
                                                </h6> 
                                                <p>
                                                    {menu.content}
                                                </p>
                                            </div>
                                        : 
                                            undefined
                                    )
                            )
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}