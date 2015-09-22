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
  handleRentalSubmit: function(rental) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: rental,
      cache: false,
      success: function(data) {
        console.log(data)
        this.setState({ data: data })
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return(
      <div className='rentalBox'>
        <h1>Rentals</h1>
        <RentalList data={this.state.data} />
        <RentalForm onRentalSubmit={this.handleRentalSubmit}/>
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

var RentalForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var city = React.findDOMNode(this.refs.city).value.trim();
    var owner = React.findDOMNode(this.refs.owner).value.trim();
    var bedrooms = React.findDOMNode(this.refs.bedrooms).value.trim();
    if (!city || !owner || !bedrooms){
      return;
    }

    this.props.onRentalSubmit({ city: city, owner: owner, bedrooms: bedrooms });
    React.findDOMNode(this.refs.city).value = '';
    React.findDOMNode(this.refs.owner).value = '';
    React.findDOMNode(this.refs.bedrooms).value = '';
    return;
  },
  render: function() {
    return (
      <form className='rentalForm' onSubmit={this.handleSubmit}>
        <div class='form-control'>
          <input type='text' placeholder='Enter city' ref='city' />
          <input type='text' placeholder='Enter owner'  ref='owner' />
          <input type='text' placeholder='Enter bedrooms' ref='bedrooms' />
        </div>
        <input type='submit' value='Post' class='btn btn-success' />
      </form>
    );
  }
});

React.render(
  <RentalBox url='rentals.json'/>, document.getElementById('content')
);
