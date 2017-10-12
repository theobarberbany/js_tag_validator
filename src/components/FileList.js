import React, { Component } from 'react'
import PropTypes from 'prop-types'

// From react-dnd examples
export default class FileList extends Component {
	static propTypes = {
		files: PropTypes.arrayOf(PropTypes.object),
	}

	list(files) {
		return files.map(file => (
			<ul
				key={file.name}
			>{`'${file.name}' of size '${file.size}' and type '${file.type}'`}</ul>
		))
	}

	render() {
		const { files } = this.props

		if (files.length === 0) {
			return <div>Nothing to display</div>
		}

		return <div>{this.list(files)}</div>
	}
}