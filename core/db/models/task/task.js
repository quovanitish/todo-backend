module.exports = class Task {
  constructor(task) {
    this.title = task.title;
    this.description = task.description || "";
    this.status = task.status || "In progress";
    this.createdOn = task.createdOn || Date.now();
  }
};
