import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { setCookie } from "../../common/utils"
import { logout } from "../../actions/loginActions"
import styles from "./header.scss"

class Header extends Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		sessionStorage.removeItem("isLoggedIn")
		sessionStorage.removeItem("userEmail")
		setCookie("token", "", -1)
		this.props.logout()
	}

	render() {
		const { loggedInMsg, email } = this.props
		return (
			<div className={styles.nav}>
				<span>
					{loggedInMsg}
					<a className={styles.userName}>{email}</a>
					<input
						type="submit"
						value="Log out"
						className={styles.submit_btn}
						onClick={this.handleSubmit}
					/>
				</span>
			</div>
		)
	}
}

Header.propTypes = {
	loggedInMsg: PropTypes.string,
	email: PropTypes.string,
}

const mapStateToProps = state => ({
	userStatus: state.loginStatus,
	error: state.error,
})

export default connect(
	mapStateToProps,
	{ logout },
)(Header)
