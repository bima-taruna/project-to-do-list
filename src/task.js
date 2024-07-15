class Task {
  constructor(title, desc, date, priority, isFinish = false) {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
    this.isFinish = isFinish;
  }
}

export default Task;
