import Dexie, { Table } from "dexie";

export interface INotes {
  id?: number;
  title: string;
  change_date: number;
  content?: string;
}

export class MySubClassedDexie extends Dexie {
  notes!: Table<INotes>;
  constructor() {
    super("notesDB");
    this.version(1).stores({
      notes: "++id, title, change_date, content",
    });
  }
}

export const db = new MySubClassedDexie();
