window.CustomersView = Backbone.View.extend({
  template: _.template(
'<button type="button" class="btn btn-primary btn-lg all">\
<h2>Customers</h2>\
</button> \
<div class="btn-group" role="group" aria-label="button group">\
<a href="" class="btn btn-default disabled" role="button">Sort:</a>\
<button type="button" class="btn btn-default sort-id">ID</button>\
<button type="button" class="btn btn-default sort-name">Name</button>\
</div>'
  ),

  events: {
    'click button.all': 'fetchAll',
    'click button.sort-id': 'sortId',
    'click button.sort-name': 'sortName'
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

  sortId: function() {
    this.sortAttr("id");
  },

  sortName: function() {
    this.sortAttr("name");
  },

  sortAttr: function(attr) {
    if (this.sortType == attr) {
      var reverseCollection = this.collection.toJSON();
      reverseCollection.reverse();
      this.collection.reset(reverseCollection);
    } else {
      var orderedCollection = this.collection.sortBy(attr);
      this.collection.reset(orderedCollection);
      this.sortType = attr;
    }
    this.render();
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
