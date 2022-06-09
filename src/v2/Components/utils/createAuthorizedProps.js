export const createAuthorizedProps = (reactComponent, ref) => {
    const authorizedProps = {}
    for (const propName in reactComponent?.Naked?.propTypes) {
        if(ref && ref[propName] !== undefined) authorizedProps[propName] = ref[propName]
    }
    return authorizedProps
}
