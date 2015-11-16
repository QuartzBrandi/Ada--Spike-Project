window.CustomerView = Backbone.View.extend({
  className: "customer",
  template: _.template(
'<h3><%= name %> <small>ID: <%= id %></small></h3>\
<p><%= address %><br>\
<%= city + ", " + state + " " + postal_code %><br>\
Phone: <%= phone %><br>\
Account Credit: <%= account_credit %></p>'
  ),
  render: function() {
    this.$el.html(this.template(this.model.attributes));
  }
});
