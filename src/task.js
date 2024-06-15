class Task {
  constructor(title, desc, date, priority) {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
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

  get priority() {
    return this.priority;
  }

  set priority(newPriority) {
    this.priority = newPriority;
  }
}

export default Task;
