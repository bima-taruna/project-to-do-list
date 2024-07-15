import { v4 as uuidv4 } from "uuid";

class Task {
  constructor(title, desc, date, priority, isFinish = false) {
    this.id = uuidv4();
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
    this.isFinish = isFinish;
  }
}

export default Task;
