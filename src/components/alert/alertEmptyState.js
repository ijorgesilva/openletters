import { faSadTear } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Alert, Jumbotron } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function AlertEmptyState ( { mode, className, title, content, layout } ) {
    
    const { t } = useTranslation()

    switch(layout){
        case 'jumbotron': {
            return(
                <Jumbotron className={`emptyState ${className ? className : ''}`}
                style= {{
                    margin: '3rem',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                    alignItems: 'center',
                }}
                >
                    <FontAwesomeIcon 
                        icon      = {faSadTear} 
                        size      = 'xl'
                        className = {`noRecords text-muted mb-1`}
                        style     = {{fontSize: '4rem'}}
                    />
                    <h4 className='text-muted'>{title ? title : t('global.no-records')}</h4>
                    <p>
                        {content ? content : ''}
                    </p>
                </Jumbotron>
            )
        }

        default: {
            return (
                <Alert 
                    variant={ mode ? mode : 'dark' } 
                    className={`emptyState ${className ? className : ''}`}
                    style= {{
                        margin: '3rem',
                    }}

                >
                    <Alert.Heading>
                        <FontAwesomeIcon 
                            icon      = {faSadTear} 
                            size      = 'xl'
                            className = {`noRecords text-muted mr-1`}
                        />
                        {title ? title : t('global.no-records')}
                    </Alert.Heading>
                    {
                        content ?
                            <div className = 'text-muted'>{content}</div>
                        :
                            <></>
                    }
                </Alert>
            )
        }
    }
}