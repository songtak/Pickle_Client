import React, {useState} from 'react';

import {NavLink} from 'react-router-dom';
import {clickOnMobileMenu, setContainerClassnames} from '../../commons/menuReducers';
import {useDispatch, useSelector} from 'react-redux';
import {UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';

const TopNav = ({history}) => {
    const {
        containerClassnames,
        menuClickCount,
        selectedMenuHasSubItems
    } = useSelector(({menuReducers}) => ({
        containerClassnames: menuReducers.containerClassnames,
        menuClickCount: menuReducers.menuClickCount,
        selectedMenuHasSubItems: menuReducers.selectedMenuHasSubItems
    }))
    const dispatch = useDispatch()
    const onSetContainerClassnames = (a, b, c) => dispatch(setContainerClassnames(a, b, c))
    const onClickOnMobileMenu = (a, b) => dispatch(clickOnMobileMenu(a, b))


    const menuButtonClick = (e, _clickCount, _conClassnames) => {
        e.preventDefault();
        setTimeout(() => {
            const event = document.createEvent('HTMLEvents');
            event.initEvent('resize', false, false);
            window.dispatchEvent(event);
        }, 350);
        onSetContainerClassnames(
            _clickCount + 1,
            _conClassnames,
            selectedMenuHasSubItems
        );
    };

    const mobileMenuButtonClick = (e, _containerClassnames) => {
        e.preventDefault();
        onClickOnMobileMenu(_containerClassnames);
    };
    const handleLogout = () => {
        localStorage.clear();
        window.location.href='/home'
    };
    return (
        <nav className="navbar fixed-top">
            <div className="d-flex align-items-center navbar-left">
                <NavLink
                    to="#"
                    location={{}}
                    className="menu-button d-none d-md-block"
                    onClick={(e) =>
                        menuButtonClick(e, menuClickCount, containerClassnames)
                    }
                >
                    <svg
                        className="main"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 9 17"
                    >
                        <rect x="0.48" y="0.5" width="7" height="1" />
                        <rect x="0.48" y="7.5" width="7" height="1" />
                        <rect x="0.48" y="15.5" width="7" height="1" />
                    </svg>
                    <svg
                        className="sub"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 18 17"
                    >
                        <rect x="1.56" y="0.5" width="16" height="1" />
                        <rect x="1.56" y="7.5" width="16" height="1" />
                        <rect x="1.56" y="15.5" width="16" height="1" />
                    </svg>
                </NavLink>
                <NavLink
                    to="#"
                    location={{}}
                    className="menu-button-mobile d-xs-block d-sm-block d-md-none"
                    onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
                        <rect x="0.5" y="0.5" width="25" height="1" />
                        <rect x="0.5" y="7.5" width="25" height="1" />
                        <rect x="0.5" y="15.5" width="25" height="1" />
                    </svg>
                </NavLink>
            </div>
            <a className="navbar-logo" href="/student">
                <span className="logo d-none d-xs-block"/>
                <span className="logo-mobile d-block d-xs-none"/>
            </a>

            <div className="navbar-right">
                <div className="header-icons d-inline-block align-middle">

                </div>
                <div className="user d-inline-block">
                    <UncontrolledDropdown className="dropdown-menu-right">
                        <DropdownToggle className="p-0" color="empty">
                            <span className="name mr-1">{localStorage.getItem("name")}</span>
                            <span>
                    </span>
                        </DropdownToggle>
                        <DropdownMenu className="mt-3" right>
                            <NavLink to="/student/mypage"><DropdownItem>마이페이지</DropdownItem></NavLink>
                            <DropdownItem divider/>
                            <DropdownItem onClick={() => handleLogout()}>
                                로그아웃
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </div>
        </nav>
    );
};


export default TopNav