import React from 'react'

export default function SectionPhotoText(props) {
    return (

        <section id={props.id} class="c-about">
            <div class="c-about__grid">
                <div class="c-about__photo"></div>
                <div class="c-about__content user-select-none">
                    <h3 class="h-color-four" dangerouslySetInnerHTML={{__html: props.title}}></h3>
                    <p class="mt-4 h-color-six-shade-three">
                        {props.children}
                    </p>
                </div>
            </div>
        </section>

    )
}