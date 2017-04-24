import React, { Component, PropTypes } from 'react'
import ImgFigure from './ImgFigure'

export default class ImgList extends Component {
    render() {
        const { width, height, items, refresh, onChangeClick } = this.props;
        return (
            <section className="img-sec">
                {items.map((item, index) =>
                    <ImgFigure
                        key={index}
                        width={width}
                        height={height}
                        {...item}
                        refresh={refresh}
                        onClick={() => onChangeClick(index)} />
                )}
            </section>)
    }
}

ImgList.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        imageURL: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        inverse: PropTypes.bool.isRequired,
        position: PropTypes.number.isRequired
    }).isRequired).isRequired,
    refresh: PropTypes.bool.isRequired,
    onChangeClick: PropTypes.func.isRequired
}
