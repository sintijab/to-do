import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { closeOverlay, addComment } from "../../actions/modalActions"
import { isEmpty } from "../../common/utils"
import styles from "./modal.scss"

class Modal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			createdComment: false,
			commentsStored: false,
			virtualComments: [],
			newComment: null,
		}

		this.closeOverlay = this.closeOverlay.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	closeOverlay() {
		this.props.closeOverlay()
	}

	componentDidUpdate() {
		const {
			createdComment,
			commentsStored,
			virtualComments,
			newComment,
		} = this.state
		const { comments } = this.props

		if (!isEmpty(comments) && !commentsStored && !createdComment) {
			this.setState({
				virtualComments: comments.payload,
				commentsStored: true,
			})
		}

		if (!!newComment) {
			this.setState({
				virtualComments: virtualComments.concat(newComment),
				newComment: null,
			})
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		const newInputValue = this.comment.value
		const { virtualComments } = this.state
		const lastComment = virtualComments.length
		let lastCommentID = 0
		if (lastComment.length > 0) {
			lastCommentID = virtualComments[lastComment - 1].id
		}
		const newCommentId = lastCommentID + 1
		this.setState({
			createdComment: true,
			newComment: {
				type: "comments",
				id: newCommentId,
				attributes: {
					text: newInputValue,
				},
			},
		})
		const id = this.props.data.payload.id
		this.props.addComment(id, newInputValue)
	}

	render() {
		const { data, labels, modal, comments } = this.props
		const { virtualComments } = this.state
		const hasComments = virtualComments.length > 0
		const { text, title } = data.payload
		const { comment, commentTitle } = labels.modal
		const getComments =
			hasComments &&
			virtualComments.map(comment => {
				const commentText = comment.attributes.text
				return (
					<div key={comment.id} className={styles.list}>
						<p className={styles.description}>{commentText}</p>
					</div>
				)
			})
		const commentField = (
			<div className={styles.comments}>
				<form onSubmit={this.handleSubmit} className={styles.form_row}>
					<span className={styles.sub_title}>{commentTitle}</span>
					<input
						type="text"
						className={styles.textarea}
						ref={input => {
							this.comment = input
						}}
						placeholder={comment}
						required
					/>
					<input type="submit" value={comment} className={styles.submit_btn} />
				</form>
			</div>
		)
		return (
			<div className={styles.wrapper}>
				<div className={styles.wrapper_msg}>
					<div className={styles.header}>
						<div className={styles.close} onClick={this.closeOverlay} />
						<h1 className={styles.title}>{title}</h1>
					</div>
					<div className={styles.content}>
						<p>{text}</p>
						{commentField}
						{getComments}
					</div>
				</div>
			</div>
		)
	}
}

Modal.propTypes = {
	data: PropTypes.object,
}

const mapStateToProps = state => ({
	modal: state.modal,
	error: state.error,
	comments: state.comments,
})

export default connect(
	mapStateToProps,
	{ closeOverlay, addComment },
)(Modal)
