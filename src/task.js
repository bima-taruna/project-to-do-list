class Task {
  constructor(title, desc, date) {
    this.title = title;
    this.desc = desc;
    this.date = date;
  }

  get title() {
    return this.title;
  }

  set title(newTitle) {
    this.title = newTitle;
  }

  get desc() {
    return desc;
  }

  set desc(newDesc) {
    this.desc = newDesc;
  }

  get date() {
    return this.date;
  }

  set date(newDate) {
    this.date = newDate;
  }
}
