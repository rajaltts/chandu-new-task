import React from 'react'
import { connect } from 'react-redux'

export default function withExtraProps(ChildComponent) {
    const WrappedComponent = (props) => {
        return <ChildComponent {...props} />
    }
    const mapStateToProps = (state) => ({
        baseApi: state.api,
    })
    return connect(mapStateToProps, {})(WrappedComponent)
}
