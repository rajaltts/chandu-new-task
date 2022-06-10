/**
 * Only used in development environment to remove warnings in console
 * @param {reactComponent} reactComponent that have propTypes defined
 * @param {object} ref containing props that we want to filter 
 * @returns only valid props againt reactComponent propTypes
 */
export const createAuthorizedProps = (reactComponent, ref) => {
    if (process.env.NODE_ENV === 'development') {
        const authorizedProps = {}
        for (const propName in reactComponent?.Naked?.propTypes) {
            if(ref && ref[propName] !== undefined) authorizedProps[propName] = ref[propName]
        }
        return authorizedProps
    }
    return ref
}
