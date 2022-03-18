import React from 'react'
import { useTranslation } from 'react-i18next'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

import './newsletter.scss'

export default function NewsletterItem ( 
    { 
        type, 
        link, 
        name,
        description,
        className 
    } 
){

    switch( type ) {
        case 'mailchimp': {
            return (
                <>
                    {
                        link ?
                            <MailchimpSubscribe
                                url={ link }
                                render={({ subscribe, status, message }) => (
                                <div>
                                    <CustomForm
                                        name        = { name }
                                        description = { description }
                                        status      = { status }
                                        message     = { message }
                                        onValidated = { formData => subscribe(formData) }
                                        className   = { className ? className : ''}
                                    />
                                </div>
                                )}
                            />
                        :
                            undefined
                    }
                </>
            )
        }
        case 'default': {
            return <></>
        }
    }
}

const CustomForm = ({status, message, onValidated, name, description }) => {
    let email
    const submit = () =>
      email &&
      email.value.indexOf('@') > -1 &&
      onValidated({
        EMAIL: email.value,
        // NAME: name.value
      });
  
    const { t } = useTranslation()

    return (
        <>
            <h3 className={'text-center'}>
                {
                    name ? name : t('global.newsletter.subscribe')
                }
            </h3>
            <p className={'text-center'}>
                {
                    description ? description : t('global.newsletter.description')
                }
            </p>
            <div className='mailchimp'>

                {status === 'sending' && <div className='fade alert alert-info show mb-2'>{t('global.forms.sending')}</div>}
                {status === 'error'   && ( <div className='fade alert alert-danger show mb-2' dangerouslySetInnerHTML={{ __html: message }} /> )}
                {status === 'success' && ( <div className='fade alert alert-success show mb-2' dangerouslySetInnerHTML={{ __html: message }} /> )}

                <div className='form-group'>
                    {/* <input className='form-control mb-2' ref={node => (name = node)} type='text' placeholder={t('global.newsletter.your-name')} /> */}
                    <input className='form-control' ref={node => (email = node)} type='email' placeholder={t('global.newsletter.your-email')} />
                </div>
                
                <span className='input-group-btn text-right'>
                    <button className='btn btn-outline-primary btn-block mt-1' onClick={submit}>
                        {t('global.forms.submit')}
                    </button>
                </span>

            </div>
      </>
    )
  }