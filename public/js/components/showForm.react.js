var ShowForm = React.createClass({
  onClick: function() {
    $(".rentalForm").show();
    $(".showForm").hide();
  },
  render: function() {
    return (
      <button className='showForm btn btn-primary' onClick={this.onClick}>Add Rental</button>
    );
  }
});

React.render(
  <RentalBox url='rentals.json'/>, document.getElementById('content')
);
