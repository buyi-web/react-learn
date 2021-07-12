import React from 'react'
import ctx from '../react-router/RouterContext'
import { parsePath } from "history"  // 官方history 比自己写的 createLocationByPath  处理更全面
//parsePath的作用，是根据一个路径字符串，返回一个location对象

export default function Link(props) {
    return (
        <ctx.Consumer>
            {value => {
                const {to, ...rest} = props
                let loc = {}
                // 统一将to 的值转化成对象处理
                if(typeof props.to === 'object') {
                    loc = props.to
                }else if(typeof props.to === 'string') {
                    loc = parsePath(props.to)
                }
                const href = value.history.createHref(loc);
                return <a {...rest} href={href} onClick={ e => {
                    e.preventDefault(); //阻止默认行为
                    value.history.push(loc);
                }}>{props.children}</a>
            }}
        </ctx.Consumer>
    )
}
