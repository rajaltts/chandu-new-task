// React
import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import { useDrop } from 'react-dnd'

import {
    CART_DATASOURCETYPES,
    getCartItemList,
    GetRulesPropertyValue,
    getRulesAssignmentValue,
    //Utility Methods -->
    getPriceString,
    UI_SIZES,
    scrollTo,
    slugify,
} from '@carrier/workflowui-globalfunctions'

// Components

import CartSection from './CartSection'
import DrawerOption from '../Drawers/DrawerOption'

const Cart = (props) => {
    const {
        intl,
        closeCart,
        showBottomSpacer = true,
        RULESET,
        SECTION_NAMES,
        cartConfig,
        step1,
        onNewAssignment,
        configurationData,
        ConfigurationInputData,
        getPrice = null,
        renderOptions = null,
    } = props

    const [selectedOptions, setSelectedOptions] = useState([])

    const [{ canDrop: selectedOptionsCanDrop, isOver: selectedOptionsIsOver }, selectedOptionsDrop] = useDrop({
        accept: 'AvailableOption',
        drop: () => ({ name: 'SelectedOptions' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const isOverSelectedOptions = selectedOptionsCanDrop && selectedOptionsIsOver

    const unselectOption = (movedOptionName) => {
        setSelectedOptions(selectedOptions.filter((option) => option.property.value !== movedOptionName))
    }

    const removeOptionFromCart = (propertyName, defaultValue) => {
        onNewAssignment({ [propertyName]: defaultValue }, RULESET.SELECTION, null, null, null, true)
    }

    const baseQuantityHandler = (event, editedValue, rowData) => {
        removeOptionFromCart(rowData.dataSource, editedValue)
    }

    const getColumnData = (attributes, sectionColumns) => {
        const columnDataArray = []

        if (!sectionColumns) return columnDataArray

        //Iterate through the list of columns expected for this section.
        sectionColumns.forEach((col) => {
            const colData = {}

            //Add the column key and width from the section columns configuration
            colData.key = col.key
            colData.columnWidth = col.columnWidth

            //initialize the value to blank.  Overwrite below if there is a value.
            colData.value = ''

            //If this is a pricing column, it should have a price unit.
            if (col.priceUnit) colData.priceUnit = col.priceUnit

            //Depending on the type of the data source (property or property value attribute)
            //we will lookup the value for the column.
            if (col.dataSourceType) {
                switch (col.dataSourceType) {
                    case CART_DATASOURCETYPES.PROPVALATTRIBUTE:
                        //If the data source for the column references a property value attribute
                        //that exists in our properties attributes, add it to our output list of attributes
                        //that will be used to render the data for each column.
                        if (col.dataSource) {
                            if (attributes[col.dataSource]) {
                                colData.value = attributes[col.dataSource]
                            }
                        }
                        break

                    case CART_DATASOURCETYPES.PROPERTY:
                        //If the data source for the column reference as property, we need
                        //to retrieve the value of that property from the configuration data
                        // eslint-disable-next-line no-case-declarations
                        const tmpValue = GetRulesPropertyValue(col.dataSource, configurationData)
                        if (tmpValue) colData.value = tmpValue
                        break

                    default:
                        break
                }
            }

            //Add the column data to our array
            columnDataArray.push(colData)
        })

        return columnDataArray
    }

    const renderOptionsHandler = (config) => {
        if (renderOptions) {
            return renderOptions(config)
        }
        const items = getCartItemList(configurationData, config.tagName, intl)

        return items.map((item) => (
            <DrawerOption
                key={item.label}
                name={item.label}
                label={item.label}
                columnData={getColumnData(item.attributes, config.columns)}
                scrollTo={scrollTo}
                scrollOffset={UI_SIZES.SCROLLOFFSET}
                slugify={slugify}
                draggable={false}
                moveOption={unselectOption}
                removeOptionFromCart={() => removeOptionFromCart(item.propertyName, item.defaultValue)}
                selected={true}
            />
        ))
    }

    const getPriceHandler = (priceUnit, propertyName) => {
        if (getPrice) {
            return getPrice(priceUnit, propertyName, configurationData)
        }
        if (priceUnit) {
            return getPriceString(priceUnit, GetRulesPropertyValue(propertyName, configurationData) || '0')
        }
        return GetRulesPropertyValue(propertyName, configurationData) || ''
    }

    cartConfig[0].columns[1].isEditable = getRulesAssignmentValue(
        ConfigurationInputData,
        step1[SECTION_NAMES.TAG].Tag_nQty.propName
    )
        ? true
        : false
    cartConfig[0].columns[1].onClick = baseQuantityHandler
    return (
        <CartSection
            renderOptions={renderOptionsHandler}
            closeCart={closeCart}
            getPriceString={getPriceHandler}
            isOverSelectedOptions={isOverSelectedOptions}
            cartConfig={cartConfig}
            dndReference={selectedOptionsDrop}
            showBottomSpacer={showBottomSpacer}
        />
    )
}

export default injectIntl(Cart)
