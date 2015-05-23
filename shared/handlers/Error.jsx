var React = require('react');

var NotFoundHandler = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h4>Whoops, there's been an Error!</h4>
      </div>
    );
  }
});

module.exports = NotFoundHandler;