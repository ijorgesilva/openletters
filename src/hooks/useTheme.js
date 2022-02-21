import convert from 'color-convert'
import { useStaticQuery, graphql } from 'gatsby'

export const useTheme = () => { 

    const { wp } = useStaticQuery(
        graphql`                                
            {
                wp {
                    websiteSettings {
                        websiteSettings {

                            settingsStyles {

                                settingsStylesGraphics {
                                    settingsStylesGraphicsLogo {
                                        localFile {
                                            publicURL
                                        }
                                    }
                                    settingsStylesGraphicsFavicon{
                                        localFile {
                                            publicURL
                                        }
                                    }
                                }

                                settingsStylesColors {

                                    settingsStylesColorsPrimary
                                    settingsStylesColorsSecondary

                                    settingsStylesColorsThird
                                    settingsStylesColorsFourth
                                    settingsStylesColorsFifth
                                    settingsStylesColorsSixth

                                    settingsStylesColorsLight
                                    settingsStylesColorsDark

                                    settingsStylesColorsBackground

                                    settingsStylesColorsSuccess
                                    settingsStylesColorsInfo
                                    settingsStylesColorsWarning
                                    settingsStylesColorsDanger
                                    settingsStylesColorsLight
                                }
                                settingsStylesLayout {
                                    settingsStylesLayoutSpacer {
                                        settingsStylesLayoutSpacerValue
                                        settingsStylesLayoutSpacerUnit
                                    }
                                    settingsStylesLayoutWidth {
                                        settingsStylesLayoutWidthSm
                                        settingsStylesLayoutWidthMd
                                        settingsStylesLayoutWidthLg
                                        settingsStylesLayoutWidthXl
                                    }
                                }
                                settingsStylesFooter {
                                    settingsStylesFooterColor
                                }
                                settingsStylesHeader {
                                    settingsStylesHeaderColor
                                }
                            }
                        }
                    }
                }
            }
    `)

    const siteStyles    = wp.websiteSettings.websiteSettings.settingsStyles
    const layoutStyles  = siteStyles.settingsStylesLayout
    
    // Variables Map
    const theme = {
        graphics: {},
        colors: {},
        layout: {},
        buttons: {},
        font: {},
        cssVariables: '',
        styles: {
            header: siteStyles.settingsStylesFooter.settingsStylesFooterColor,
            footer: siteStyles.settingsStylesHeader.settingsStylesHeaderColor,
        }
    }

    /* 
    * Graphics
    */
   theme.graphics = {
       logo: siteStyles.settingsStylesGraphics.settingsStylesGraphicsLogo?.localFile.publicURL,
       favicon: siteStyles.settingsStylesGraphics.settingsStylesGraphicsFavicon?.localFile.publicURL
   }

    /* 
    * Colors
    */
    theme.colors = {
    
            'primary': siteStyles.settingsStylesColors.settingsStylesColorsPrimary ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsPrimary.replace('#','')) : [216, 99, 52],
            'secondary': siteStyles.settingsStylesColors.settingsStylesColorsSecondary ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsSecondary.replace('#','')) : [208, 7, 46],

            'third':  siteStyles.settingsStylesColors.settingsStylesColorsThird ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsThird.replace('#','')) : [0, 100, 100],
            'fourth':  siteStyles.settingsStylesColors.settingsStylesColorsFourth ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsFourth.replace('#','')) : [0, 100, 100],
            'fifth':  siteStyles.settingsStylesColors.settingsStylesColorsFifth ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsFifth.replace('#','')) : [0, 100, 100],
            'sixth':  siteStyles.settingsStylesColors.settingsStylesColorsSixth ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsSixth.replace('#','')) : [0, 100, 100],

            'bodyBg': siteStyles.settingsStylesColors.settingsStylesColorsBackground ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsBackground.replace('#','')) : [0, 100, 100],

            'light': siteStyles.settingsStylesColors.settingsStylesColorsLight ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsLight.replace('#','')) : [210, 17, 98],
            'dark': siteStyles.settingsStylesColors.settingsStylesColorsDark ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsDark.replace('#','')) : [210, 10, 23],
        
            'success': siteStyles.settingsStylesColors.settingsStylesColorsSuccess ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsSuccess.replace('#','')) : [134, 61, 41],
            'info': siteStyles.settingsStylesColors.settingsStylesColorsInfo ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsInfo.replace('#','')) : [188, 78, 41],
            'warning': siteStyles.settingsStylesColors.settingsStylesColorsWarning ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsWarning.replace('#','')) : [45, 100, 51],
            'danger': siteStyles.settingsStylesColors.settingsStylesColorsDanger ? convert.hex.hsl(siteStyles.settingsStylesColors.settingsStylesColorsDanger.replace('#','')) : [354, 70, 54],

            'hex': {
                'primary': siteStyles.settingsStylesColors.settingsStylesColorsPrimary ? siteStyles.settingsStylesColors.settingsStylesColorsPrimary : '#0b6cfe',
                'secondary': siteStyles.settingsStylesColors.settingsStylesColorsSecondary ? siteStyles.settingsStylesColors.settingsStylesColorsSecondary : '#6d767e',
    
                'third':  siteStyles.settingsStylesColors.settingsStylesColorsThird ? siteStyles.settingsStylesColors.settingsStylesColorsThird : '#ffffff',
                'fourth':  siteStyles.settingsStylesColors.settingsStylesColorsFourth ? siteStyles.settingsStylesColors.settingsStylesColorsFourth : '#ffffff',
                'fifth':  siteStyles.settingsStylesColors.settingsStylesColorsFifth ? siteStyles.settingsStylesColors.settingsStylesColorsFifth : '#ffffff',
                'sixth':  siteStyles.settingsStylesColors.settingsStylesColorsSixth ? siteStyles.settingsStylesColors.settingsStylesColorsSixth : '#ffffff',
    
                'bodyBg': siteStyles.settingsStylesColors.settingsStylesColorsBackground ? siteStyles.settingsStylesColors.settingsStylesColorsBackground : '#ffffff',
    
                'light': siteStyles.settingsStylesColors.settingsStylesColorsLight ? siteStyles.settingsStylesColors.settingsStylesColorsLight : '#f9fafb',
                'dark': siteStyles.settingsStylesColors.settingsStylesColorsDark ? siteStyles.settingsStylesColors.settingsStylesColorsDark : '#353b41',
            
                'success': siteStyles.settingsStylesColors.settingsStylesColorsSuccess ? siteStyles.settingsStylesColors.settingsStylesColorsSuccess : '#29a847',
                'info': siteStyles.settingsStylesColors.settingsStylesColorsInfo ? siteStyles.settingsStylesColors.settingsStylesColorsInfo : '#17a4ba',
                'warning': siteStyles.settingsStylesColors.settingsStylesColorsWarning ? siteStyles.settingsStylesColors.settingsStylesColorsWarning : '#ffc105',
                'danger': siteStyles.settingsStylesColors.settingsStylesColorsDanger ? siteStyles.settingsStylesColors.settingsStylesColorsDanger : '#dc3848',
            }
            
    }

    /* 
    * Layout
    */
    
    theme.layout = {
        spacer: ( layoutStyles.settingsStylesLayoutSpacer.settingsStylesLayoutSpacerValue ) ? layoutStyles.settingsStylesLayoutSpacer.settingsStylesLayoutSpacerValue+layoutStyles.settingsStylesLayoutSpacer.settingsStylesLayoutSpacerUnit : '1rem',
        width:  {
                    sm: ( layoutStyles.settingsStylesLayoutWidth.settingsStylesLayoutWidthSm ) ? layoutStyles.settingsStylesLayoutWidth.settingsStylesLayoutWidthSm :540,
                    md: ( layoutStyles.settingsStylesLayoutWidth.settingsStylesLayoutWidthMd ) ? layoutStyles.settingsStylesLayoutWidth.settingsStylesLayoutWidthMd :720,
                    lg: ( layoutStyles.settingsStylesLayoutWidth.settingsStylesLayoutWidthLg ) ? layoutStyles.settingsStylesLayoutWidth.settingsStylesLayoutWidthLg :960,
                    xl: ( layoutStyles.settingsStylesLayoutWidth.settingsStylesLayoutWidthXl ) ? layoutStyles.settingsStylesLayoutWidth.settingsStylesLayoutWidthXl :1140
                },
        header: {
                    mode: siteStyles.settingsStylesHeader.settingsStylesHeaderColor,
                    modeColor: ( siteStyles.settingsStylesHeader.settingsStylesHeaderColor === 'light' ) ? 
                                    'hsl('+theme.colors.light[0]+','+theme.colors.light[1]+'% ,'+theme.colors.light[2]+'%)' 
                                :
                                    ( siteStyles.settingsStylesHeader.settingsStylesHeaderColor === 'dark' ) ? 
                                        'hsl('+theme.colors.light[0]+','+theme.colors.light[1]+'% ,'+theme.colors.dark[2]+'%)' 
                                    : 
                                        'hsl('+theme.colors.light[0]+','+theme.colors.light[1]+'% ,'+theme.colors.light[2]+'%)',
                },
        footer: {
                    mode: siteStyles.settingsStylesFooter.settingsStylesFooterColor,
                    modeColor: ( siteStyles.settingsStylesHeader.settingsStylesHeaderColor === 'light' ) ? 
                                    'hsl('+theme.colors.light[0]+','+theme.colors.light[1]+'% ,'+theme.colors.light[2]+'%)' 
                                :
                                    ( siteStyles.settingsStylesHeader.settingsStylesHeaderColor === 'dark' ) ? 
                                        'hsl('+theme.colors.light[0]+','+theme.colors.light[1]+'% ,'+theme.colors.dark[2]+'%)' 
                                    : 
                                        'hsl('+theme.colors.light[0]+','+theme.colors.light[1]+'% ,'+theme.colors.light[2]+'%)',
                }
    }
    
    /* 
    * Buttons
    */


    /* 
    * Header
    */


    /* 
    * Footer
    */

    
    /* 
    * Variables
    */
    theme.cssVariables = `
        :root {

            /*
             * Color Palettes
             */
            --primary: hsl(${theme.colors.primary[0]}, ${theme.colors.primary[1]}%, ${theme.colors.primary[2]}%);
                --primary-h: ${theme.colors.primary[0]};
                --primary-s: ${theme.colors.primary[1]}%;
                --primary-l: ${theme.colors.primary[2]}%;

            --secondary: hsl(${theme.colors.secondary[0]}, ${theme.colors.secondary[1]}%, ${theme.colors.secondary[2]}%);
                --secondary-h: ${theme.colors.secondary[0]};
                --secondary-s: ${theme.colors.secondary[1]}%;
                --secondary-l: ${theme.colors.secondary[2]}%;

            --third: hsl(${theme.colors.third[0]}, ${theme.colors.third[1]}%, ${theme.colors.third[2]}%);
                --third-h: ${theme.colors.third[0]};
                --third-s: ${theme.colors.third[1]}%;
                --third-l: ${theme.colors.third[2]}%;

            --fourth: hsl(${theme.colors.fourth[0]}, ${theme.colors.fourth[1]}%, ${theme.colors.fourth[2]}%);
                --fourth-h: ${theme.colors.fourth[0]};
                --fourth-s: ${theme.colors.fourth[1]}%;
                --fourth-l: ${theme.colors.fourth[2]}%;

            --fifth: hsl(${theme.colors.fifth[0]}, ${theme.colors.fifth[1]}%, ${theme.colors.fifth[2]}%);
                --fifth-h: ${theme.colors.fifth[0]};
                --fifth-s: ${theme.colors.fifth[1]}%;
                --fifth-l: ${theme.colors.fifth[2]}%;

            --sixth: hsl(${theme.colors.sixth[0]}, ${theme.colors.sixth[1]}%, ${theme.colors.sixth[2]}%);
                --sixth-h: ${theme.colors.sixth[0]};
                --sixth-s: ${theme.colors.sixth[1]}%;
                --sixth-l: ${theme.colors.sixth[2]}%;


            --body-bg: hsl(${theme.colors.bodyBg[0]}, ${theme.colors.bodyBg[1]}%, ${theme.colors.bodyBg[2]}%);

            --light: hsl(${theme.colors.light[0]}, ${theme.colors.light[1]}%, ${theme.colors.light[2]}%);
                --light-h: ${theme.colors.light[0]};
                --light-s: ${theme.colors.light[1]}%;
                --light-l: ${theme.colors.light[2]}%;
            --dark: hsl(${theme.colors.dark[0]}, ${theme.colors.dark[1]}%, ${theme.colors.dark[2]}%);
                --dark-h: ${theme.colors.dark[0]};
                --dark-s: ${theme.colors.dark[1]}%;
                --dark-l: ${theme.colors.dark[2]}%;

            --success: hsl(${theme.colors.success[0]}, ${theme.colors.success[1]}%, ${theme.colors.success[2]}%);
                --success-h: ${theme.colors.success[0]};
                --success-s: ${theme.colors.success[1]}%;
                --success-l: ${theme.colors.success[2]}%;
                --success-a: 1;
            --info: hsl(${theme.colors.info[0]}, ${theme.colors.info[1]}%, ${theme.colors.info[2]}%);
                --info-h: ${theme.colors.info[0]};
                --info-s: ${theme.colors.info[1]}%;
                --info-l: ${theme.colors.info[2]}%;
                --info-a: 1;
            --warning: hsl(${theme.colors.warning[0]}, ${theme.colors.warning[1]}%, ${theme.colors.warning[2]}%);
                --warning-h: ${theme.colors.warning[0]};
                --warning-s: ${theme.colors.warning[1]}%;
                --warning-l: ${theme.colors.warning[2]}%;
                --warning-a: 1;
            --danger: hsl(${theme.colors.danger[0]}, ${theme.colors.danger[1]}%, ${theme.colors.danger[2]}%);
                --danger-h: ${theme.colors.danger[0]};
                --danger-s: ${theme.colors.danger[1]}%;
                --danger-l: ${theme.colors.danger[2]}%;
                --danger-a: 1;
            

            /*
            * Color Tint and Shades
            * Replace the last value (light) with the step desired
            * Eg.: color: hsla(var(--dark-h), var(--dark-s), var(--light-6), 1);
            */
            --light-step: 5%;
            --light-1: var(--light-step);
            --light-2: clamp(0%, calc(var(--light-1) + var(--light-step)), 100%);
            --light-3: clamp(0%, calc(var(--light-2) + var(--light-step)), 100%);
            --light-4: clamp(0%, calc(var(--light-3) + var(--light-step)), 100%);
            --light-5: clamp(0%, calc(var(--light-4) + var(--light-step)), 100%);
            --light-6: clamp(0%, calc(var(--light-5) + var(--light-step)), 100%);
            --light-7: clamp(0%, calc(var(--light-6) + var(--light-step)), 100%);
            --light-8: clamp(0%, calc(var(--light-7) + var(--light-step)), 100%);
            --light-9: clamp(0%, calc(var(--light-8) + var(--light-step)), 100%);
            --light-10: clamp(0%, calc(var(--light-9) + var(--light-step)), 100%);
           
            /*
            * Saturation
            * Replace the last value (light) with the step desired
            * Eg.: color: hsla(var(--dark-h), var(--saturation-5), var(--dark-6), 1);
            */
            --saturation-step: 5%;
            --saturation-1: var(--saturation-step);
            --saturation-2: clamp(0%, calc(var(--saturation-1) + var(--saturation-step)), 100%);
            --saturation-3: clamp(0%, calc(var(--saturation-2) + var(--saturation-step)), 100%);
            --saturation-4: clamp(0%, calc(var(--saturation-3) + var(--saturation-step)), 100%);
            --saturation-5: clamp(0%, calc(var(--saturation-4) + var(--saturation-step)), 100%);
            --saturation-6: clamp(0%, calc(var(--saturation-5) + var(--saturation-step)), 100%);
            --saturation-7: clamp(0%, calc(var(--saturation-6) + var(--saturation-step)), 100%);
            --saturation-8: clamp(0%, calc(var(--saturation-7) + var(--saturation-step)), 100%);
            --saturation-9: clamp(0%, calc(var(--saturation-8) + var(--saturation-step)), 100%);
            --saturation-10: clamp(0%, calc(var(--saturation-9) + var(--saturation-step)), 100%);

            /*
             * Layout
             */
            --spacer: ${theme.layout.spacer};

            --width-sm: ${theme.layout.width.sm}px;
            --width-md: ${theme.layout.width.md}px;
            --width-lg: ${theme.layout.width.lg}px;
            --width-xl: ${theme.layout.width.xl}px;
            
            --border-width: 1px;
            --border-radius: 5px;

            /*
             * Font
             */

            /*
             * Header
             */

            /*
             * Footer
             */

            /*
             * Utility Classes
             */
            --container-max-sm: ${theme.layout.width.sm}px;
            --container-max-md: ${theme.layout.width.md}px;
            --container-max-lg: ${theme.layout.width.lg}px;
            --container-max-xl: ${theme.layout.width.xl}px;

            /*
             * Misc
             * TODO: Refactor to standard Bootstrap
             */
            --section-padding: 5rem 0rem;
            --section-padding-compact: 2rem 0rem;
            --container-padding: 5rem 2rem;
            --padding-top: 2rem;


            --transition-regular: all 400ms ease;
            --transition-fast: all 100ms ease;
            --font-weight-display: 900;
            
        }
    `

    return theme

}

