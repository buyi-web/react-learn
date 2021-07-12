import React, { Component } from 'react'
import matchPath from "./matchPath"
import Route from "./Route"
import ctx from './RouterContext'
export default class Switch extends Component {

    // 循环children，得到第一个匹配的Route组件，若没有匹配，则返回null

    getMatchChild = ({ location }) => {
        let children = [];
        if(Array.isArray(this.props.children)) {
            children = this.props.children
        }else if(typeof this.props.children === 'object') { // 只有一个Route
            children = [this.props.children]
        }
        for (const child of children) {
            if(child.type !== Route) {
                throw new TypeError("the children of Switch component must be type of Route");
            }
            // 判断该子元素是否能够匹配
            const {path = '/', exact = false, strict = false, sensitive = false} = child.props
            const result = matchPath(path, location.pathname, {exact, strict, sensitive})
            if(result) {
                return child
            }
        }
        return null
    }
    render() {
        return (
            <ctx.Consumer>
                {this.getMatchChild}
            </ctx.Consumer>
        )
    }
}
