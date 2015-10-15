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
