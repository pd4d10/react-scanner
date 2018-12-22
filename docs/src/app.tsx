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
          interval={3000}
        />
      </div>
    )
  }
}

export default App
