export const GENDER_OPTIONS = ["Male", "Female", "Transgender", "Rather not say", "Other"];

export const BOX_SHADOWS = {
    1: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;'
}

export const BREAKPOINTS = {
    TABLET: '860px',
    MOBILE: '600px'
}

export const DISPLAY_FLEX = (justifyContent, alignItems) => {
    return `display: flex; justify-content: ${justifyContent}; align-items: ${alignItems}`
}