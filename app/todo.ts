import { Observable } from "tns-core-modules/data/observable";

export class Todo extends Observable {

  constructor(inTitle?:string, inDone?:boolean) {
    super();
    this.title = inTitle;
    this.done = inDone;
  }

  protected _title:string;
  public get title():string { return this._title; }
  public set title(v:string) {
    if (this._title != v) {
      this._title = v;
      this.notifyPropertyChange('title', this._title);
    }
  }

  protected _done:boolean;
  public get done():boolean { return this._done; }
  public set done(v:boolean) {
    if (this._done != v) {
      this._done = v;
      this.notifyPropertyChange('done', this._done);
    }
  }
}
