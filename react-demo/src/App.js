import React from 'react'
import { BrowserRouter } from "./react-router-dom"
import { Route, Switch } from './react-router'
import  ctx from './react-router/RouterContext'
function Page1() {
  return <h1>Page1</h1>
}


function Page2() {
  const renderPage2 = (value) =>  {
    console.log('page2：ctx',value);
    return <div>{value.location.pathname}</div>
  }
  
  return (
    <ctx.Consumer>
      {renderPage2}
    </ctx.Consumer>
  )
}


export default function App() {
    return (
        <BrowserRouter>
          <Switch>
              <Route path="/page1" component={Page1} exact />
              <Route path="/page2" component={Page2} />
              <Route path="/page1/123" component={Page2} />
          </Switch>
        </BrowserRouter>
        
    )
}
