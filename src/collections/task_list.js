import Backbone from 'backbone';
import Task from '../models/task';

// not connected to an api 

const TaskList = Backbone.Collection.extend({
  model: Task,
});

export default TaskList;
