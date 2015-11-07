window.CustomersView = Backbone.View.extend({
  initialize: function() {

  },

  render: function() {
    this.addAll();
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
