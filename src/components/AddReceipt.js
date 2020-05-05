import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form as SemForm } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { addNewReceipt, uploadPic } from "../actions/index";
import { data as optionData } from '../data/data';

const errorStyle = {
  fontSize: "1em",
  color: "red"
};

const AddReceiptForm = props => {
  console.log(props);
  
  const initialState = {
    date: '',
    amount_spent: null,
    category: '',
    merchant: '',
    user_username: props.user_username
  };
  
  const [formData, setFormData] = useState(initialState);
  const [selectedPic, setSelectedPic] = useState({});
  const [pic, setPic] = useState('')
  
  useEffect(() => {
    setPic(props.rec_id)
  }, [props.rec_id]);
  
  useEffect(() => {
    // POST to Cloudinary
    props.uploadPic(selectedPic, pic)
  }, [pic]);
  
  props.pic_success && props.history.push('/');
  
  return (
    <div>
      <SemForm className="formContainers">
        <form onSubmit={(event) => {
          event.preventDefault();
          // POST to back-end
          props.addNewReceipt(formData);
          }
        }
        >
          <SemForm.Field>
            <input 
              type="date" 
              name="date" 
              placeholder="date"
              onChange={(event) => setFormData({...formData, date: event.target.value})}
            />
          </SemForm.Field>

          <SemForm.Field>
            <input 
              type="number" 
              step="0.01"
              min="0"
              max="100000"
              name="amount_spent" 
              placeholder="Enter amount" 
              onChange={(event) => setFormData({...formData, amount_spent: event.target.value})}
            />
          </SemForm.Field>

          <SemForm.Field>
            <select 
              name="category" 
              onChange={(event) => setFormData({...formData, category: event.target.value})}
            >
              {optionData.map(cat => {
                return <option name='category' value={cat.option}>{cat.option}</option>
              })}
            </select>
          </SemForm.Field>

          <SemForm.Field>
            <input 
              type="text" 
              name="merchant" 
              placeholder="Enter merchant info:" 
              onChange={(event) => setFormData({...formData, merchant: event.target.value})}
            />
          </SemForm.Field>

          <SemForm.Field>
            <input 
              type="file" 
              name="image" 
              id="upload" 
              onChange={(event) => setSelectedPic(event.target.files[0])}
            />
          </SemForm.Field>
        
         <Button
          style={{
            margin: "1em auto",
            backgroundColor: "#25BB49",
            color: "white" 
          }}
            type="submit"
        >
          Add Receipt &rarr;
        </Button>
        </form>
      </SemForm>
    </div>
  )
};

const mapPropsToState = state => {
    console.log(state);
    return {
        pic_success: state.pic_success,
        rec_id: state.rec_id,
        user_username: state.user_username,
        isLoading: state.isLoading,
        error: state.error,
        data: state.data
    }
};

export default connect(
  mapPropsToState,
  { addNewReceipt, 
    uploadPic 
  })(AddReceiptForm);
