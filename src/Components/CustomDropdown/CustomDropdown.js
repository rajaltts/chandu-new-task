import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faSortDown, faTrashAlt, faEdit, faDownload } from '@fortawesome/free-solid-svg-icons'
import { guid } from '@carrier/workflowui-globalfunctions'
import customDropdownStyles from './CustomDropdownStyles'
import classnames from 'classnames'
import translation from '../Translation'

function CustomDropdown(props) {
    const node = useRef()
    const [open, setOpen] = React.useState(false)
    const { tagTemplateName, fullWidth } = customDropdownStyles()

    function onDropBtnClick() {
        props.onDropBtnClick(open, props.conceptTemplateType)
        setOpen(!open)
    }
    function onClickSaveTagPopUp() {
        props.openSaveTagTemplate(props.conceptTemplateType)
    }
    function editTagTemplate(item) {
        props.editTagTemplate(item)
        setOpen(!open)
    }
    function deleteTagTemplate(item) {
        props.deleteTagTemplate(item, 'delete')
        setOpen(!open)
    }
    function exportTagTemplate(item) {
        props.exportTagTemplate(item)
        setOpen(!open)
    }
    function onClickOfDropdownMenu(templateData) {
        let unitValue
        if (props.UnitSystem === 'Metric') {
            unitValue = 'SI'
        } else {
            unitValue = 'IP'
        }
        props.onItemClick(templateData, unitValue, props.conceptTemplateType)
        setOpen(!open)
    }
    function accordianId() {
        let getAccordianID =
            props.TemplateNames && props.TemplateNames.filter((item) => item.AccordianID === props.conceptTemplateType)
        let Valid =
            (props.TemplateNames && props.TemplateNames.length && getAccordianID.length) ||
            !(props.TemplateNames && props.TemplateNames.length)
        return Valid
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])

    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            return
        }
        setOpen(false)
    }

    const dropdownButtonId = props?.dropDownName?.split(' ').join('_') || ''

    return (
        <div
            id='SaveTagTemplateBtn'
            className={props.conceptTemplate ? 'wbtnDropdown conceptTemplate' : 'wbtnDropdown'}
            ref={node}>
            <button className='Wbtn' onClick={onClickSaveTagPopUp}>
                <FontAwesomeIcon icon={faSave} className='faCusLeft' id='SaveTagTemplateDropDownId' />
                {props.HeadingName}
            </button>
            <button
                title={props.dropDownName}
                id={dropdownButtonId}
                className={classnames('Wbtn', 'GroupBtn', props.conceptTemplate && tagTemplateName)}
                onClick={onDropBtnClick}>
                {props.dropDownName}
                <FontAwesomeIcon icon={faSortDown} />
            </button>
            {open ? (
                <ul className='dropdownBox'>
                    {accordianId() && props.TemplateNames && props.tagTemplates
                        ? props.tagTemplates.map((item) => {
                              const templateTitle =
                                  item.TagTemplateName || item.TemplateName || item.Attributes.Description
                              return (
                                  <li key={guid()}>
                                      <span
                                          className={classnames(tagTemplateName, item.defaultValues && fullWidth)}
                                          title={templateTitle}
                                          onClick={() => onClickOfDropdownMenu(item)}>
                                          {' '}
                                          {templateTitle}{' '}
                                      </span>
                                      {!item.defaultValues && (
                                          <div>
                                              <span
                                                  className='ActionLink'
                                                  id='TagTemplateEditlink'
                                                  data-action='TagTemplateEdit'
                                                  onClick={() => editTagTemplate(item)}>
                                                  <FontAwesomeIcon className='columncolor' icon={faEdit} />
                                              </span>
                                              <span
                                                  className='ActionLink'
                                                  id='TagTemplateDeletelink'
                                                  data-action='TagTemplatetDelete'
                                                  onClick={() => deleteTagTemplate(item)}>
                                                  <FontAwesomeIcon className='columncolor' icon={faTrashAlt} />
                                              </span>
                                              {props.exportTagSupported && (
                                                  <span
                                                      className='ActionLink'
                                                      id='TagTemplateExportlink'
                                                      data-action='TagTemplateExport'
                                                      onClick={() => exportTagTemplate(item)}>
                                                      <FontAwesomeIcon
                                                          className='columncolor'
                                                          icon={props.downloadIcon ? props.downloadIcon : faDownload}
                                                      />
                                                  </span>
                                              )}
                                          </div>
                                      )}
                                  </li>
                              )
                          })
                        : translation('Loading', 'Loading...')}
                </ul>
            ) : null}
        </div>
    )
}

export default CustomDropdown
