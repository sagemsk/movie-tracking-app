import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TinyMCE from 'react-tinymce';

import * as reviewActions from './../../actions/reviewActions';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <input className="form-control" placeholder={label} type={type} {...input} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const scoreField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <input type={type} className="form-control" placeholder="Input a score between 1 - 10" min="1" max="10" {...input} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const reviewField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <TinyMCE 
        {...input}
        content={'Review Here'}
        className="form-control"
        type={type}
        config={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
      />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
); // placeholder="Write your review here."
//<textarea type={type} className="form-control" {...input} rows="10"></textarea>


let CreateNewReview = (props) => {
  const { error, handleSubmit, pristine, reset, submitting, input } = props;
  const createNewReviewPost = (newReview) => props.createNewReview(newReview);
  // const editorConfig = {
  //   plugins: 'link image code',
  //   toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  // };
  // <Field name="review" component={reviewField} type="textarea" label="Review" />
  return (
    <form onSubmit={handleSubmit(createNewReviewPost)} className="container">
      <Link to="/username/movies" className="btn">Back to List</Link>
      <Field name="title" component={renderField} type="text" label="Title" />
      <Field name="score" component={scoreField} type="number" label="Score" />
      <Field name="review" component={reviewField} type="textarea" label="Review" />

      <button className="btn" disabled={pristine || submitting} action="submit">Submit Review</button>
    </form>
  )
}

CreateNewReview = reduxForm({
  form: 'newreviewform'
})(CreateNewReview);

CreateNewReview = connect(null, reviewActions)(CreateNewReview);

export default CreateNewReview;