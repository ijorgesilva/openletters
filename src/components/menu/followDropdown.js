import React from "react"
import { Dropdown } from "react-bootstrap"

import { faYoutube, faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MailchimpSubscribe from "react-mailchimp-subscribe"

import AppLinks from "../widget/appLinks"

import "./followDropdown.scss"
 
export default function FollowDropdown (props){

    return (
        <Dropdown className={`followdropdown`}>
            <Dropdown.Toggle variant="transparent">
                Follow us
            </Dropdown.Toggle>
        
            <Dropdown.Menu>

                <div className={`socialicons`}>
                    <a href="https://www.instagram.com/victoryatl/" title="Instagram" aria-label="Instagram" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                    <a href="https://www.facebook.com/victoryatl/" title="Facebook" aria-label="Facebook" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                    <a href="https://www.twitter.com/victoryatl/" title="Twitter" aria-label="Twitter" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                    <a href="https://www.youtube.com/channel/UCNeMhrj2GTacigCwMLIPAyA" title="Youtube" aria-label="Youtube" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faYoutube} size="lg" />
                    </a>
                </div>
                <Dropdown.Divider />

                <MailchimpSubscribe
                    url={props.mailchimpUrl}
                    render={({ subscribe, status, message }) => (
                    <div>
                        <CustomForm
                            status={status}
                            message={message}
                            onValidated={formData => subscribe(formData)}
                        />
                    </div>
                    )}
                />

                <Dropdown.Divider />
                <AppLinks 
                    className={'applinks'} 
                    appStoreUrl={"https://itunes.apple.com/us/app/victory-world-church/id921775740?mt=8"}
                    playStoreUrl={"https://play.google.com/store/apps/details?id=com.subsplash.thechurchapp.s_86PZ97"}
                />

            </Dropdown.Menu>
        </Dropdown>
    )
}


const CustomForm = ({status, message, onValidated }) => {
    let email
    // let name
    const submit = () =>
      email &&
    //   name &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
        // NAME: name.value
      });
  
    return (
        <>
            <Dropdown.Header className={"text-center"}>Subscribe to Victory</Dropdown.Header>
            <p className={"text-center"}>Sign up to receive our weekly eNews and updates about what's next at Victory.</p>
            <div className='mailchimp'>
                
                {status === "sending" && <div className="h-color-one-shade-two mb-2">sending...</div>}
                {status === "error" && ( <div className={"h-color-three-shade-three mb-2"} dangerouslySetInnerHTML={{ __html: message }} /> )}
                {status === "success" && ( <div className={"h-color-one-dark-shade-two mb-2"} dangerouslySetInnerHTML={{ __html: message }} /> )}
                <div class="form-group">
                    {/* <input className="form-control mb-2" ref={node => (name = node)} type="text" placeholder="Your name" /> */}
                    <input className="form-control" ref={node => (email = node)} type="email" placeholder="Your email" />
                </div>
                <span className="input-group-btn text-right">
                    <button className="btn btn-sm btn--animation btn--dark-outline" onClick={submit}>
                        Submit
                    </button>
                </span>
        </div>
      </>
    );
  };