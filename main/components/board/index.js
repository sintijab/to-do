import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { closeOverlay, getComments } from "../../actions/modalActions"
import { SHOW_OVERLAY, CLOSE_OVERLAY } from "../../actions/types"
import { isEmpty } from "../../common/utils"
import Modal from "../modal"
import styles from "./board.scss"

class Board extends Component {
	constructor(props) {
		super(props)

		this.state = {
			showOverlay: false,
			passData: false,
			title: "",
			text: "",
		}
	}

	componentDidUpdate() {
		const { modal } = this.props
		const { showOverlay, passData } = this.state
		const { id, title, text } = modal.payload

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
		if (!isEmpty(modal.payload) && modal.type === SHOW_OVERLAY && !passData) {
			this.setState({
				passData: true,
				title: title,
				text: text,
			})
		}
	}

	render() {
		const { labels, comments } = this.props
		const { showOverlay, title, text } = this.state

		return (
			<div className={styles.board}>
				{showOverlay && (
					<Modal
						title={title}
						text={text}
						labels={labels}
						comments={comments}
					/>
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
	comments: state.comments,
})

export default connect(
	mapStateToProps,
	{ closeOverlay, getComments },
)(Board)
