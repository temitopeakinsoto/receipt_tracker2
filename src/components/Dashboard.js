import React, { Fragment, useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";
import Nav from "../components/Nav";
import TabContent from "./TabContent";
import { resetAsyncProps } from "../actions";
import { getReceipts } from "../actions/getReceipts";
import { deleteReceipt } from "../actions/deleteReceipt";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner';
import Search from "./Search";
import "../App.css";

const Dashboard = props => {

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [counter, setCounter] = useState(false);

  const searchClickHandler = () => {
    setIsSearching(!isSearching);
  };

  // Need to put this useEffect in the single Receipt component
  useEffect(() => {
    console.log("Dashboard mounted");
    props.resetAsyncProps();
  }, [])

  console.log("FROM THE DASH-", props.data);
  const panes = [
    {
      menuItem: "Recent",
      pane: {
        content: (
          <Fragment>
            <div className="tabHeading">
              {isSearching === false ? (
                <>
                  <h2>Your Receipts</h2>
                  <h2 className="searchButton" onClick={searchClickHandler}>
                    Search
                  </h2>
                </>
              ) : (
                <Search
                  allData={props.data}
                  isSearching={isSearching}
                  setIsSearching={setIsSearching}
                  setSearchResults={setSearchResults}
                />
              )}
              {!isSearching && (
                null//<ModalAddReceipt setCounter={setCounter} counter={counter} />
              )}
            </div>
            {isSearching === false
              ? props.data.map(data => {
    
                  return (
                    <Link
                      to={`/${data.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TabContent
                        merchant={data.merchant}
                        date={data.date}
                        total={data.amount_spent}
                        id={data.id}
                        deleteReceipt={props.deleteReceipt}
                        setCounter={setCounter}
                        counter={counter}
                      />
                    </Link>
                  );
                })
              : searchResults && searchResults.map(data => {
                console.log(searchResults)
                  return (
                    <Link
                      to={`/${data.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TabContent
                        merchant={data.merchant}
                        date={data.date}
                        total={data.amount_spent}
                        id={data.id}
                        deleteReceipt={props.deleteReceipt}
                        setCounter={setCounter}
                        counter={counter}
                      />
                    </Link>
                  );
                })}

            {/* <Spent time={"month"} /> */}
          </Fragment>
        )
      }
    },
    {
      menuItem: "3 Month Overview",
      pane: {
        content: (
          <Fragment>
            <div className="tabHeading">
              {isSearching === false ? (
                <>
                  <h2>Your Receipts</h2>
                  <h2 className="searchButton" onClick={searchClickHandler}>
                    Search
                  </h2>
                </>
              ) : (
                <Search
                  allData={props.data}
                  isSearching={isSearching}
                  setIsSearching={setIsSearching}
                  setSearchResults={setSearchResults}
                />
              )}
              {!isSearching && (
                null//<ModalAddReceipt setCounter={setCounter} counter={counter} />
              )}
            </div>
            {isSearching === false
              ? props.data.map(data => {
                  return (
                    <Link
                      to={`/${data.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TabContent
                        merchant={data.merchant}
                        date={data.date}
                        total={data.amount_spent}
                        id={data.id}
                        setCounter={setCounter}
                        counter={counter}
                        deleteReceipt={props.deleteReceipt}
                      />
                    </Link>
                  );
                })
              : searchResults.map(data => {
                  return (
                    <Link
                      to={`/${data.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TabContent
                        merchant={data.merchant}
                        date={data.date}
                        total={data.amount_spent}
                        id={data.id}
                        setCounter={setCounter}
                        counter={counter}
                        deleteReceipt={props.deleteReceipt}
                      />
                    </Link>
                  );
                })}
           {/* <Spent time={"3 months"} /> */}
          </Fragment>
        )
      }
    },
    {
      menuItem: "All Receipts",
      pane: {
        content: (
          <Fragment>
            <div className="tabHeading">
              {isSearching === false ? (
                <>
                  <h2>Your Receipts</h2>
                  <h2 className="searchButton" onClick={searchClickHandler}>
                    Search
                  </h2>
                </>
              ) : (
                <Search
                  allData={props.data}
                  isSearching={isSearching}
                  setIsSearching={setIsSearching}
                  setSearchResults={setSearchResults}
                />
              )}
              {!isSearching && (
                null//<ModalAddReceipt setCounter={setCounter} counter={counter} />
              )}
            </div>
            {isSearching === false
              ? props.data.map(data => {
                  return (
                    <Link
                      to={`/${data.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TabContent
                        merchant={data.merchant}
                        date={data.date}
                        total={data.amount_spent}
                        id={data.id}
                        deleteReceipt={props.deleteReceipt}
                        setCounter={setCounter}
                        counter={counter}
                      />
                    </Link>
                  );
                })
              : searchResults.map(data => {
                  return (
                    <Link
                      to={`/${data.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TabContent
                        merchant={data.merchant}
                        date={data.date}
                        total={data.amount_spent}
                        id={data.id}
                        deleteReceipt={props.deleteReceipt}
                        setCounter={setCounter}
                        counter={counter}
                      />
                    </Link>
                  );
                })}
            {/* <Spent time={"year"} /> */}
          </Fragment>
        )
      }
    }
  ];

  useEffect(() => {
    props.getReceipts(props);
    console.log("Dashboard mounted", props);
  }, [counter]);

  return (
    <div>
      <Nav/>
      {
        props.isLoading ? (
          <Loader
                type="Puff"
                color="#00BFFF"
                /> 
        ) :
        <Tab
          style={{ backgroundColor: "#e6e8e6" }}
          panes={panes}
          renderActiveOnly={false}
        />
      }
    </div>
  );
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
  };
};

export default connect(
  mapPropsToState,
  { getReceipts: getReceipts, resetAsyncProps, deleteReceipt: deleteReceipt }
)(Dashboard);
