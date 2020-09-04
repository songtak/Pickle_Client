import React, {useEffect, useRef, useState} from 'react';
import { Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useDispatch, useSelector} from 'react-redux';

import {
    setContainerClassnames,
    addContainerClassname,
    changeDefaultClassnames,
    changeSelectedMenuHasSubItems,
} from '../../commons/menuReducers';



const Sidebar = ({location})=>{
    const [selectedParentMenu, setSelectedParentMenu] = useState("")
    const [viewingParentMenu, setViewingParentMenu] = useState("")
    const [collapsedMenus, setCollapsedMenus] = useState([])


    const { containerClassnames,
        subHiddenBreakpoint,
        menuHiddenBreakpoint,
        menuClickCount,
        selectedMenuHasSubItems,
    } = useSelector(({menuReducers})=>({
        containerClassnames : menuReducers.containerClassnames,
        subHiddenBreakpoint : menuReducers.subHiddenBreakpoint,
        menuHiddenBreakpoint : menuReducers.menuHiddenBreakpoint,
        menuClickCount : menuReducers.menuClickCount,
        selectedMenuHasSubItems : menuReducers.selectedMenuHasSubItems
    }))

    const dispatch = useDispatch()
    const onSetContainerClassnames = (a,b,c) => dispatch(setContainerClassnames(a,b,c))
    const onAddContainerClassname =(a,b) => dispatch(addContainerClassname(a,b))
    const onChangeDefaultClassnames =a => dispatch(changeDefaultClassnames(a))
    const onChangeSelectedMenuHasSubItems =a => dispatch(changeSelectedMenuHasSubItems(a))

    const menuItems = [
        {
            id: 'notices',
            icon: 'iconsminds-magic-wand',
            label: '공지',
            to: '/teacher/notice',
        },
        {
            id: 'classes',
            icon: 'iconsminds-open-book',
            label: '과목',
            to: '/teacher/class',
            subs: [
                {
                    icon: 'simple-icon-notebook',
                    label: '수업 관리',
                    to: '/teacher/class/class',
                },
                {
                    icon: 'simple-icon-clock',
                    label: '시간표 관리',
                    to: '/teacher/class/timetable',
                },{
                    icon: 'simple-icon-speech',
                    label: '학습목표 관리',
                    to: '/teacher/class/detail',
                },
            ]
        },
        {
            id: 'streamings',
            icon: 'iconsminds-headset',
            label: '화상수업',
            to: '/teacherstreaming',

        },
        {
            id: 'grades',
            icon: 'iconsminds-line-chart-3',
            label: '성적',
            to: '/teacher/grade',
            subs: [
                {
                    icon: 'simple-icon-pie-chart',
                    label: '학년별 성적',
                    to: '/teacher/grade/grade',
                },
                {
                    icon: 'simple-icon-chart',
                    label: '학생별 성적',
                    to: '/teacher/grade/student',
                },
                {
                    icon: 'simple-icon-user-follow',
                    label: '학생 성적 입력',
                    to: '/teacher/grade/input',
                },
                {
                    icon: 'simple-icon-pin',
                    label: '모의고사 배치표',
                    to: '/teacher/grade/mock',
                }
            ]
        },
        {
            id: 'attendances',
            icon: 'iconsminds-calendar-4',
            label: '출석',
            to: '/teacher/attendance',
            subs: [
                {
                    icon: 'simple-icon-calendar',
                    label: '반별 출결 현황',
                    to: '/teacher/attendance/attendance',
                },
                {
                    icon: 'simple-icon-paper-clip',
                    label: '개별 출결 현황',
                    to: '/teacher/attendance/detail',
                }
            ]
        },
        {
            id: 'mypage',
            icon: 'iconsminds-gears',
            label: '마이페이지',
            to: '/teacher/mypage',
        },

    ];

    const handleWindowResize = (event) => {
        if (event && !event.isTrusted) {
            return;
        }
        const nextClasses = getMenuClassesForResize(containerClassnames);
        onSetContainerClassnames(
            0,
            nextClasses.join(' '),
            selectedMenuHasSubItems
        );
    };



    const  handleDocumentClick = (e) => {
        const container = getContainer()
        let isMenuClick = false;
        if (
            e.target &&
            e.target.classList &&
            (e.target.classList.contains('menu-button') ||
                e.target.classList.contains('menu-button-mobile'))
        ) {
            isMenuClick = true;
        } else if (
            e.target.parentElement &&
            e.target.parentElement.classList &&
            (e.target.parentElement.classList.contains('menu-button') ||
                e.target.parentElement.classList.contains('menu-button-mobile'))
        ) {
            isMenuClick = true;
        } else if (
            e.target.parentElement &&
            e.target.parentElement.parentElement &&
            e.target.parentElement.parentElement.classList &&
            (e.target.parentElement.parentElement.classList.contains('menu-button') ||
                e.target.parentElement.parentElement.classList.contains(
                    'menu-button-mobile'
                ))
        ) {
            isMenuClick = true;
        }
        if (container.contains(e.target) || container === e.target || isMenuClick) {
            return;
        }
        setViewingParentMenu("")
        toggle();
    };

    const getMenuClassesForResize = (classes) => {
        let nextClasses = classes.split(' ').filter((x) => x !== '');
        const windowWidth = window.innerWidth;
        if (windowWidth < menuHiddenBreakpoint) {
            nextClasses.push('menu-mobile');
        } else if (windowWidth < subHiddenBreakpoint) {
            nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
            if (
                nextClasses.includes('menu-default') &&
                !nextClasses.includes('menu-sub-hidden')
            ) {
                nextClasses.push('menu-sub-hidden');
            }
        } else {
            nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
            if (
                nextClasses.includes('menu-default') &&
                nextClasses.includes('menu-sub-hidden')
            ) {
                nextClasses = nextClasses.filter((x) => x !== 'menu-sub-hidden');
            }
        }
        return nextClasses;
    };


    const toggle = () => {
        const hasSubItems = getIsHasSubItem();
        const currentClasses = containerClassnames
            ? containerClassnames.split(' ').filter((x) => x !== '')
            : '';
        let clickIndex = -1;

        if (!hasSubItems) {
            if (
                currentClasses.includes('menu-default') &&
                (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
            ) {
                clickIndex = 1;
            } else if (
                currentClasses.includes('menu-sub-hidden') &&
                (menuClickCount === 2 || menuClickCount === 3)
            ) {
                clickIndex = 0;
            } else if (
                currentClasses.includes('menu-hidden') ||
                currentClasses.includes('menu-mobile')
            ) {
                clickIndex = 0;
            }
        } else if (
            currentClasses.includes('menu-sub-hidden') &&
            menuClickCount === 3
        ) {
            clickIndex = 2;
        } else if (
            currentClasses.includes('menu-hidden') ||
            currentClasses.includes('menu-mobile')
        ) {
            clickIndex = 0;
        }
        if (clickIndex >= 0) {
            onSetContainerClassnames(
                clickIndex,
                containerClassnames,
                hasSubItems
            );
        }
    };

    const handleProps = () => {
        addEvents();
    };

    const addEvents = () => {
        ['click', 'touchstart', 'touchend'].forEach((event) =>
            document.addEventListener(event, handleDocumentClick, true)
        );
    };

    const removeEvents = () => {
        ['click', 'touchstart', 'touchend'].forEach((event) =>
            document.removeEventListener(event, handleDocumentClick, true)
        );
    };

    const setSelectedLiActive = () => {
        const oldli = document.querySelector('.sub-menu  li.active');
        if (oldli != null) {
            oldli.classList.remove('active');
        }

        const oldliSub = document.querySelector('.third-level-menu  li.active');
        if (oldliSub != null) {
            oldliSub.classList.remove('active');
        }

        /* set selected parent menu */
        const selectedSublink = document.querySelector(
            '.third-level-menu  a.active'
        );
        if (selectedSublink != null) {
            selectedSublink.parentElement.classList.add('active');
        }

        const selectedlink = document.querySelector('.sub-menu  a.active');
        if (selectedlink != null) {
            selectedlink.parentElement.classList.add('active');
            setSelectedParentMenu(   {
                selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
                    'data-parent')
            })

        } else {
            const selectedParentNoSubItem = document.querySelector(
                '.main-menu  li a.active'
            );

            if (selectedParentNoSubItem != null) {
                setSelectedParentMenu(
                    {
                        selectedParentMenu: selectedParentNoSubItem.getAttribute(
                            'data-flag'
                        ),
                    }
                )
            } else if (selectedParentMenu === '') {
                setSelectedParentMenu(
                    {
                        selectedParentMenu: menuItems[0].id,
                    }
                )
            }
        }
    };

    const setHasSubItemStatus = () => {
        const hasSubmenu = getIsHasSubItem();
        onChangeSelectedMenuHasSubItems(hasSubmenu);
        toggle();
    };


    const getIsHasSubItem = () => {
        const menuItem = menuItems.find((x) => x.id === selectedParentMenu);
        if (menuItem)
            return !!(menuItem && menuItem.subs && menuItem.subs.length > 0);
        return false;
    };

    useEffect(()=>{
        setSelectedLiActive(setHasSubItemStatus);
        window.scrollTo(0, 0);
    },[location.pathname])

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        handleWindowResize();
        handleProps();
        setSelectedLiActive(setHasSubItemStatus);

        return () => {
            removeEvents()
            window.removeEventListener('resize', handleWindowResize);
        }
    }, [])

    const ref = useRef(null)
    const getContainer = () => {
        if (ref.current==null) console.log("null")
        return ref.current;
    }


    const openSubMenu = (e, menuItem) => {
        const selectedParent = menuItem.id;
        const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
        if (!hasSubMenu) {
            setViewingParentMenu(selectedParent)
            setSelectedParentMenu(selectedParent)
            toggle();
        } else {
            e.preventDefault();
            const currentClasses = containerClassnames
                ? containerClassnames.split(' ').filter((x) => x !== '')
                : '';

            if (!currentClasses.includes('menu-mobile')) {
                if (
                    currentClasses.includes('menu-sub-hidden') &&
                    (menuClickCount === 2 || menuClickCount === 0)
                ) {
                    onSetContainerClassnames(3, containerClassnames, hasSubMenu);
                } else if (
                    currentClasses.includes('menu-hidden') &&
                    (menuClickCount === 1 || menuClickCount === 3)
                ) {
                    onSetContainerClassnames(2, containerClassnames, hasSubMenu);
                } else if (
                    currentClasses.includes('menu-default') &&
                    !currentClasses.includes('menu-sub-hidden') &&
                    (menuClickCount === 1 || menuClickCount === 3)
                ) {
                    onSetContainerClassnames(0, containerClassnames, hasSubMenu);
                }
            } else {
                onAddContainerClassname(
                    'sub-show-temporary',
                    containerClassnames
                );
            }
            setViewingParentMenu(selectedParent
            )
        }
    };

    const toggleMenuCollapse = (e, menuKey) => {
        e.preventDefault();
        if (collapsedMenus.indexOf(menuKey) > -1) {
            setCollapsedMenus( collapsedMenus.filter((x) => x !== menuKey),
            )} else {
            collapsedMenus.push(menuKey);
            setCollapsedMenus(
                collapsedMenus
            )
        }
        return false;
    };


    return (
        <div className="sidebar" ref={ref}>
            <div className="main-menu">
                <div className="scroll">
                    <PerfectScrollbar
                        options={{ suppressScrollX: true, wheelPropagation: false }}
                    >
                        <Nav vertical className="list-unstyled">
                            {menuItems &&
                            menuItems.map((item) => {
                                return (
                                    <NavItem
                                        key={item.id}
                                        className={classnames({
                                            active:
                                                (selectedParentMenu === item.id &&
                                                    viewingParentMenu === '') ||
                                                viewingParentMenu === item.id,
                                        })}
                                    >
                                        {item.newWindow ? (
                                            <a
                                                href={item.to}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <i className={item.icon} />{' '}
                                            </a>
                                        ) : (
                                            <NavLink
                                                to={item.to}
                                                onClick={(e) => openSubMenu(e, item)}
                                                data-flag={item.id}
                                            >
                                                <i className={item.icon} />{' '}
                                                {item.label}
                                            </NavLink>
                                        )}
                                    </NavItem>
                                );
                            })}
                        </Nav>
                    </PerfectScrollbar>
                </div>
            </div>

            <div className="sub-menu">
                <div className="scroll">
                    <PerfectScrollbar
                        options={{ suppressScrollX: false, wheelPropagation: false }}
                    >
                        {menuItems &&
                        menuItems.map((item) => {
                            return (
                                <Nav
                                    key={item.id}
                                    className={classnames({
                                        'd-block':
                                            (selectedParentMenu === item.id &&
                                                viewingParentMenu === '') ||
                                            viewingParentMenu === item.id,
                                    })}
                                    data-parent={item.id}
                                >
                                    {item.subs &&
                                    item.subs.map((sub, index) => {
                                        return (
                                            <NavItem
                                                key={`${item.id}_${index}`}
                                                className={`${
                                                    sub.subs && sub.subs.length > 0
                                                        ? 'has-sub-item'
                                                        : ''
                                                }`}
                                            >
                                                {sub.newWindow ? (
                                                    <a
                                                        href={sub.to}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                    >
                                                        <i className={sub.icon} />{' '}

                                                    </a>
                                                ) : sub.subs && sub.subs.length > 0 ? (
                                                    <>
                                                        <NavLink
                                                            className={`rotate-arrow-icon opacity-50 ${
                                                                collapsedMenus.indexOf(
                                                                    `${item.id}_${index}`
                                                                ) === -1
                                                                    ? ''
                                                                    : 'collapsed'
                                                            }`}
                                                            to={sub.to}
                                                            id={`${item.id}_${index}`}
                                                            onClick={(e) =>
                                                                toggleMenuCollapse(
                                                                    e,
                                                                    `${item.id}_${index}`
                                                                )
                                                            }
                                                        >
                                                            <i className="simple-icon-arrow-down" />{' '}
                                                            {sub.label}
                                                        </NavLink>

                                                        <Collapse
                                                            isOpen={
                                                                collapsedMenus.indexOf(
                                                                    `${item.id}_${index}`
                                                                ) === -1
                                                            }
                                                        >
                                                            <Nav className="third-level-menu">
                                                                {sub.subs.map((thirdSub, thirdIndex) => {
                                                                    return (
                                                                        <NavItem
                                                                            key={`${item.id}_${index}_${thirdIndex}`}
                                                                        >
                                                                            {thirdSub.newWindow ? (
                                                                                <a
                                                                                    href={thirdSub.to}
                                                                                    rel="noopener noreferrer"
                                                                                    target="_blank"
                                                                                >
                                                                                    <i className={thirdSub.icon} />{' '}
                                                                                </a>
                                                                            ) : (
                                                                                <NavLink to={thirdSub.to}>
                                                                                    <i className={thirdSub.icon} />{' '}
                                                                                    {thirdSub.label}
                                                                                </NavLink>
                                                                            )}
                                                                        </NavItem>
                                                                    );
                                                                })}
                                                            </Nav>
                                                        </Collapse>
                                                    </>
                                                ) : (
                                                    <NavLink to={sub.to}>
                                                        <i className={sub.icon} />{' '}
                                                        {sub.label}
                                                    </NavLink>
                                                )}
                                            </NavItem>
                                        );
                                    })}
                                </Nav>
                            );
                        })}
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );



}




export default withRouter(Sidebar)