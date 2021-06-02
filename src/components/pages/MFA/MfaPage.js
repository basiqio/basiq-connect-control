import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../actions/basiqConnectAction';

import pages from '../index.js';

import MainButton from '../../ui/MainButton/MainButton';
import InputField from '../../ui/InputField/InputField';

import './MfaPage.css';

const MfaPage = ({ selectedInstitution, mfaInputs, mfaInputChanged, mfaChallengeStep, sendMfaRequest, sendingMfaResponse, mobile }) => {
	return (
		<div className="page-container" onKeyPress={(e) => (e.which === 13 ? () => {} : null)}>
			<span className="pc-title">
				<p>Login</p>
				<div style={{ width: '38px' }}></div>
			</span>
			<div className="pc-institution-logo">
				<img id="pc-logo" src={selectedInstitution.logo.links.full} alt={selectedInstitution.shortName} />
			</div>
			<div className="mfa-subtitle">
				{mfaChallengeStep.method === 'token'
					? `Please enter the code sent to your mobile (ending xxx ${mobile}).`
					: 'To continue with login, please answer the following security questions.'}
			</div>
			<div className="pc-form-container">
				<form className="pc-form" autoComplete="off">
					{mfaChallengeStep.input.map((question, i) => (
						<InputField
							id={`mfa-challenge-input-${i}`}
							key={`mfaChallengeInput-${i}`}
							placeholder={question}
							type="text"
							value={mfaInputs[i]}
							onChange={(e) => {
								mfaInputChanged({ input: e.target.value, index: i });
							}}
						/>
					))}
				</form>
			</div>
			<div className="pc-footnote-bottom">
				<MainButton
					id="pc-submit-button"
					text="Continue"
					loading={sendingMfaResponse}
					disabled={Object.values(mfaInputs).some((input) => !input || input.length === 0)}
					onClick={() => sendMfaRequest(mfaChallengeStep.links.response, Object.values(mfaInputs))}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

MfaPage.propTypes = {
	selectedInstitution: PropTypes.object
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MfaPage);
