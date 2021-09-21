
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'react-bootstrap'
import { faYoutube, faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MailchimpSubscribe from "react-mailchimp-subscribe"


import AppLinks from "../widget/appLinks"


import "./followDropdown.scss"
 
export default function FollowDropdown ( { instagramUrl, facebookUrl, twitterUrl, youtubeUrl, appStoreUrl, playStoreUrl, mailchimpUrl, mode } ) {

    
    const { t } = useTranslation()

    return (
        <Dropdown className={`followdropdown ${ ( mode ) ? mode : 'light'}`}>

            <Dropdown.Toggle variant="transparent">
                {t('components.social.follow-us')}
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
    const submit = () =>
      email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
        // NAME: name.value
      });
  
    
    const { t } = useTranslation()

    return (
        <>
            <Dropdown.Header className={"text-center"}>{t('global.newsletter.subscribe')}</Dropdown.Header>
            <p className={"text-center"}>{t('global.newsletter.description')}</p>
            <div className='mailchimp'>

                {status === "sending" && <div className="fade alert alert-info show mb-2">{t('global.forms.sending')}</div>}
                {status === "error"   && ( <div className="fade alert alert-danger show mb-2" dangerouslySetInnerHTML={{ __html: message }} /> )}
                {status === "success" && ( <div className="fade alert alert-success show mb-2" dangerouslySetInnerHTML={{ __html: message }} /> )}

                <div className="form-group">
                    {/* <input className="form-control mb-2" ref={node => (name = node)} type="text" placeholder={t('global.newsletter.your-name')} /> */}
                    <input className="form-control" ref={node => (email = node)} type="email" placeholder={t('global.newsletter.your-email')} />
                </div>
                
                <span className="input-group-btn text-right">
                    <button className="btn btn-outline-primary btn-block mt-3" onClick={submit}>
                        {t('global.forms.submit')}
                    </button>
                </span>

            </div>
      </>
    );
  };