# Page Component

This component contains 1 sections:

1. Content

## Props passable to Dialog Component:

1. opendialouge: boolean value to open dialouge.
2. title: string value to display title.
3. tagNameRequiredText:string value, validation message for empty tag name .
4. notAllowedCharactersText:string value, validate text for character allowed.
5. maxLengthError: string value, validate text for length.
6. templateNameText: string value, value to be displayed on label beside text area to enter new tagvalue.
7. existingTemplateText: string value, value to be displayed on label beside old tag name text area
8. cancelText: string value, cancel button text.
9. renameTemplateText: string value, rename button text.
10. duplicateTemplateNameText:string value, validate duplicate tag name.

Format is as follows:
opendialouge={opendialouge}
title={translation('Edit Tag Templates')}
tagNameRequiredText={translation('TagNameRequired')}
notAllowedCharactersText={translation('NotAllowedCharacters')}
maxLengthError={translation('MaxLengthError')}
templateNameText={translation('TagTemplateName')}
existingTemplateText={translation('ExistingTemplate')}
cancelText={translation('Cancel')}
renameTemplateText={translation('Rename')}
duplicateTemplateNameText={translation('DuplicateTemplateNameMessage')}
