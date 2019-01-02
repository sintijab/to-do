import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getTasks } from "../../actions/taskActions"
import { setCookie, getCookie } from "../../common/utils"
import styles from "./view.scss"
import LoginForm from "../loginForm"
import Header from "../header"
import TodoList from "../todoList"

class View extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoggedInUser: false,
		}
	}

	componentDidMount() {
		const { isLoggedInUser } = this.state
		const hasToken = getCookie("token")
		if (!!hasToken && !isLoggedInUser) {
			this.setState({
				isLoggedInUser: true,
			})
			this.props.getTasks(hasToken)
		}
	}

	componentDidUpdate() {
		const { userStatus } = this.props
		const { isLoggedInUser } = this.state
		const hasLoggedIn = sessionStorage.getItem("isLoggedIn")

		if (hasLoggedIn && !isLoggedInUser) {
			setCookie("token", userStatus.payload, 1)
			this.setState({
				isLoggedInUser: true,
			})
			this.props.getTasks(userStatus.payload)
		}
		if (!hasLoggedIn && isLoggedInUser) {
			this.setState({
				isLoggedInUser: false,
			})
		}
	}
	render() {
		const { labels, userTasks } = this.props
		const { isLoggedInUser } = this.state
		const { loggedInMsg } = labels.loginForm
		const email = sessionStorage.getItem("userEmail")

		return (
			<div className={styles.wrap}>
				{isLoggedInUser && <Header email={email} loggedInMsg={loggedInMsg} />}
				{isLoggedInUser && <TodoList tasks={userTasks.tasks} labels={labels} />}
				{!isLoggedInUser && <LoginForm labels={labels} />}
			</div>
		)
	}
}

View.propTypes = {
	labels: PropTypes.object,
	userStatus: PropTypes.object,
}

const mapStateToProps = state => ({
	userStatus: state.loginStatus,
	userTasks: state.tasks,
	error: state.error,
})

export default connect(
	mapStateToProps,
	{ getTasks },
)(View)
