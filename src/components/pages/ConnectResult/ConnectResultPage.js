import React from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../../actions/basiqConnectAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import pages from '../index.js';
import { ConnectResult } from '../../../reducers/initialState';

import MainButton from '../../ui/MainButton/MainButton';
import BounceAnimation from '../../ui/SpinnerAnimation/SpinnerAnimation';

import successImage from '../../../assets/images/tick.svg';
import failureImage from '../../../assets/images/cancel-icon.svg';

import './ConnectResultPage.css';

const ConnectResultPage = ({ connectResult, bankConnectFinished, navigateToActionCreator, connectError }) => {
	let title = 'Connecting...';
	let illustration = <BounceAnimation />;
	let subtitle = 'Retrieving data...';
	let subtitle2 = '';

	if (connectResult === ConnectResult.SUCCESS) {
		title = 'Success';
		illustration = <img style={{ width: '96px' }} src={successImage} alt="Success" />;
		subtitle = 'Your data has been successfully submitted.';
	} else if (connectResult === ConnectResult.FAILURE) {
		title = 'Error';
		illustration = <img style={{ width: '96px' }} src={failureImage} alt="Failure" />;
		if (connectError && connectError.code === 'access-denied') {
			if (connectError.detail === 'Token has expired') {
				subtitle = 'Session has timed out. (Error 403)';
				subtitle2 = 'Please verify your phone number again.';
			} else {
				subtitle = connectError.detail;
			}
		} else {
			subtitle = 'Error connecting to bank.';
		}
	}

	return (
		<div className="page-container">
			<div className="cr-title">
				{connectResult === ConnectResult.FAILURE ? (
					<span
						className="cr-back-icon"
						style={{ marginLeft: '20px' }}
						onClick={() => navigateToActionCreator(pages.ProvideCredentialsPage)}>
						‹
					</span>
				) : null}
				<p>{title}</p>
				{connectResult === ConnectResult.FAILURE ? <div style={{ width: '38px' }}></div> : null}
			</div>
			<div className="cr-result-container">
				<div>
					{illustration}
					{subtitle2 ? (
						<div className="cr-text">
							<div>{subtitle}</div>
							<div>{subtitle2}</div>
						</div>
					) : (
						<div className="cr-text">{subtitle}</div>
					)}
				</div>
			</div>

			<div className="cr-footnote-bottom">
				<MainButton
					id="cr-continue-button"
					disabled={connectResult === ConnectResult.PENDING}
					text="Continue"
					onClick={() => {
						if (connectError && connectError.code === 'access-denied' && connectError.detail === 'Token has expired') {
							window.location.reload();
						} else {
							bankConnectFinished();
						}
					}}
				/>
			</div>
		</div>
	);
};

ConnectResultPage.propTypes = {
	partnerName: PropTypes.string
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectResultPage);
