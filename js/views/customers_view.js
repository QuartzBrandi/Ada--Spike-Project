window.CustomersView = Backbone.View.extend({
  template: _.template(
'<button type="button" class="btn btn-primary btn-lg all">\
<h2>Customers</h2>\
</button> \
<div class="btn-group" role="group" aria-label="button group">\
<a href="" class="btn btn-default disabled" role="button">Sort:</a>\
<button type="button" class="btn btn-default sort-name">Name</button>\
</div>'
  ),

  events: {
    'click button.all': 'fetchAll',
    'click button.sort-name': 'sortAll'
  },

  initialize: function() {
  },

  render: function() {
    this.$el.html(this.template);
    this.addAll();
  },

  fetchAll: function() {
    this.collection.fetch({
      success: _.bind(function(collection, response, options) {
        this.render();
      }, this),
      error: _.bind(function(collection, response, options) {
        console.log("ERROR: COLLECITON", collection);
        console.log("ERROR: RESPONSE", response);
        console.log("ERROR: OPTIONS", options);
      }, this)
    });
  },

  sortAll: function() {
    console.log("SORT");
  },

  addAll: function() {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(customer) {
    customerView = new CustomerView({model: customer});
    customerView.render();
    this.$el.append(customerView.el);
  }
});
