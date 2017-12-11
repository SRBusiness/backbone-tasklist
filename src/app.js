// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

import Task from './models/task';
import TaskList from './collections/task_list';
import TaskView from './views/task_view';
import TaskListView from './views/task_list_view';

const taskList = new TaskList();
let taskTemplate;

$(document).ready( () => {
  taskTemplate = _.template($('#task-template').html());

  // $('#add-task-form').submit(addNewTask);

  taskList.add(new Task({task_name: "Put rendering logic in Backbone Views", assignee: "Me"}));
  taskList.add(new Task({task_name: "Put handling events in Backbone Views", assignee: "Me"}));
  taskList.add(new Task({task_name: "Eat a tasty thing"}));

  // taskListView - everything in the main tag, embedded in the DOM
  const taskListView = new TaskListView ({
    el: 'main',
    model: taskList,
    template: taskTemplate,
  });

  taskListView.render();
});
