import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'

/* eslint-disable */

class CustomNotification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
        }
        this.onclose = this.onclose.bind(this)
    }

    componentWillReceiveProps() {
        this.setState({ visible: true })
    }

    componentDidMount() {
        this.setState({ visible: true })
    }

    componentWillUnmount() {
        this.props.changeStatus && this.props.changeStatus(false, '', '')
    }

    onclose() {
        this.setState({ visible: false })
        this.props.changeStatus && this.props.changeStatus(false, '', '')
    }
    styles() {
        return {
            cursor: 'pointer',
            fontSize: '26px',
        }
    }

    render() {
        let notificationClass
        let iconType
        switch (this.props.statusType.toLowerCase()) {
            case 'error':
                notificationClass = 'ErrorNotification'
                iconType = 'k-i-x-circle'
                break
            case 'warning':
                notificationClass = 'WarningNotification'
                iconType = 'k-i-warning'
                break
            case 'info':
                notificationClass = 'InfoNotification'
                iconType = 'k-i-information'
                break
            default:
                notificationClass = 'SuccessNotification'
                iconType = 'k-i-check-circle'
                break
        }
        return this.state.visible ? (
            <div id={notificationClass} className={`Notification ${notificationClass}`}>
                <span className={`k-icon k-icon-notification ${iconType} NotificationIcon`}></span>
                <span className='NotificationDescription'>{this.props.descriptionId}</span>
                <span style={this.styles()}>
                    <FontAwesomeIcon icon={faWindowClose} onClick={this.onclose} />
                </span>
            </div>
        ) : (
            ''
        )
    }
}

export default CustomNotification
