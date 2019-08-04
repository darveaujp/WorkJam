import React from 'react';
import Header from './components/Header.jsx';
import Content from './components/Content.jsx';
import './App.css';


class App extends React.Component {

  render() {
    return (
      <div>
        <Header title='Hacker new top 10 stories'/>
        <Content/>
      </div>
    );
  }
}

export default App;