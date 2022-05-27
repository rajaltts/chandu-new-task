# Page Component
This component contains 3 sections:
1. Header
2. Footer
3. Content

## Props passable to Dialog Component:
1. title:  title for the modal header
2. isModalOpen: boolean value ot decide modal to open or not.
3. onClose: boolean value to close the modal.
4. maxWidth:choose option to decide on the width of the modal.
5. fullWidth: boolean value to set the modal fullwidth.
6. fullScreen:  boolean value to set the modal fullscreen.

Below props can be used to contorl header component:
1. title: tittitle for the modal header.
2. headerIcon: icon for the header.
3. disableCloseIcon: based on the boolean value close icon is abled/disabled
4. hideHeader: boolean value to hide the header.
5. id: set the unique id for the modal.

## Content
1. contentClassName: pass css class name to set the content height, width etc.
2. children: conetent message to be displayed.

## Footer
1. hideActions: boolean value to hide the cancel and confirm button.
2. footerClassName: pass css class name to set the footer height, width etc.
3. errorMsg: error message to be displayed.
4. footerComponent: customize componenet other than default one.
5. hideCancel: boolean to hide the cancel
6. cancelDisabled: disable the cancel button.
7. actionButtonList: list of controls beside cancel button.
8. overrideFooterCancelButton: Override the cancel button existing functionality.