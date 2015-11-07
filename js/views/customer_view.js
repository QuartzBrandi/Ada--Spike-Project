window.CustomerView = Backbone.View.extend({
  className: "customer",
  template: _.template('<h3><%= name %></h3>'),
  render: function() {
    this.$el.html(this.template(this.model.attributes));
  }
});
