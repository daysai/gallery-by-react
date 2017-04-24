import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { changeCenter, toggleItem, zoomStage } from '../actions/actions'
import ControllerList from '../components/ControllerList'
import ImgList from '../components/ImgList'

class App extends Component {
    render() {
        const { dispatch, stage, items, refresh } = this.props
        return (
            <section className="stage" ref="stage">
                <ImgList
                    {...stage}
                    items={items}
                    refresh={refresh}
                    onChangeClick={index => {
                        if (items[index].position === 0) {
                            dispatch(toggleItem(index))
                        } else {
                            dispatch(changeCenter(index))
                        }
                    }
                } />
                <ControllerList
                    items={items}
                    onChangeClick={index => {
                        if (items[index].position === 0) {
                            dispatch(toggleItem(index))
                        } else {
                            dispatch(changeCenter(index))
                        }
                    }
                } />
            </section>
        )
    }

    componentDidMount() {
        const { dispatch } = this.props;
        let stageDOM = findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight;
        dispatch(zoomStage(stageW, stageH));
    }
}

App.propTypes = {
    stage: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        imageURL: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        inverse: PropTypes.bool.isRequired,
        position: PropTypes.number.isRequired
    }).isRequired).isRequired,
    refresh: PropTypes.bool.isRequired
}

App = connect((state)=>state)(App)
export default App
