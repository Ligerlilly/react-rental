var UpdateRentalForm = React.createClass({
  // getInitialState: function() {
  //   return { values: { city: this.props.data.city, onwer: this.props.data.owner, bedrooms: this.props.data.bedrooms } };
  // },
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
  //var values = this.state.values;
  return (
    <form className='rentalUpdateForm' id={this.props.id} onSubmit={this.handleSubmit}>
    <div className='form-group'>
    <label>Enter City:</label>
    <input type='text' className='form-control' placeholder='Enter city' ref='city' placeholder='Enter City:' />
    </div>
    <div className='form-group'>
    <label>Enter Owner:</label>
    <input type='text' className='form-control' placeholder='Enter owner'  ref='owner' placeholder='Enter Owner:'/>
    </div>
    <div className='form-group'>
    <label>Enter Bedrooms:</label>
    <input className='form-control' type="number" min='1' max='99' ref='bedrooms' placeholder='Enter bedrooms' placeholder='Enter Bedrooms:'/>
    </div>
    <button className='btn btn-danger' onClick={this.hideForm}>Cancel</button>
    <button type='submit' value='Post' className='btn btn-success'>Post</button>

    </form>
  );
}
});
