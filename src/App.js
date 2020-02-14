import React, { useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Voyager } from 'graphql-voyager'

import axios from 'axios'
const MUTATION = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
      success
    }
  }
`
const introspectionProvider = async query => {
  return fetch('http://localhost:3001/graphql', {
    method: 'post',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query })
  }).then(response => response.json())
}

const api = axios.create({
  baseURL: 'https://api-uat.kushkipagos.com',
  headers: {
    'Private-Merchant-Id': 20000000106532140000
  },
  timeout: 5000
})

function App() {
  const [mutate] = useMutation(MUTATION)
  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    console.log(file)
    validity.valid && mutate({ variables: { file } })
  }

  const form = useRef()

  return (
    <div className="App">
      <header className="App-header">
        <Voyager introspection={introspectionProvider} />
        <img src={logo} className="App-logo" alt="logo" />
        <form ref={form} id="kushki-pay-form" action="confirm" method="post">
          <input type="hidden" name="cart_id" value="123" />
        </form>
        <input type="file" required onChange={onChange} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
