window.Customers = Backbone.Collection.extend({
  model: Customer,
  url: "http://localhost:3000/customers/"
});
