# NGECAT-ReactComponents

A large store of UI components shared between Framework, builders or any ECAT web application.  

See them directly on github: https://scegithub.apps.carrier.com/pages/SCE/NGECAT-ReactComponents/

Under `src/Components` folder, you'll find legacy components used in the most of builders. This components often are rules driven.  

Under `src/v2/Components` folder, you'll find components that : 
  - fit the new ECAT theme
  - are independents and can be controled or not by rules
  - contains a storybook
  - contains a ReadMe page
  - are unit-tested
  
# Process for Updating this library

Please keep all of the below guidelines in mind when developing changes to this library!

Depending on the changes being proposed, you may or may not need to get alignment from the other regions, as this codebase is common, your changes will most likely affect all regions.

Changes requiring alignment MUST NOT be merged until alignment is reached between regions

### Changes requiring global alignment
  
  - Introduction of a new component. 
  - Modifications to existing components, functions, etc. 
  - Style Changes -> we want eCAT to look and feel the same across regions. 

Please request and wait for review from:
  - Jake Thurnau: Carl.Thurnau2@carrier.com
  - Farid Boukerche: Farid.Boukerche@carrier.com
  - Wei Li: Wei.Li2@carrier.com

### Changes not requiring global alignment

  - Bug or Defect fixes
  - Additions of constants (NOTE: Modifications to constants should be reviewed)

# Guidelines

If you want to add your components in this package, you need to consider some quality attributes that we want to enforce.

## Reusability
First of all, components in this package aim to be reusable easily with minimum to no hassle.
It match the functionality, look and feel that are showed in figma mock-ups (see: https://www.figma.com/file/finpxtXXwpFN5enafZjGJt/0---eCAT---Library-1.0?node-id=3048%3A10)

Code should be written generically, i.e. not tightly coupled to any single product

## Documentation
Code changes should be well documented, using both in-line comments as well as method/function documentation 

## Component Scope
Components should not interact with any rules output, all attributes that define the behavior, look and feel of the component need to be passed as React props. You can either use control components to do so, or use a React hook that will define what props should be based on the rules output. (TODO: add an example)

Components should not try to translate or call react-intl, it's up to developers to inject the correct translated string to avoid any collision with other regions.

## Extensibility
If a component encapsulate another standard component (from MUI for example), then make sure that any developer can also handle the behavior, look and feel of the subcomponent if it makes sense.

## Tested
Components should contain unit tests (using Jest) that validate the behavior, look and feel. It will help us to be sure that nothing has been broken for everyone when a change is made.

TODO: UPDATE GUIDELINES FOR WRITING TESTS

## React MUI friendly
Components should try to use the default theme as much as possible and leverage makeStyle to define the standard and some variant of look and feel.
If you can manage a component to be responsive by design, it will be very much appreciated.

## Story book
Components should contain a story to showcase the behavior, look and feel. (start with this introduction to understand how to write stories: https://storybook.js.org/docs/react/get-started/introduction)
To run the story book, first install dev dependencies `npm i`  
Then run `npm run storybook`

This will setup a local server, open a browser tab on the story book :
![alt text](https://storybook.js.org/d1406df7f9ce817ae0e5b3eb5f1bf1f3/example-button-noargs.png)

Now, you can visualize, test, try components props directly and see what happens without integrate this component in your codebase.

## Unit tests
Unit tests add a security to avoid breaking something when working on componenents, specially if this components are shared between several applications.
To run tests, first install dev dependencies if its not already done, then run `npm run test`.

These tests are always run by the pipeline, if a test fail, the pipeline will fail.

## Working locally
If you need to work on a legacy component which does not have a story, you'll need to test your changes in your builder before merging your work and creating a new tag.
In order to do that, i'll need to link this repository localy with your builder, so your builder will use your local version of NGECAT-ReactComponents instead of the one on the npm repository.
  - In this repository local folder (in ReactComponent), run `npm link`
  - In ***NGECAT-Reactjs-UI*** repository, run `npm link @carrier/ngecat-reactcomponents`
  - Then, run `npm run build` in this repository local folder each time you need to refresh your changes in your builder.

### React version mismatch
  - If you have a mismatch between React version, you can link the React version of the framework to this repository easily by doing the same thing.
  - In ***NGECAT-Reactjs-UI*** repository, run `cd node_modules/react` and `npm link`
  - In this repository local folder, run `npm link react`

### Theme mismatch
  - In ***NGECAT-Reactjs-UI*** repository, run `cd node_modules/@material-ui/styles/` and `npm link`
  - In ***NGECAT-Reactjs-UI*** repository, run `cd node_modules/@material-ui/core/` and `npm link`
  - In this repository local folder, run `npm link @material-ui/styles`
  - In this repository local folder, run `npm link @material-ui/core`

### Reset dependencies
* You can use `npm i` in Reactjs-UI to reset your dependencies (cancel commands like `npm link xxx`)
* The commands like `npm link` are persistent and can be listed thanks to `ls -alR 'C:\Program Files\nodejs\node_modules\' | grep ">"`
There is no need to remove them to disconnect local builder/reactUI from ReactComponent (but you can undo it with the command `npm unlink' in the right directory)
