export class Song {

  public id: string;
  public name: string;
  public performer: string;

  constructor(id: string, name: string, performer: string) {
    this.id = id;
    this.name = name;
    this.performer = performer;
  }
}
