import React from "react"
import { Dropdown } from "react-bootstrap"

import { faYoutube, faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MailchimpSubscribe from "react-mailchimp-subscribe"

import AppLinks from "../widget/appLinks"

import "./followDropdown.scss"
 
export default function FollowDropdown ( { instagramUrl, facebookUrl, twitterUrl, youtubeUrl, appStoreUrl, playStoreUrl, mailchimpUrl } ) {

    return (
        <Dropdown className={`followdropdown`}>
            <Dropdown.Toggle variant="transparent">
                Follow us
            </Dropdown.Toggle>
        
            <Dropdown.Menu>

                {
                    ( instagramUrl || facebookUrl || twitterUrl || youtubeUrl ) ?
                        <>
                            <div className={`socialicons`}>
                                {
                                    ( instagramUrl ) ?
                                        <a href={instagramUrl} title="Instagram" aria-label="Instagram" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                                        </a>
                                    :
                                        undefined
                                }
                                {

                                    ( facebookUrl ) ?
                                        <a href={facebookUrl} title="Facebook" aria-label="Facebook" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                                        </a>
                                    :
                                        undefined
                                }
                                {
                                    ( twitterUrl ) ?
                                        <a href={twitterUrl} title="Twitter" aria-label="Twitter" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                                        </a>
                                    :
                                        undefined
                                }
                                {
                                    ( youtubeUrl ) ?
                                        <a href={youtubeUrl} title="Youtube" aria-label="Youtube" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faYoutube} size="lg" />
                                        </a>
                                    :
                                        undefined

                                }
                            </div>

                            <Dropdown.Divider />
                        </>
                    :
                        undefined
                }

                {
                    ( mailchimpUrl ) ?
                        <MailchimpSubscribe
                            url={ mailchimpUrl }
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
                    :
                        undefined
                }

                {
                    ( appStoreUrl || playStoreUrl ) ?
                        <>
                            <Dropdown.Divider />
                            <AppLinks 
                                appStoreUrl     = { ( appStoreUrl ) ? appStoreUrl : undefined }
                                playStoreUrl    = { ( playStoreUrl ) ? playStoreUrl : undefined }
                            />
                        </>
                    :
                        undefined
                }

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