require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

let imageData = require('../data/imageData.json');

// 将图片名信息转成图片URL路径信息
imageData = ((imageDataArr) => {
    imageDataArr.forEach((value, index) => {
        let singleImageData = imageDataArr[index];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDataArr[index] = singleImageData;
    });
    return imageDataArr;
})(imageData);

class ImgFigure extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // imgFigure的点击处理函数
    handleClick(e) {
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        let styleObj = {};
        // 如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        // 如果图片的旋转角度有值并且不为0，添加旋转角度
        if (this.props.arrange.rotate) {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach((value) => styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)');
        }

        if (this.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }

        let imgFigureClassName = 'img-figure' + (this.props.arrange.isInverse ? ' is-inverse' : '');
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL}
                    alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}

/*
 * 获取区间内的随机值
 */
let getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);
// function getRangeRandom(low, high) {
//     return Math.floor(Math.random() * (high - low) + low);
// }
let get30DegRandom = () => (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30);

class ControllerUnit extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        // 如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应图片居中
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        let controllerUnitClassName = 'controller-unit';
        // 如果对应的是居中的图片，显示控制按钮的居中态
        if (this.props.arrange.isCenter) {
            controllerUnitClassName += ' is-center';
            // 如果同时对应的是翻转图片，显示控制按钮的翻转态
            controllerUnitClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
        }
        return (
            <span className={controllerUnitClassName} onClick={this.handleClick}>
            </span>
        );
    }
}

class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.Constant = {
            centerPos: {
                top: 0,
                left: 0
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
        this.state = {
            imgsArrangeArr: [
                /*{
                    pos: {
                        left: '0',
                        top: '0'
                    },
                    rotate: 0, // 旋转角度
                    isInverse: false, // 图片正反面
                    isCenter: false // 图片是否居中
                }*/
            ]
        };
    }

    /* 翻转图片
     * @param index 输入当前待被执行inverse操作的图片index
     * @return {function} 真正待被执行的闭包函数
     */
    inverse(index) {
        return () => {
            let imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr
            });
        }
    }

    /* 利用reArrange函数，居中对应index的图片
     * @param centerIndex 指定居中排布哪个图片
     * @return {Function}
     */
    center(index) {
        return () => this.reArrange(index);
    }

    /* 重新布局所有图片
     * @param centerIndex 指定居中排布哪个图片
     */
    reArrange(centerIndex) {
        // 简化外部变量
        let imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2), //取一张或者不取
            topImgSpliceIndex = 0,

            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        // 布局居中centerIndex的图片
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };

        // 取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach((value, index) => {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        });

        // 布局左右两侧的图片信息
        imgsArrangeArr.forEach((value, index) => {
            let hPosRangeLORX = null;

            if (index < imgsArrangeArr.length / 2) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[index] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        });

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr
        });
    }

    // 组件加载以后，为每张图片计算位置的范围
    componentDidMount() {

        // 首先拿到舞台的大小
        let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.floor(stageW / 2),
            halfStageH = Math.floor(stageH / 2);

        // 拿到一个imageFigure的大小
        let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.floor(imgW / 2),
            halfImgH = Math.floor(imgH / 2);

        // 计算中心图片的位置点
        this.Constant.centerPos = {
                left: halfStageW - halfImgW,
                top: halfStageH - halfImgH
            }
            // 计算左侧，右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX = [-halfImgW, halfStageW - halfImgW * 3];
        this.Constant.hPosRange.rightSecX = [halfStageW + halfImgW, stageW - halfImgW];
        this.Constant.hPosRange.y = [-halfImgH, stageH - halfImgH];

        this.Constant.vPosRange.topY = [-halfImgH, halfStageH - halfImgH * 3];
        this.Constant.vPosRange.x = [halfStageW - imgW, halfStageW];

        // this.reArrange(0); // 固定中间位置为第一张
        this.reArrange(Math.floor(Math.random() * imageData.length));

    }


    render() {
        let controllerUnits = [],
            imgFigures = [];
        imageData.forEach((value, index) => {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false

                }
            }
            imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
            controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
        });
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

AppComponent.defaultProps = {};

export default AppComponent;
