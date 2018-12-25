import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getLoginStatus } from "../../actions/loginActions"
import { requestTasks } from "../../actions/taskActions"
import { CLIENT_FAILED, LOGGED_IN, LOGGED_OUT } from "../../actions/types"
import { isEmpty } from "../../common/utils"
import styles from "./loginForm.scss"

class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userEmail: "",
			inputChange: false,
			loginFailed: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	componentDidUpdate() {
		const { userState, error } = this.props
		const { loginFailed, inputChange } = this.state

		const hasLoggedIn = userState.type === LOGGED_IN && !!userState.payload
		const hasLoggedOut = userState.type === LOGGED_OUT
		const hasInputError =
			!isEmpty(error.payload) && error.type === CLIENT_FAILED
		const loggedInFailed = hasInputError && !inputChange && !hasLoggedIn

		if (hasLoggedIn) {
			sessionStorage.setItem("isLoggedIn", true)
			sessionStorage.setItem("userEmail", this.email.value)
		}
		if (loggedInFailed && !loginFailed) {
			this.setState({
				loginFailed: true,
			})
		}
		if (loginFailed && hasLoggedIn) {
			this.setState({
				loginFailed: false,
			})
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		const { inputChange } = this.state
		let username = this.email.value
		let password = this.password.value

		if (inputChange) {
			this.setState({ inputChange: false })
		}
		this.props.getLoginStatus(username, password)
	}

	onChange() {
		const { loginFailed, inputChange } = this.state
		if (loginFailed && !inputChange) {
			this.setState({
				inputChange: true,
				loginFailed: false,
			})
		}
	}

	render() {
		const { labels } = this.props
		const { loginForm } = labels
		const { loginFailed } = this.state

		const signInForm = (
			<form onSubmit={this.handleSubmit} className={styles.form_row}>
				<label className={styles.label}>
					<input
						type="email"
						className={styles.input}
						ref={input => {
							this.email = input
						}}
						placeholder={loginForm.email}
						onChange={this.onChange}
					/>
				</label>
				<label className={styles.label}>
					<input
						type="password"
						className={styles.input}
						ref={input => {
							this.password = input
						}}
						placeholder={loginForm.password}
						onChange={this.onChange}
						required
					/>
				</label>
				<input
					type="submit"
					value="Submit"
					className={styles.submit_btn}
					required
				/>
				{loginFailed && (
					<span className={styles.label_row}>{loginForm.loggedInErrorMsg}</span>
				)}
			</form>
		)

		return <div className={styles.form}>{signInForm}</div>
	}
}

LoginForm.propTypes = {
	labels: PropTypes.object,
	userState: PropTypes.object,
}

const mapStateToProps = state => ({
	userState: state.loginStatus,
	error: state.error,
})

export default connect(
	mapStateToProps,
	{ getLoginStatus },
)(LoginForm)
