// Generated by CoffeeScript 1.10.0
(function() {
  window.CustomersView = Backbone.View.extend({
    template: _.template('<button type="button" class="btn btn-primary btn-lg all"><h2>Customers</h2></button> <div class="btn-group" role="group" aria-label="button group"><a href="" class="btn btn-default disabled" role="button">Sort:</a><button type="button" class="btn btn-default sort-id">ID</button><button type="button" class="btn btn-default sort-name">Name</button></div><div><input type="text" class="form-control" placeholder="Search for..."></div>'),
    events: {
      'click button.all': 'fetchAll',
      'click button.sort-id': 'sortId',
      'click button.sort-name': 'sortName'
    },
    initialize: function() {},
    render: function() {
      this.$el.html(this.template);
      return this.addAll();
    },
    fetchAll: function() {
      return this.collection.fetch({
        success: _.bind(function(collection, response, options) {
          return this.render();
        }, this),
        error: _.bind(function(collection, response, options) {
          console.log("ERROR: COLLECITON", collection);
          console.log("ERROR: RESPONSE", response);
          return console.log("ERROR: OPTIONS", options);
        }, this)
      });
    },
    sortId: function() {
      return this.sortAttr("id");
    },
    sortName: function() {
      return this.sortAttr("name");
    },
    sortAttr: function(attr) {
      var orderedCollection, reverseCollection;
      if (this.sortType === attr) {
        reverseCollection = this.collection.toJSON();
        reverseCollection.reverse();
        this.collection.reset(reverseCollection);
      } else {
        orderedCollection = this.collection.sortBy(attr);
        this.collection.reset(orderedCollection);
        this.sortType = attr;
      }
      return this.render();
    },
    addAll: function() {
      return this.collection.forEach(this.addOne, this);
    },
    addOne: function(customer) {
      var customerView;
      customerView = new CustomerView({
        model: customer
      });
      customerView.render();
      return this.$el.append(customerView.el);
    }
  });

}).call(this);
