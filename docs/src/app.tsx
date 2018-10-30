import React from 'react'
import Scanner from 'react-scanner'

class App extends React.Component {
  render() {
    return (
      <div>
        <Scanner
          onScan={v => {
            console.log(v)
          }}
        />
      </div>
    )
  }
}

export default App
