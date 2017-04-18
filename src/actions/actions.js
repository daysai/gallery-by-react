/*
 * action 类型
 */

export const CHANGE_CENTER = 'CHANGE_CENTER';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const ZOOM_STAGE = 'ZOOM_STAGE';

/*
 * action 创建函数
 */

export function changeCenter(index) {
    return {
        type: CHANGE_CENTER,
        topNum: Math.floor(Math.random() * 2),
        topRan: Math.random(),
        index
    }
}

export function toggleItem(index) {
    return {
        type: TOGGLE_ITEM,
        index
    }
}

export function zoomStage(width, height) {
    return {
        type: ZOOM_STAGE,
        width,
        height
    }
}
