/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { Button } from "tns-core-modules/ui/button/button";
import { alert, AlertOptions } from "tns-core-modules/ui/dialogs/dialogs";
import { ExampleListView } from "./example-list-view";
import { Todo } from "./todo";

const items = [
    new Todo('Find out how to do stuff', true),
    new Todo('Do said stuff well', false)
]

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  /*
  This gets a reference this page’s <Page> UI component. You can
  view the API reference of the Page to see what’s available at
  https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
  */
  const page = args.object as Page;
  page.actionBarHidden = true;

  const main = page.getViewById('main-container') as GridLayout;
  const listView = new ExampleListView();
  listView.title = 'Todo List';
  listView.items = items;
  listView.row = 1; listView.rowSpan = 2; listView.col = 0;
  main.removeChildren();
  main.addChild(listView);
  
  const button = new Button();
  button.text = 'Click Me';
  button.marginBottom = 24;
  button.row = 2; button.col = 0;
  button.on('tap', nextStep);
  main.addChild(button);
}

function nextStep():void {
  const alertOption:AlertOptions = {
    title: 'Next Step',
    message: `Next, try to figure out a way to add items to the Todo List.
      \nHint: You'll probably want to start by adding a "TextField" and listening for its "returnPress" Event.
      \nLet me know if you have any questions. (adamatri@voicethread.net / adamatri on slack / 919.623.8442 )
    `,
    cancelable: true
  }
  alert(alertOption);
}