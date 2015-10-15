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
        console.log(data);
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  delete: function(rental) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'DELETE',
      contentType: 'application/json',
      data:  JSON.stringify({city: rental.city, owner: rental.owner, bedrooms: rental.bedrooms, id: rental.id}),
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)

    });
  },
  update: function(data) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(data),
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({ data: data });
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
        <div className='row form-button'>
          <RentalForm onRentalSubmit={this.handleRentalSubmit}/>
          <ShowForm />
        </div>
        <div className='row'>
          <RentalList data={this.state.data} onHandleDelete={this.delete} update={this.update}/>
        </div>
      </div>
    );
  }
});

var RentalList = React.createClass({

  handleDelete: function(data) {
    this.props.onHandleDelete(data);
    },
    update: function(data) {
      this.props.update(data);
    },
  render: function() {
    var rentalNodes = this.props.data.map(function(rental) {
      return (
        <Rental city={rental.city} owner={rental.owner} bedrooms={rental.bedrooms} handleDelete={this.handleDelete} id={rental.id} update={this.update}>
          <p>Owner: {rental.owner}</p>
          <p>Number of bedrooms: {rental.bedrooms}</p>
        </Rental>
      );

    }.bind(this));

    return (
      <div className='RentalList'>
        {rentalNodes}
      </div>
    );
  }
});

var Rental = React.createClass({
  onDelete: function() {
   if(confirm("Are you sure?")) {
     this.props.handleDelete(this.props);
   }
  },
  update: function(data){
    this.props.update(data);
  },
  render: function() {
    return (
      <div className='rental col-sm-3'>
        <h3 className='rentalCity'>
          City: {this.props.city}
        </h3>
        {this.props.children}
        <a className='btn btn-danger' onClick={this.onDelete}>delete</a>
        <ShowUpdateForm id={this.props.id}/>
        <UpdateRentalForm data={this.props} id={this.props.id} update={this.update}/>

     </div>
    );
  }
});
var UpdateRentalForm = React.createClass({
  getInitialState: function() {
    return { values: { city: this.props.data.city, onwer: this.props.data.owner, bedrooms: this.props.data.bedrooms } };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var city = React.findDOMNode(this.refs.city).value.trim();
    var owner = React.findDOMNode(this.refs.owner).value.trim();
    var bedrooms = React.findDOMNode(this.refs.bedrooms).value.trim();
    this.setState({ values:
      {
        city: city !== '' ? city : this.props.data.city,
        owner: owner !== '' ? owner : this.props.data.owner,
        bedrooms: bedrooms !== '' ? bedrooms : this.props.data.bedrooms
      }
    });
    console.log(this.state.values);
    this.props.update({ city: city, owner: owner, bedrooms: bedrooms, id: this.props.id });

    React.findDOMNode(this.refs.city).value = '';
    React.findDOMNode(this.refs.owner).value = '';
    React.findDOMNode(this.refs.bedrooms).value = '';
    $('.rentalUpdateForm').hide();
    return;

  },
  hideForm: function() {
    $('.rentalUpdateForm').hide();
    $('.showUpdateForm').show();
  },
  render: function() {
    var values = this.state.values;
    return (
      <form className='rentalUpdateForm' id={this.props.id} onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label>Enter City:</label>
          <input type='text' className='form-control' placeholder='Enter city' ref='city' placeholder={values.city} />
        </div>
        <div className='form-group'>
          <label>Enter Owner:</label>
          <input type='text' className='form-control' placeholder='Enter owner'  ref='owner' placeholder={values.owner}/>
        </div>
        <div className='form-group'>
          <label>Enter Bedrooms:</label>
          <input className='form-control' type="number" min='1' max='99' ref='bedrooms' placeholder='Enter bedrooms' placeholder={values.bedrooms}/>
        </div>
        <button className='btn btn-danger' onClick={this.hideForm}>Cancel</button>
        <button type='submit' value='Post' className='btn btn-success'>Post</button>

      </form>
    );
  }
});
var RentalForm = React.createClass({
  hideForm: function() {
    $('.rentalForm').hide();
    $('.showForm').show();

  },
  handleSubmit: function(e) {
    e.preventDefault();
    $(".rentalForm").hide();
    $(".showForm").show();
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
        <div className='form-group'>
          <label>Enter City:</label>
          <input type='text' className='form-control' placeholder='Enter city' ref='city' required="required" />
        </div>
        <div className='form-group'>
          <label>Enter Owner:</label>
          <input type='text' className='form-control' placeholder='Enter owner'  ref='owner' required="required" />
        </div>
        <div className='form-group'>
          <label>Enter Bedrooms:</label>
          <input className='form-control' type="number" min='1' max='99' ref='bedrooms' placeholder='Enter bedrooms' required='required' />
        </div>
        <button className='btn btn-danger' onClick={this.hideForm}>Cancel</button>
        <button type='submit' value='Post' className='btn btn-success'>Post</button>

      </form>
    );
  }
});

var ShowUpdateForm = React.createClass({
  onClick: function() {
    $("#" + this.props.id).show();
    $("#" + this.props.id + "showUpdateForm").hide();
  },
  render: function() {
    return (
      <button className='showUpdateForm btn btn-primary' onClick={this.onClick}>Update Rental</button>
    );
  }
});


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
