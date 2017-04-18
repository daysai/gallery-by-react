import React, { Component, PropTypes } from 'react'

export default class ImgFigure extends Component {
    render() {
        const { width, height, imageURL, title, desc, inverse, position, onClick } = this.props;
        let imgFigureClassName = 'img-figure' + (inverse ? ' is-inverse' : ''),
            styleObj = {};
        // 标尺变量
        let stageW = width,
            stageH = height,
            halfStageW = Math.floor(stageW / 2),
            halfStageH = Math.floor(stageH / 2),
            imgW = 200,
            imgH = 200,
            halfImgW = Math.floor(imgW / 2),
            halfImgH = Math.floor(imgH / 2),
            // 计算中心图片的位置点
            centerPos = {
                left: halfStageW - halfImgW,
                top: halfStageH - halfImgH
            },
            // 计算左侧，右侧区域图片排布位置的取值范围
            hPosRange = {
                leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
                rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
                y: [-halfImgH, stageH - halfImgH]
            },
            vPosRange = {
                topY: [-halfImgH, halfStageH - halfImgH * 3],
                x: [halfStageW - imgW, halfStageW]
            };
        // 简化标尺变量
        let hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x;

        if (position === 0) {
            styleObj.top = centerPos.top;
            styleObj.left = centerPos.left;
            styleObj.zIndex = 11;
        } else {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach((value) => styleObj[value] = 'rotate(' + get30DegRandom() + 'deg)');
            if (position === 1) {
                styleObj.top = getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]);
                styleObj.left = getRangeRandom(vPosRangeX[0], vPosRangeX[1]);
            } else if (position === 2) {
                styleObj.top = getRangeRandom(hPosRangeY[0], hPosRangeY[1]);
                styleObj.left = getRangeRandom(hPosRangeLeftSecX[0], hPosRangeLeftSecX[1]);
            } else {
                styleObj.top = getRangeRandom(hPosRangeY[0], hPosRangeY[1]);
                styleObj.left = getRangeRandom(hPosRangeRightSecX[0], hPosRangeRightSecX[1]);
            }
        }
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={onClick}>
                <img src={imageURL} alt={title} />
                <figcaption>
                    <h2 className="img-title">{title}</h2>
                    <div className="img-back">
                        <p>{desc}</p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}

ImgFigure.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    inverse: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}

/*
 * 获取区间内的随机值
 */
let getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);

let get30DegRandom = () => (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30);
