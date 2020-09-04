import React from 'react';
import { NavLink } from 'react-router-dom';
import {Col, Row} from 'reactstrap';

const Footer = () => {
    return (
        <footer className="page-footer">
            <div className="footer-content">
                <div className="container-fluid">
                    <Row>
                        <Col xxs="12" sm="6" widths={['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']}/>
                        <Col className="col-sm-6 d-none d-sm-block" widths={['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']} >
                            <ul className="breadcrumb pt-0 pr-0 float-right">
                                <p className="mb-0 text-muted">Team Bitbox 2020</p>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
