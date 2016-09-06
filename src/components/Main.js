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

class ImgFigure extends React.Component {
    render() {
        return (
            <figure className="img-figure">
                <img src={this.props.data.imageURL}
                    alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
}

class AppComponent extends React.Component {

    Constant: {
        centerPos: {
            left: 0,
            right: 0
        },
        hPosRange: { // 水平方向的取值范围
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        vPosRange: { // 垂直方向的取值范围
            x: [0, 0],
            topY: [0, 0]
        }
    };
    /* 
     * 重新布局所有图片
     * @param centerIndex 指定居中排布哪个图片
     */  
    reArrange(centerIndex) {

    };

    getInitialState() {
        return {
            imgsArrangeArr: [
                /*{
                    pos: {
                        left: '0',
                        top: '0'
                    }
                }*/
            ]
        };
    },
    // 组件加载以后，为每张图片计算位置的范围
    componentDidMount() {

        // 首先拿到舞台的大小
        let stageDOM = React.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        // 拿到一个imageFigure的大小
        let imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        // 计算中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        }
        // 计算左侧，右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX = [ - halfImgW, halfStageW - halfImgW * 3];
        this.Constant.hPosRange.rightSecX = [halfStageW + halfImgW * 3, stageW - halfImgW];
        this.Constant.hPosRange.y = [ - halfImgH, stageH - halfImgH];

        this.Constant.vPosRange.topY = [ - halfImgH, halfStageH - halfImgH * 3];
        this.Constant.vPosRange.x = [halfStageW - imgW, halfStageW];
        
    },


    render() {
        let controllerUnits = [],
            imgFigures = [];
        imageData.forEach(function (value, index) {

            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    }
                }
            }
            imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}/>);
        }.bind(this));
        return (
        	<section className="stage" ref="stage">
        		<section className="img-sec">
                    {imgFigures}
        		</section>
        		<nav className="controller-nav">
                    {controllerUnits}
        		</nav>
        	</section>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
