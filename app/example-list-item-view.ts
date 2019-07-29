import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { Todo } from "./todo";
import { Label } from "tns-core-modules/ui/label/label";
import { Observable, Color } from "tns-core-modules/ui/page/page";

export class ExampleListItemView extends GridLayout {

  constructor() {
    super(); 
    (this as any).rows = 'auto';
    (this as any).columns = 'auto, *, 40';
    
    this.addChild(this.titleView);
    this.addChild(this.checkbox);
  }

  // this overrides the NativeScript View property
  public get bindingContext():any { return this.todo; }
  public set bindingContext(v:any) { this.todo = v; }

  protected _todo:Todo;
  public get todo():Todo { return this._todo; }
  public set todo(v:Todo) {
    if (this._todo != v) {
      this._todo = v;
      this._todo.on(Observable.propertyChangeEvent, this._updateUI.bind(this));
      this._updateUI();
    }
  }

  protected _titleView:Label;
  public get titleView():Label { 
    if (! this._titleView) {
      this._titleView = new Label();
      this._titleView.fontSize = 16;
      this._titleView.padding = `16`;
      this._titleView.row = this._titleView.col = 0;
    }
    return this._titleView;
  }

  protected _checkbox:Label;
  public get checkbox():Label { 
    if (! this._checkbox) {
      this._checkbox = new Label();
      this._checkbox.text = String.fromCodePoint(0x2714);
      this._checkbox.fontSize = 20;
      this._checkbox.row = 0; 
      this._checkbox.col = 2;
      this._checkbox.verticalAlignment = 'middle';
    }
    return this._checkbox;
  }

  protected _updateUI():void {
    this.titleView.text = this.todo ? this.todo.title : '';
    this.checkbox.visibility = this.todo ? 
      (this.todo.done ? 'visible':'collapse') : 'collapse';
  }
}