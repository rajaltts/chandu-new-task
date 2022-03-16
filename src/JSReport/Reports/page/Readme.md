# Page Component
This component contains 3 sections:
1. Header
2. Footer
3. Content

## Props passable to Page Component:
![image](https://scegithub.apps.carrier.com/storage/user/609/files/d8fd8680-a516-11ec-837e-a273170f2385)

## Header
The header content to show for every page 
![image](https://scegithub.apps.carrier.com/storage/user/609/files/3512db80-a514-11ec-9480-1bf1a65a6e5c)

Below props can be used to contorl header component:

1. hideHeader: boolean to determine whether to show/hide header
2. modelBrandLogo: brand image to show in header
3. fullName : report creator's name
4. title: title for the page
5. modelBrand: ciat/carrier. Based on this value title is shown with model in page
6. model: show model name below title if modelBrand is ciat 
7. projectName and projectNameLabel: based on if projectName is passed both project title and name are shown in header
8. tagName and tagNameLabel: based on if projectName is passed both tag title and name are shown in header

## Footer
The footer content to show for every page 
![image](https://scegithub.apps.carrier.com/storage/user/609/files/67bdd380-a516-11ec-830e-856d204bc010)

Below props can be used to contorl Footer component:

1. hideFooter: boolean to determine whether to show/hide footer
2. footNotes and builderInfo: 
footNotes contains footer image and an descriptions array to show the notes in the footer
builderInfo contains the description regarding the builder
![image](https://scegithub.apps.carrier.com/storage/user/609/files/e3208480-a518-11ec-8658-d2aa6673261f)

3. reportCurrentPreviewIndex: The page number in the collection of pages shown in report 
4. pageList: total number of pages in the report
![image](https://scegithub.apps.carrier.com/storage/user/609/files/41e5fe00-a519-11ec-8c64-7b51bba6ee2c)

## Content
It is the actual report content(tables, images, etc.) displayed. The content to show here can be passed through children prop 
![image](https://scegithub.apps.carrier.com/storage/user/609/files/b3707d00-a516-11ec-91ec-311a48d7528f)