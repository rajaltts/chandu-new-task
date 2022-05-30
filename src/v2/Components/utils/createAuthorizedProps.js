export const createAuthorizedProps = (reactComponent, ref) => {
    const authorizedProps = {}
    for (const propName in reactComponent?.Naked?.propTypes) {
        authorizedProps[propName] = ref && ref[propName]
    }
    return authorizedProps
}
