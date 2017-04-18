require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import stageApp from './reducers'
import { zoomStage } from './actions/actions'

let imageData = require('./data/imageData.json'),
    initState = {
        stage: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };

// 将图片名信息转成图片URL路径信息
initState.items = ((imageDataArr) => {
    let stateItems = [],
        centerIndex = Math.floor(Math.random() * imageDataArr.length);
    imageDataArr.forEach((value, index) => {
        let singleImageData = Object.assign({
            imageURL: require('./images/' + value.fileName),
            inverse: false,
            position: (index === centerIndex) ? 0 : ((index < imageDataArr.length / 2) ? 2 : 3)
        }, value);
        stateItems.push(singleImageData);
    });
    return stateItems;
})(imageData);

let store = createStore(stageApp, initState);

let appElement = document.getElementById('app');
render(
    <Provider store={store}>
        <App />
    </Provider>,
    appElement
)

let resizeTimer = null;
window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        store.dispatch(zoomStage(window.innerWidth, window.innerHeight))
    }, 300);
});
