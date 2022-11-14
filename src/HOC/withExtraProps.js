import React from 'react'
import { connect } from 'react-redux'

export default function withExtraProps(ChildComponent, actions={}) {
    const WrappedComponent = (props) => {
        return <ChildComponent {...props} />
    }
    const mapStateToProps = (state) => ({
        baseApi: state.api,
        workflowsConfig: state.getAllProductsReducer.builderList,
        templatesList: state.getTemplateList,
    })
    return connect(mapStateToProps, { ...actions })(WrappedComponent)
}
