const defaultMenuType = 'menu-default';

const subHiddenBreakpoint = 1440;
const menuHiddenBreakpoint = 768;

const menuConstants = {
    MENU_SET_CLASSNAMES : 'MENU_SET_CLASSNAMES',
    MENU_CONTAINER_ADD_CLASSNAME : 'MENU_CONTAINER_ADD_CLASSNAME',
    MENU_CLICK_MOBILE_MENU : 'MENU_CLICK_MOBILE_MENU',
    MENU_CHANGE_DEFAULT_CLASSES : 'MENU_CHANGE_DEFAULT_CLASSES',
    MENU_CHANGE_HAS_SUB_ITEM_STATUS :
        'MENU_CHANGE_HAS_SUB_ITEM_STATUS'
}


export const changeSelectedMenuHasSubItems = (payload) => {
    return {
        type:menuConstants.MENU_CHANGE_HAS_SUB_ITEM_STATUS,
        payload,
    };
};

export const changeDefaultClassnames = (strCurrentClasses) => {
    return {
        type: menuConstants.MENU_CHANGE_DEFAULT_CLASSES,
        payload: strCurrentClasses,
    };
};

export const addContainerClassname = (classname, strCurrentClasses) => {
    const newClasses =
        !strCurrentClasses.indexOf(classname) > -1
            ? `${strCurrentClasses} ${classname}`
            : strCurrentClasses;
    return {
        type: menuConstants.MENU_CONTAINER_ADD_CLASSNAME,
        payload: newClasses,
    };
};

export const clickOnMobileMenu = (strCurrentClasses) => {
    const currentClasses = strCurrentClasses
        ? strCurrentClasses
            .split(' ')
            .filter((x) => x !== '' && x !== 'sub-show-temporary')
        : '';
    let nextClasses;
    if (currentClasses.includes('main-show-temporary')) {
        nextClasses = currentClasses
            .filter((x) => x !== 'main-show-temporary')
            .join(' ');
    } else {
        nextClasses = `${currentClasses.join(' ')} main-show-temporary`;
    }
    return {
        type: menuConstants.MENU_CLICK_MOBILE_MENU,
        payload: { containerClassnames: nextClasses, menuClickCount: 0 },
    };
};

export const setContainerClassnames = (
    clickIndex,
    strCurrentClasses,
    selectedMenuHasSubItems
) => {
    const currentClasses = strCurrentClasses
        ? strCurrentClasses.split(' ').filter((x) => x !== '')
        : '';
    let nextClasses = '';
    if (!selectedMenuHasSubItems) {
        if (
            currentClasses.includes('menu-default') &&
            (clickIndex % 4 === 0 || clickIndex % 4 === 3)
        ) {
            clickIndex = 1;
        }
        if (currentClasses.includes('menu-sub-hidden') && clickIndex % 4 === 2) {
            clickIndex = 0;
        }
        if (
            currentClasses.includes('menu-hidden') &&
            (clickIndex % 4 === 2 || clickIndex % 4 === 3)
        ) {
            clickIndex = 0;
        }
    }

    if (clickIndex % 4 === 0) {
        if (
            currentClasses.includes('menu-default') &&
            currentClasses.includes('menu-sub-hidden')
        ) {
            nextClasses = 'menu-default menu-sub-hidden';
        } else if (currentClasses.includes('menu-default')) {
            nextClasses = 'menu-default';
        } else if (currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-sub-hidden';
        } else if (currentClasses.includes('menu-hidden')) {
            nextClasses = 'menu-hidden';
        }
        clickIndex = 0;
    } else if (clickIndex % 4 === 1) {
        if (
            currentClasses.includes('menu-default') &&
            currentClasses.includes('menu-sub-hidden')
        ) {
            nextClasses = 'menu-default menu-sub-hidden main-hidden sub-hidden';
        } else if (currentClasses.includes('menu-default')) {
            nextClasses = 'menu-default sub-hidden';
        } else if (currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-sub-hidden main-hidden sub-hidden';
        } else if (currentClasses.includes('menu-hidden')) {
            nextClasses = 'menu-hidden main-show-temporary';
        }
    } else if (clickIndex % 4 === 2) {
        if (
            currentClasses.includes('menu-default') &&
            currentClasses.includes('menu-sub-hidden')
        ) {
            nextClasses = 'menu-default menu-sub-hidden sub-hidden';
        } else if (currentClasses.includes('menu-default')) {
            nextClasses = 'menu-default main-hidden sub-hidden';
        } else if (currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-sub-hidden sub-hidden';
        } else if (currentClasses.includes('menu-hidden')) {
            nextClasses = 'menu-hidden main-show-temporary sub-show-temporary';
        }
    } else if (clickIndex % 4 === 3) {
        if (
            currentClasses.includes('menu-default') &&
            currentClasses.includes('menu-sub-hidden')
        ) {
            nextClasses = 'menu-default menu-sub-hidden sub-show-temporary';
        } else if (currentClasses.includes('menu-default')) {
            nextClasses = 'menu-default sub-hidden';
        } else if (currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-sub-hidden sub-show-temporary';
        } else if (currentClasses.includes('menu-hidden')) {
            nextClasses = 'menu-hidden main-show-temporary';
        }
    }
    if (currentClasses.includes('menu-mobile')) {
        nextClasses += ' menu-mobile';
    }
    return {
        type: menuConstants.MENU_SET_CLASSNAMES,
        payload: { containerClassnames: nextClasses, menuClickCount: clickIndex },
    };
};
const INIT_STATE = {
    containerClassnames: defaultMenuType,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount: 0,
    selectedMenuHasSubItems: defaultMenuType === 'false', // if you use menu-sub-hidden as default menu type, set value of this variable to false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case menuConstants.MENU_CHANGE_HAS_SUB_ITEM_STATUS:
            return { ...state, selectedMenuHasSubItems: action.payload };

        case menuConstants.MENU_SET_CLASSNAMES:
            return {
                ...state,
                containerClassnames: action.payload.containerClassnames,
                menuClickCount: action.payload.menuClickCount,
            };

        case menuConstants.MENU_CLICK_MOBILE_MENU:
            return {
                ...state,
                containerClassnames: action.payload.containerClassnames,
                menuClickCount: action.payload.menuClickCount,
            };

        case menuConstants.MENU_CONTAINER_ADD_CLASSNAME:
            return { ...state, containerClassnames: action.payload };

        case menuConstants.MENU_CHANGE_DEFAULT_CLASSES:
            return { ...state, containerClassnames: action.payload };

        default:
            return { ...state };
    }
};
