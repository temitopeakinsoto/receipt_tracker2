import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/App.css";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Nav";
import CreateNewUser from "./components/CreateNewUser";
import Login from "./components/Login";
import AddReceipt from "./components/AddReceipt";
import ReceiptCard from "./components/ReceiptCard";
import { deleteReceipt } from "./actions/deleteReceipt";
import { uploadPic } from './actions/uploadPic';
import EditReceipt from "./components/editReceipt";

function App(state) {
  console.log(state);
  return (
    <div className="App">
      <Nav />
      <Route path="/login" component={Login} />
      <Route
        path="/sign-up"
        // history={browserHistory}
        component={CreateNewUser}
      />
      {/* private routes below */}
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/add-receipt" component={AddReceipt} />
      <Route
        exact
        path="/:receiptID"
        render={props => (
          <ReceiptCard
            {...props}
            data={state.data}
            deleteReceipt={deleteReceipt}
          />
        )}
      />
      <Route
        exact
        path="/edit/:receiptID"
        render={props => <EditReceipt {...props} data={state.data} />}
      />
    </div>
  );
}

const mapPropsToState = state => {
  return {
    pic_success: state.pic_success,
    rec_id: state.rec_id,
    user_username: state.user_username,
    isLoading: state.isLoading,
    error: state.error,
    data: state.data
  };
};

export default connect(
  mapPropsToState,
  { deleteReceipt, EditReceipt, uploadPic }
)(App);
