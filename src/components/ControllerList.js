import React, { Component, PropTypes } from 'react'
import ControllerUnit from './ControllerUnit'

export default class ControllerList extends Component {
    render() {
        const { items, onChangeClick } = this.props;
        return (
            <nav className="controller-nav">
            	{items.map((item, index) =>
            		<ControllerUnit
            			key={index}
            			{...item}
            			onClick={() => onChangeClick(index)} />
				)}
        	</nav>)
    }
}

ControllerList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        inverse: PropTypes.bool.isRequired,
        position: PropTypes.number.isRequired
    }).isRequired).isRequired,
    onChangeClick: PropTypes.func.isRequired
}
