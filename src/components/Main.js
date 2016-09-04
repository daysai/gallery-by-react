require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imageData = require('../data/imageData.json');
let yeomanImage = require('../images/yeoman.png');

// 将图片名信息转成图片URL路径信息
imageData = (function genImageURL(imageDataArr) {
	for (var i = 0; i < imageDataArr.length; i++) {
		let singleImageData = imageDataArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDataArr[i] = singleImageData;
	}
	return imageDataArr;
})(imageData);

class AppComponent extends React.Component {
  render() {
    return (
    	<section className="stage">
    		<section className="img-sec">
    		</section>
    		<nav className="controller-nav">
    		</nav>
    	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
