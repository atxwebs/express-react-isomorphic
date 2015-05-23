var React = require('react');

var NotFoundHandler = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h1>404 Page not found!</h1>
      </div>
    );
  }
});

module.exports = NotFoundHandler;