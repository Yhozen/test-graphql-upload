import React from 'react'
import logo from './logo.svg'
import './App.css'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const MUTATION = gql`
  mutation uploadFile($input: Upload!) {
    uploadFile(input: $input) {
      url
      success
    }
  }
`

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="file" required onChange={onChange} />
        <p>
          Edit <code>src/App.js</code> and save to reload.ss
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
