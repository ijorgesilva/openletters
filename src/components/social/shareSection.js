import React from 'react'

import {FacebookShareButton, TwitterShareButton} from 'react-share'

import iconFacebook from "../../assets/img/global/icon_social_share_facebook_white.svg"
import iconTwitter from "../../assets/img/global/icon_social_share_twitter_white.svg"

export default function ShareSection(props) {
    return (

        <section className="c-share">
            <div className="c-share__grid">
                <div className="c-share__content h-background-one">
                    <h2 className="display-4 font-italic text-uppercase text-break text-white z-index-2">
                        {props.title}
                    </h2>
                    <h4 className="h-white-outline h-white-outline-over-one user-select-none text-uppercase z-index-2">
                        {props.subtitle}
                    </h4>
                    <div className="c-share__buttons z-index-2">

                        <FacebookShareButton className="c-form__social c-form__social--white user-select-none"
                         quote="" hashtag="" url="https://victoryatl.com" >
                            <img src={iconTwitter} alt="Share on Twitter"/>
                        </FacebookShareButton>

                        <TwitterShareButton className="c-form__social c-form__social--white user-select-none"
                            url="https://victoryatl.com" title="">
                            <img src={iconFacebook} alt="Share on Facebook"/>
                        </TwitterShareButton>

                    </div>
                    <div className="c-share__cbackground d-none d-sm-block z-index-1"></div>
                </div>
                <div className="c-share__image"></div>
            </div>
        </section>
    )
}