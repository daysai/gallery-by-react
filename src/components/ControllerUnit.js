import React, { Component, PropTypes } from 'react'

export default class ControllerUnit extends Component {
    render() {
        const { inverse, position, onClick } = this.props;
        let controllerUnitClassName = 'controller-unit';
        if (position === 0) {
            controllerUnitClassName += ' is-center' + (inverse ? ' is-inverse' : '');
        }
        return (
            <span className={controllerUnitClassName}
                onClick={onClick}>
            </span>
        )
    }
}

ControllerUnit.propTypes = {
    inverse: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}
