import React from 'react'
import { ErrorBoundaryContext } from './ErrorBoundaryContext'
import { logError } from './ErrorLoggingService'
import './ErrorBoundary.css'

export default class ErrorBoundary extends React.Component {
    state = { hasError: false }
    static getDerivedStateFromError(error) {
        console.error('Error: ', error)
        return { hasError: true }
    }
    componentDidCatch(error) {
        logError(error)
    }
    triggerError = (error) => {
        logError(error)
        this.setState({ hasError: true })
    }
    resetError = () => this.setState({ hasError: false })
    restorePreviousApplicationState = () => {
        this.resetError()
    }
    reloadPage = () => {
        window.location.reload(true)
    }

    render() {
        return (
            <ErrorBoundaryContext.Provider value={{ resetError: this.resetError, triggerError: this.triggerError }}>
                {this.state.hasError ? (
                    <div className='error-boundary-parent-holder'>
                        <h1>Oops, there seems to be a technical problem, please try again.</h1>
                        <div display='flex'>
                            <button
                                className='restore-button-style restore-ripple'
                                data-id='RESTORE_PREVIOUS_APPLICATION_STATE'
                                onClick={this.restorePreviousApplicationState}>
                                Restore Previous Application State
                            </button>
                            <button
                                className='reload-button-style reload-ripple'
                                data-id='RELOAD_PAGE'
                                onClick={this.reloadPage}>
                                Reload Page
                            </button>
                        </div>
                    </div>
                ) : (
                    this.props.children
                )}
            </ErrorBoundaryContext.Provider>
        )
    }
}
