# HyperLink usage:
HyperLink component is used to display hyperlink for link or images in table report

## Props which can be passed to HyperLink component:
import { HyperLinks } from '@carrier/ngecat-reactcomponents';
Use below reference to use it in your json object.
pass reactcomponent to value either in primaryText or secondaryText
{
  primaryText: {
    value: React.createElement(HyperLinks,{
      type: "pdf",
      value :"https://stecatbuildersdev.blob.core.windows.net/ecatui/ecatimages/PDF.webp",
      href : "https://ecatui-dev.azurewebsites.net/",
      postText :"text1"
      preText : "text2",
      style:{background : "red"}
    })
  },
},

type : can be pdf or link or word
value : path of the image to display
href : hyperlink
preText: text diplayed before the value
postText: text displayed after the value