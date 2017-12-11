import Backbone from 'backbone';
import Task from '../models/task';

const TaskView = Backbone.View.extend({
  // this will run any time you create a new instance
  initialize(params) {
    this.template = params.template;

    // listens for change events and calls renders and redraws the view when it hears a change event
    // for toggle complete, on button click we call toggleComplete method which changes the attribute is_complete. Any time we change a model attribute it triggers a change event
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    // adds or removes the css class
    if (this.model.get('is_complete')) {
      this.$el.addClass('is-complete');
      // this.$('button.toggle-complete').attr('value', 'Toggle Incomplete');
      console.log('adds is-complete class');
    } else {
      this.$el.removeClass('is-complete');
    }

    this.$el.html(compiledTemplate);

    return this;
  },
  // events object is where BB looks to see what to call
  events: {
    'click button.delete': 'deleteTask',
    'click button.toggle-complete': 'toggleHandlerComplete',
  },

  toggleHandlerComplete() {
    // this calls the toggle method in task.js to change is complete model attribute
    this.model.toggleComplete()
  },

  deleteTask(event) {
    this.model.destroy();
    // remove is probably unneccesary but it tells it to remove itself from the DOM
    this.remove();
  },
});

export default TaskView;
