import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Hello from './Main'
import './style.css'

import store from './store'

function App() {
    return (
      <Provider store={store}>
        <Hello />
      </Provider>
    )
}


render(<App />, document.getElementById('root'))
