import React, { useState } from "react";
import { GiCash } from "react-icons/gi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
// import { HiOutlineCurrencyRupee } from "react-icons/hi";
import "./App.css";

function App() {
  const [checkButton, setCheckButton] = useState(false);
  const [newState, setNewState] = useState("");
  const [cashOutput, setCashOutput] = useState("");
  const [showFooter, setShowFooter] = useState(false);

  var billAmount, cashAmount, balanceAmount;
  // var currencyArr = ["2000", "500", "100", "20", "10", "5", "1"];
  var currencyArr = [2000, 500, 100, 20, 10, 5, 1];
  var noteArr = [];

  function billHandler(event) {
    billAmount = event.target.value;
  }

  function cashHandler(event) {
    cashAmount = event.target.value;
  }

  function checkClickHandler() {
    if (cashAmount > 0) {
      balanceAmount = cashAmount - Math.floor(billAmount);
      var amountToReturn = balanceAmount;
      if (balanceAmount === 0) {
        var output = <p>No change needed to be returned!</p>;
      } else if (balanceAmount < 0) {
        output = <p>You need to pay &#8377;{billAmount - cashAmount} more </p>;
      } else {
        setShowFooter(true);
        for (var i = 0; i < currencyArr.length; i++) {
          var quotient = Math.floor(balanceAmount / Number(currencyArr[i]));
          // console.log(quotient);
          noteArr[i] = quotient;
          balanceAmount = balanceAmount % currencyArr[i];
        }
        output = (
          <div className="cashReturn">
            <h2>Change to return: &#8377;{amountToReturn}</h2>
            <div className="outputTable">
              <table className="notes">
                <tr>
                  <th className="noteHeading">Note</th>
                </tr>
                {currencyArr.map((cur) => {
                  return (
                    <tr>
                      <td className="note" key="cur">
                        &#8377;{cur}
                      </td>
                    </tr>
                  );
                })}
              </table>
              <table className="numOfNotes">
                <tr>
                  <th className="numHeading">No of Notes</th>
                </tr>
                {noteArr.map((note) => {
                  return (
                    <tr>
                      <td className="numNote" key="note">
                        {note}
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        );
      }
    } else {
      output = <p>Invalid Amount paid!</p>;
    }
    setCashOutput(output);
  }

  function nextClickHandler() {
    if (billAmount > 0) {
      setCheckButton(!checkButton);
      var newState = (
        <div className="cashDiv">
          <h3>Cash Paid</h3>
          <input
            className="cashInput"
            onChange={cashHandler}
            type="number"
          ></input>
          <br />
          <button onClick={checkClickHandler}>Check</button>
        </div>
      );
    } else {
      newState = <p>Invalid Bill Amount!</p>;
    }
    setNewState(newState);
  }

  function resetClickHandler() {
    setCheckButton(!checkButton);
    setNewState("");
    setCashOutput("");
    setShowFooter(false);
    document.querySelector(".billInput").value = "";
    document.querySelector(".cashInput").value = "";
  }
  return (
    <div className="App">
      <div className="wrapper">
        <h1>
          <GiCash />
          Cash Register Manager
        </h1>
        <p>
          Enter the bill amount and cash given by the customer and know minimum
          number of notes to return.
        </p>
        <h3>Bill Amount</h3>{" "}
        <input
          className="billInput"
          onChange={billHandler}
          type="number"
          min="1"
        ></input>{" "}
        <br />
        {!checkButton ? (
          <button onClick={nextClickHandler}>Next</button>
        ) : (
          <button onClick={resetClickHandler}>Reset</button>
        )}
        {newState}
        {cashOutput}
      </div>
      {showFooter ? (
        <footer>
          <div className="footer-text">&copy; Satyaki | 2020</div>
          <div className="social-links">
            <a href="https://linkedin.com/in/satyaki07" target="_blank">
              <FaLinkedinIn color="0077B5" size="1.5rem" />
            </a>
            <a href="https://github.com/satyaki07" target="_blank">
              <FaGithubSquare color="#333" size="1.5rem" />
            </a>
            <a href="https://twitter.com/satyaki_07" target="_blank">
              <FaTwitter color="55acee" size="1.5rem" />
            </a>
          </div>
        </footer>
      ) : null}
    </div>
  );
}

export default App;
