import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { closeOverlay, getComments } from "../../actions/modalActions"
import { SHOW_OVERLAY, CLOSE_OVERLAY } from "../../actions/types"
import Modal from "../modal"
import styles from "./board.scss"

class Board extends Component {
	constructor(props) {
		super(props)

		this.state = {
			showOverlay: false,
		}
	}

	componentDidUpdate() {
		const { modal } = this.props
		const { showOverlay } = this.state
		const { id } = modal.payload

		if (modal.type === SHOW_OVERLAY && !showOverlay) {
			this.props.getComments(id)
			this.setState({
				showOverlay: true,
			})
		}
		if (modal.type === CLOSE_OVERLAY && showOverlay) {
			this.setState({
				showOverlay: false,
			})
		}
	}

	render() {
		const { modal, labels, comments } = this.props
		const { showOverlay } = this.state

		return (
			<div className={styles.board}>
				{showOverlay && (
					<Modal data={modal} labels={labels} comments={comments} />
				)}
				{this.props.children}
			</div>
		)
	}
}

Board.propTypes = {
	data: PropTypes.object,
	labels: PropTypes.object,
}

const mapStateToProps = state => ({
	modal: state.modal,
	error: state.error,
	comments: state.comments,
})

export default connect(
	mapStateToProps,
	{ closeOverlay, getComments },
)(Board)
