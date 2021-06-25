# NGECAT-ReactComponents

A large store of UI components shared between Framework, builders or any ECAT web application.  

Under `src/Components` folder, you'll find legacy components used in the most of builders. This components often are rules driven.  

Under `src/v2/Components` folder, you'll find components that : 
  - fit the new ECAT theme
  - are independents and can be controled or not by rules
  - contains a storybook
  - contains a ReadMe page
  - are unit-tested
  
## Story book
To run the story book, first install dev dependencies `npm i`  

Then run `npm run storybook`

This will setup a local server, open a browser tab on the story book :
![alt text](https://storybook.js.org/d1406df7f9ce817ae0e5b3eb5f1bf1f3/example-button-noargs.png)

Now, you can visualize, test, try components props directly and see what happens without integrate this component in your codebase.

## Unit tests
Unit tests add a security to avoid breaking something when working on componenents, specially if this components are shared between several applications.
To run tests, first install dev dependencies if its not already done, then run `npm run test`.

## Working locally
If you need to work on a legacy component which does not have a story, you'll need to test your changes in your builder before merging your work and creating a new tag.
In order to do that, i'll need to link this repository localy with your builder, so your builder will use your local version of NGECAT-ReactComponents instead of the one on the npm repository.
  - In this repository local folder, run `npm link`
  - In your builder repository run `npm link @carrier/ngecat-reactcomponents`
  - Then, run `npm run build` in this repository local folder each time tou need to refresh your changes in your builder.
You can use `npm i` to reset your dependencies`
