import Backbone from 'backbone';
import TaskView from './task_view';
import Task from '../models/task'

const TaskListView = Backbone.View.extend({
  initialize(params) {
    // save template
    this.template = params.template;

    // listedn for changes in our template - in collections when you change them they trigger update events vs in models that trigger change events
    this.listenTo(this.model, 'update', this.render);
  },

  // events object
  events: {
    'click #add-new-task': 'addTask',
  },

  //
  updateStatusMessageFrom(messageHash) {
    // jQuery select spot where we want to add messages
    const $statusMessages = this.$('#status-messages');
    // clear the messages
    $statusMessages.empty();

    Object.keys(messageHash).forEach((messageType) => {
      messageHash[messageType].forEach((message) => {
        $statusMessages.append(`<li>${message}</li>`);
      });
    });
    $statusMessages.show();
  },

  // this method just lets up format a string that we can pass into the updateStatusMessageFrom, this helps with the affirmative messages to users
  updateStatusMessage(message) {
    this.updateStatusMessageFrom({
      task: [message],
    });
  },

  // add task function
  addTask(event) {
    event.preventDefault();

    // gets form data
    const formData = this.getFormData();
    // new instance of task using form data
    const newTask = new Task(formData);

    if (newTask.isValid()){
      // add task and clear form data
      this.model.add(newTask);
      this.clearFormData();
      this.updateStatusMessage(`Task: ${newTask.get('task_name')} Created`)
    } else {
      console.log('New task is not valid');
      // get rid of task and provide error handling
      // call updateStatusMessageFrom and send it validations errors
      this.updateStatusMessageFrom(newTask.validationError);
      newTask.destroy();
    }
  },

  // function to clear form
  clearFormData() {
    ['task_name','assignee'].forEach((field) => {
      this.$(`#add-task-form input[name=${field}]`).val('');
    });
  },

  // helper function to get form data
  getFormData() {
    const taskData = {};
    ['task_name','assignee'].forEach((field) => {
      const val = this.$(`#add-task-form input[name=${field}]`).val();
      if (val != '') {
        taskData[field] = val;
      }
    });
    return taskData;
  },

  render() {
    // Clear the unordered list
    this.$('#todo-items').empty();

    // Iterate through the list rendering each Task
    this.model.each((task) => {
      // Create a new TaskView with the model & template
      const taskView = new TaskView({
        model: task,
        template: this.template,
        tagName: 'li',
        className: 'task',
      });
      // Then render the TaskView. And append the resulting HTML to the DOM.
      this.$('#todo-items').append(taskView.render().$el);
    });
    return this;
  },
});

export default TaskListView;
