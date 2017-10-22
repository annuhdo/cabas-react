import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { randomId } from '../helpers.js';
import styled from 'styled-components'
import {
    Button,
    HorizontalFlex
} from '../styles/'

const Nav = styled('nav') `
    background: white;
    width: 200px;
    order: 3;
    padding: 20px 15px;
    box-sizing: border-box;
    position: relative;
    display: ${ props => props.display};
    min-height: 100vh;

    @media (max-width: 790px) {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
    }
`

const CloseButton = styled('div') `
    line-height: 0;
    font-size: 12px;
    background: #4A5080;
    color: white;
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-weight: 600;
    position: absolute;
    right: 15px;
    cursor: pointer;

    &:before {
        ${HorizontalFlex}
        content: '✕';
        position: absolute;
        margin: auto;
        width: 100%;
        height: 100%;
    }

    &:hover {
        background: rgba(244, 104, 104, 0.8);
    }
`

const Header = styled('div') `
    flex: 1;
    font-weight: 500;
    font-size: 1.8em;
`

const ActionButtons = styled('div') `
    ${HorizontalFlex}
    justify-content: space-between;
    margin-top: 20px;
`

const PrimaryButton = styled('button') `
    ${Button}
    background: #808cee;
    color: white;
    box-sizing: border-box;
`

const SecondaryButton = styled('button') `
    ${Button}
    box-sizing: border-box;

    &:hover {
        background: hsla(0,86%,68%,.8);
        color: white;
        border: 1px solid transparent;
    }
`

const ListDirectory = styled('ul') `
    font-size: 1.6em;
    box-sizing: border-box;
    margin-top: 15px;

    li:hover {
        background: ${ props => props.editable ? 'white' : '#808CEE'};
        color: ${ props => props.editable ? '#6E7292' : 'white'};
    }
`

const List = styled('li') `
    max-width: 100%;
    padding: 20px;
    background: ${ props => props.current === 'current' ?
        'rgb(238, 242, 245)' : '#eef2f5'};
    text-align: center;
    border-radius: 5px;
    border: 1px solid #FCFCFD;
    position: relative;
    cursor: pointer;

    &:hover {
        ${ props => props.current === 'current' &&
        'background: rgb(238, 242, 245) !important; color: #4A5080 !important;'};
    }
`

const ListName = styled('div') `
    overflow: hidden;
    word-wrap: normal;
`

const LeaveBlock = styled('div') `
    ${HorizontalFlex}
    content: 'Leave this list';
    background: hsla(0,86%,68%,.8);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    border-radius: 5px;

    &:hover {
        background: transparent;
        color: transparent;
    }
`

const FootNote = styled('div') `
    font-size: 1.2em;
    line-height: 1.4;
    background: #4A5080;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
    display: ${ props => props.display};
`

class RightNav extends Component {
    constructor() {
        super();
        this.renderLists = this.renderLists.bind(this);
        this.leaveList = this.leaveList.bind(this);
        this.redirectNewList = this.redirectNewList.bind(this);
    }

    leaveList(key) {
        let res = window.confirm(`You are about to leave list: ${key}. Are you sure?`)
        
        if (res) {
            this.props.leaveList(key);
        }
    }

    transitionToList(key) {
        this.props.router.history.push(`/lists/${key}`);
    }

    decideLeave(key) {
        if (this.props.removableList) {
            this.leaveList(key);
        } else {
            if (key === this.props.listId) {
                return;
            }
            this.transitionToList(key);
        }
    }

    renderLists(key) {
        const leaveButton = <LeaveBlock>Leave this list</LeaveBlock>
        return (
            <List
                current={key === this.props.listId ? 'current' : 'normal'}
                title={key}
                key={key}
                onClick={() => this.decideLeave(key)}
            >
                <ListName title={key}>
                    {this.props.lists[key].listName || key}
                </ListName>

                {this.props.removableList ? leaveButton : null}
            </List>
        )
    }

    redirectNewList(e) {
        const newPath = randomId();
        this.transitionToList(newPath);
    }

    render() {
        return (
            <Nav display={this.props.openRightNav ? 'block' : 'none'}>

                <CloseButton onClick={this.props.closeLists}></CloseButton>

                <Header>My Lists</Header>

                <ActionButtons>
                    <PrimaryButton
                        name="add-list"
                        onClick={this.redirectNewList}
                    >
                        New
                        </PrimaryButton>
                    <SecondaryButton
                        name="removeList"
                        onClick={this.props.toggleDisplay}>
                        {this.props.removableList ? "Done" : "Leave"}
                    </SecondaryButton>
                </ActionButtons>

                <ListDirectory editable={this.props.removableList}>
                    {Object.keys(this.props.lists).map(this.renderLists)}
                </ListDirectory>

                <FootNote display={this.props.removableList ? 'block' : 'none'}>
                    You will be able to join the list again by accessing the URL of the list.
                </FootNote>
            </Nav>
        );
    }
}

RightNav.propTypes = {
    leaveList: PropTypes.func,
    router: PropTypes.object,
    removableList: PropTypes.bool,
    listId: PropTypes.string,
    openRightNav: PropTypes.bool,
    closeLists: PropTypes.func,
    lists: PropTypes.object,
}

export default RightNav;