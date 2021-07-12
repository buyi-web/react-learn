import React from 'react'
import { BrowserRouter, Link, NavLink } from "./react-router-dom"
import { Route, Switch } from './react-router'

function Page1() {
  return <h1>Page1</h1>
}


function Page2(value) {

    console.log('page2：ctx',value);
    return <div>{value.location.pathname}</div>

}


export default function App() {
    return (
        <BrowserRouter>
          <ul>
            <li>
              <Link to="/page2">跳转page2</Link>
            </li>
            <li>
              <NavLink to="/page1">跳转到页面1</NavLink>
            </li>
          </ul>
          <Switch>
              <Route path="/page1" component={Page1} exact />
              <Route path="/page2" component={Page2} />
              <Route path="/page1/123" component={Page2} />
          </Switch>
        </BrowserRouter>
        
    )
}
