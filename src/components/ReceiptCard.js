import React, { useState, useEffect } from "react";
import { Item } from "semantic-ui-react";
import { Image, Transformation } from 'cloudinary-react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {deleteReceipt} from '../actions/deleteReceipt'
import { Link } from 'react-router-dom'


const StyledReceiptItem = styled.div`
  background-color: #e6e8e6;
  border-radius: 8px;
  margin: 8px;
  display: flex;
`;
const Content = styled.div`
margin: 20px;
width: 90%;
height: 100%;
background-color:#5bba6f
border-radius: 8px;
font-size: 1.5rem;
`;

const ReceiptImage = styled.div`
width: 55%;
margin: 20px;
`;


const ReceiptCard = (props) => {
  console.log(props);

  const [receipt, setReceipt] = useState({})
  console.log('receipt', receipt)

  const deleteHandler = () => {
    props.deleteReceipt(props.match.params.receiptID)
  }

  useEffect(() => {
    setReceipt(props.data.filter(item => item.id.toString() === props.match.params.receiptID))
  }, [props.data])

  return (
    <Item>
      {receipt.length && (
        <>
          <StyledReceiptItem>
            <Content>
              <Item.Content>
                <Item.Meta>{receipt[0].merchant}</Item.Meta>
                <Item.Header>Category: {receipt[0].category}</Item.Header>
                <Item.Description>
                  Amount: {receipt[0].amount_spent}
                </Item.Description>
                <Item.Extra> Date: {receipt[0].date}</Item.Extra>
              </Item.Content>

              <ReceiptImage>
                <Image
                  className="rec-img"
                  cloudName={"argordon"}
                  publicId={`${props.match.params.receiptID}`}
                />
              </ReceiptImage>
            </Content>
          </StyledReceiptItem>
          <div className='buttons'>
            <Link to={`/edit/${props.match.params.receiptID}`}><div className='edit-btn'>Edit</div></Link>
            <div className='del-btn' onClick={()=>deleteHandler()}>Delete</div>
          </div>
        </>
      )}
    </Item>


  )
    }

    const mapPropsToState = state => {
      return {
        data: state.data
      };
    };

export default connect(mapPropsToState, {deleteReceipt})(ReceiptCard)
