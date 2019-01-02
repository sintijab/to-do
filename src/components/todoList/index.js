import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createTask, removeTask } from "../../actions/taskActions"
import { showOverlay } from "../../actions/modalActions"
import { isEmpty } from "../../common/utils"
import styles from "./todoList.scss"
import classNames from "classnames"

class TodoList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inputValid: true,
			createdTask: false,
			tasksStored: false,
			virtualTasks: [],
			newTask: null,
			modalDisplay: false,
			inputChange: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
		this.showModal = this.showModal.bind(this)
	}

	componentDidUpdate() {
		const {
			inputValid,
			createdTask,
			tasksStored,
			virtualTasks,
			newTask,
			inputChange,
		} = this.state
		const { error, tasks } = this.props
		const hasError = !isEmpty(error.payload)

		if (!isEmpty(tasks) && !tasksStored && !createdTask) {
			this.setState({
				virtualTasks: tasks,
				tasksStored: true,
			})
		}

		if (!!newTask && !hasError) {
			this.setState({
				virtualTasks: virtualTasks.concat(newTask),
				newTask: null,
			})
		} else if (hasError && !inputChange && inputValid) {
			const errorMsg = error.payload.message || ""
			const tasksValid = virtualTasks.slice(0, -1)

			this.setState({
				virtualTasks: tasksValid,
				errorMessage: errorMsg,
				inputValid: false,
			})
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		let title = this.title.value
		let description = this.description.value
		let { virtualTasks } = this.state
		let lastTask = virtualTasks.length
		let lastTaskID = 0
		if (lastTask.length > 0) {
			lastTaskID = virtualTasks[lastTask - 1].id
		}
		const newTaskId = lastTaskID + 1

		this.setState({
			inputChange: false,
			createdTask: true,
			newTask: {
				type: "tasks",
				id: newTaskId,
				attributes: {
					title: title,
					description: description,
				},
			},
		})
		this.props.createTask(title, description)
		this.title.value = ""
		this.description.value = ""
	}

	onChange() {
		const { inputValid, inputChange } = this.state
		if (!inputValid && !inputChange) {
			this.setState({
				createdTask: false,
				inputChange: true,
				inputValid: true,
			})
		}
	}

	deleteTask(id) {
		const { virtualTasks } = this.state
		const filtered = virtualTasks.filter(task => task.id === id)
		const taskIndex = virtualTasks.indexOf(filtered[0])
		let updatedList = virtualTasks
		updatedList.splice(taskIndex, 1)
		this.setState({
			virtualTasks: updatedList,
		})
		this.props.removeTask(id)
	}

	showModal(id, title, description) {
		this.setState({
			modalDisplay: true,
		})
		this.props.showOverlay(id, title, description)
	}

	render() {
		const { labels, error } = this.props
		const { inputValid, virtualTasks, createdTask } = this.state
		const hasTasks = virtualTasks.length > 0

		const { todoList } = labels
		const { title, newTaskTitle, submit, openTask } = todoList
		const inputErrorMsg = !isEmpty(error) && (error.payload.message || "")
		return (
			<div className={styles.board}>
				<form onSubmit={this.handleSubmit} className={styles.form_row}>
					<h1 className={styles.headline}>{newTaskTitle}</h1>
					<label className={styles.label}>
						<input
							type="text"
							className={styles.input}
							ref={input => {
								this.title = input
							}}
							placeholder={title}
							onChange={this.onChange}
							required
						/>
					</label>
					<label className={styles.label}>
						<textarea
							type="text"
							className={classNames(styles.input, styles.textarea)}
							ref={input => {
								this.description = input
							}}
							placeholder="&#x270f;"
							required
						/>
					</label>
					<input type="submit" value={submit} className={styles.submit_btn} />
					{!inputValid && createdTask && (
						<span className={styles.label_row}>{inputErrorMsg}</span>
					)}
				</form>
				{hasTasks &&
					virtualTasks.map(task => {
						const headline = task.attributes.title
						const text = task.attributes.description
						return (
							<div key={task.id} className={styles.list}>
								<div
									className={styles.delete}
									onClick={() => this.deleteTask(task.id)}
								/>
								<h1
									className={styles.title}
									onClick={() => this.showModal(headline, text, task.id)}
								>
									{headline}
								</h1>
								<p className={styles.description}>{text}</p>
								<span
									className={styles.link}
									onClick={() => this.showModal(headline, text, task.id)}
								>
									{openTask}
								</span>
							</div>
						)
					})}
			</div>
		)
	}
}

TodoList.propTypes = {
	labels: PropTypes.object,
}

const mapStateToProps = state => ({
	error: state.error,
	task: state.tasks.task,
})

export default connect(
	mapStateToProps,
	{ createTask, removeTask, showOverlay },
)(TodoList)
