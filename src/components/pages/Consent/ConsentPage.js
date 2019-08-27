import React from "react";
import PropTypes from "prop-types";

import Accordion from "../../ui/Accordion/Accordion";
import MainButton from "../../ui/MainButton/MainButton";

import pages from "../index.js";

import "./ConsentPage.css";

const accountDetails = (
  <ul className="cp-ul">
    <li>Account Type</li>
    <li>Account Number</li>
    <li>Account Balance</li>
  </ul>
);

const personalDetails = (
  <ul style={{ listStyleType: "disc" }}>
    <li>Name</li>
  </ul>
);

const transactions = (
  <ul style={{ listStyleType: "disc" }}>
    <li>Transaction Description</li>
    <li>Direction (Debit/Credit)</li>
    <li>Amount</li>
    <li>Running Balance (if available)</li>
  </ul>
);

const data = [
  {
    title: "Your Personal Details",
    paragraph: personalDetails,
    id: "personalDetails"
  },
  {
    title: "Your Account Details",
    paragraph: accountDetails,
    id: "accountDetails"
  },
  {
    title: "Your Transactions",
    paragraph: transactions,
    id: "transactions"
  }
];

const ConsentPage = ({ navigateToActionCreator }) => (
  <div className="page-container">
    <span className="con-title">Consent</span>

    <div className="con-subtitle">
      We need your approval to access the following information from the accounts you hold at your bank or building
      society.
    </div>

    <div className="con-data-bullets-title">
      <div>Data you will be sharing:</div>
    </div>

    <Accordion data={data} />

    <div className="con-footnote-bottom">
      <div className="con-button-row">
        <MainButton
          id="con-deny-button"
          onClick={() => navigateToActionCreator(pages.TermsOfServicePage)}
          text="Deny"
        />
        <MainButton
          id="con-consent-button"
          onClick={() => navigateToActionCreator(pages.ConnectInstitutionPage)}
          text="I Consent, Proceed"
        />
      </div>
    </div>
  </div>
);

ConsentPage.propTypes = {
  navigateToActionCreator: PropTypes.func
};

export default ConsentPage;
