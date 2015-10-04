var TestMessage = React.create({
  render: function() {
    return (
      <div className="test">
        testing
      </div>
    );
  }
});

React.render(<TestMessage />, document.getElementById('app'));
