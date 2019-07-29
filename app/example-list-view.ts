import {GridLayout} from "tns-core-modules/ui/layouts/grid-layout"
import { Label } from "tns-core-modules/ui/label/label";
import { ListView, ItemsSource, ItemEventData } from "tns-core-modules/ui/list-view/list-view";
import { ExampleListItemView } from "./example-list-item-view";
export class ExampleListView extends GridLayout {

  constructor() {
    super();
    (this as any).rows = '60, *';
    (this as any).columns = '*';

    this.addChild(this.header);
    this.addChild(this.list);
  }

  protected _title:string = 'Example List';
  public get title():string { return this._title; }
  public set title(v:string) {
    if (this._title != v) {
      this._title = v;
    }
  }

  protected _header:Label;
  public get header():Label { 
    if (! this._header) {
      this._header = new Label();
      this._header.fontSize = 20;
      this._header.style.fontWeight = 'bold';
      this._header.text = this.title;
      this._header.row = this._header.col = 0;
      this._header.verticalAlignment = 'middle';
    }
    return this._header;
  }

  protected _list:ListView;
  public get list():ListView { 
    if (! this._list) {
      this._list = new ListView();
      this._list.width = {value: 1, unit: '%'};
      this._list.height = {value: 1, unit: '%'};
      this._list.row = 1; 
      this._list.col = 0;
      this._list.itemTemplate = () => new ExampleListItemView();
      this._list.on(ListView.itemTapEvent, (data:ItemEventData) => {
        const {todo} = (data.view as ExampleListItemView);
        todo.done = !todo.done;
        this.notify(Object.assign(data, {object:this}));
      });
    }
    return this._list;
  }

  public get items():Array<any>|ItemsSource { return this._list.items; }
  public set items(v:Array<any>|ItemsSource) { this._list.items = v; }
}