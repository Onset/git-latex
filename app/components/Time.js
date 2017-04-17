const React = require('react')
const e = React.createElement
const Component = React.Component
const bindActionCreators = require('redux').bindActionCreators
const connect = require('react-redux').connect
const moment = require('moment')

class Time extends Component {

	constructor(props) {
		super(props)

		this.state = {
			time: '…',
		}
	}


	componentDidMount() {
		moment.locale(this.props.settings.language)
		this.tick()
	}


	tick() {
		this.updateTime(this.tock)
	}


	tock() {
		this.updateTime(this.tick)
	}


	firstUpper(text) {
		return text.charAt(0).toUpperCase() + text.slice(1)
	}


	updateTime(beat) {
		const time = this.firstUpper(moment(this.props.date).fromNow())
		if (time !== this.state.time) {
			this.setState(Object.assign({}, this.state, { time }))
		}
		this.timer = setTimeout(() => {
			beat.call(this)
		}, 1000)
	}


	componentWillUnmount() {
		clearTimeout(this.timer)
	}

	render() {

		return (
			e(
				'div',
				{
					title: moment(this.props.date).format(),
				},
				this.state.time
			)
		)
	}
}


function mapStateToProps(state) {
	return {
		settings: state.settings,
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Time)