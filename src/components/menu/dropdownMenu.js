import React from "react"
import { Dropdown } from "react-bootstrap"
import { Link } from "gatsby"

import "./dropdownMenu.scss"

export default function DropdownMenu(props){
    return (
        <Dropdown className={`dropdownmenu ${props.className}`}>
            <Dropdown.Toggle variant="transparent">
                {props.title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    props.data.map((menu, index) => (
                        (menu.name && menu.link) ?
                            <Dropdown.Item key={index} as={ (props.as === "link") ? Link : undefined } to={menu.link} href={menu.link}>{menu.name}</Dropdown.Item>
                        : (
                            menu.divider === true ? 
                                <div key={index} class="dropdown-divider"></div>
                            : (
                                (menu.content || menu.title) ?
                                    <div key={index}><h6 className={"text-center"}>{menu.title}</h6> <p>{menu.content}</p></div>
                                : <></>
                            )
                        )
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}