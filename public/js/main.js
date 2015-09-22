var RentalBox = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log( this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return(
      <div className='rentalBox'>
        <h1>Rentals</h1>
        <RentalList data={this.state.data} />
      </div>
    );
  }
});

var RentalList = React.createClass({
  render: function() {
    var rentalNodes = this.props.data.map(function(rental) {
      return (
        <Rental city={rental.city}>
          <p>Owner: {rental.owner}</p>
          <p>Number of bedrooms: {rental.bedrooms}</p>
        </Rental>
      );

    });

    return (
      <div className='RentalList'>
        {rentalNodes}
      </div>
    );
  }
});

var Rental = React.createClass({
  render: function() {
    return (
      <div className='rental'>
        <h3 className='rentalCity'>
          City: {this.props.city}
        </h3>
        {this.props.children}
     </div>
    );
  }
});


React.render(
  <RentalBox url='rentals.json'/>, document.getElementById('content')
);
