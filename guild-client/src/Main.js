import React, { Component } from 'react';
import Home from './Home';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      name: '',
      gold: 0,
      goldRange: 4,
      gps: 0,
      members1: 0,
      members2: 0,
      members3: 0,
      members4: 0,
      members5: 0,
      members1c: 100,
      members2c: 1000,
      members3c: 25000,
      members4c: 500000,
      members5c: 10000000,
      sp1: true,
      sp2: false,
      sp3: false
    }

    this.renderGame = this.renderGame.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.fetchGuild = this.fetchGuild.bind(this);
    this.createGuild = this.createGuild.bind(this);
    this.exit = this.exit.bind(this);
  }

  exit() {
    this.setState({
      playing: false
    });
  }

  fetchGuild() {
    let APIURL = '/api/' + this.state.name;
    axios.get(APIURL)
    .then(res => {
      if(!res.data[0]) {
        console.log('could not find guild');
        this.createGuild();
      } else {
        console.log('found guild!!!');
        console.log(res.data[0].gold)
        this.setState({
          name: res.data[0].name,
          gold: res.data[0].gold,
          goldRange: res.data[0].goldRange,
          gps: res.data[0].gps,
          members1: res.data[0].members1,
          members2: res.data[0].members2,
          members3: res.data[0].members3,
          members4: res.data[0].members4,
          members5: res.data[0].members5,
          members1c: res.data[0].members1c,
          members2c: res.data[0].members2c,
          members3c: res.data[0].members3c,
          members4c: res.data[0].members4c,
          members5c: res.data[0].members5c,
          sp1: res.data[0].sp1,
          sp2: res.data[0].sp2,
          sp3: res.data[0].sp3,
          playing: true
        });
      }
    });
  }

  createGuild() {
    console.log('creating guild');
    axios.post('/api/', {
      name: this.state.name,
      gold: 0,
      goldRange: 4,
      gps: 0,
      members1: 0,
      members2: 0,
      members3: 0,
      members4: 0,
      members5: 0,
      members1c: 100,
      members2c: 1000,
      members3c: 25000,
      members4c: 500000,
      members5c: 10000000,
      sp1: true,
      sp2: false,
      sp3: false
    });
    this.setState({
      name: this.state.name,
      playing: true
    });
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleNameSubmit() {
    if (this.state.name !== '') {
      this.fetchGuild();
    } else {
      window.alert('Please name your Guild!');
    }
  }

  renderGame() {
    if (!this.state.playing) {
      return (
        <div id="newdiv">
          <p>---------------------------------------------------------------------------------------------------------------------------</p>
          <h2>Welcome to Guild of Heroes!</h2>
          <p>---------------------------------------------------------------------------------------------------------------------------</p>
          <p>
            Your journey begins as a lowly mercenary, a blade-for-hire...
          </p>
          <p>
            You dream of one day owning the most successful freelancing guild in the land...
          </p>
          <p>
            Build a name for your enterprise and enlist the aid of champions to fight for your cause!
          </p>
          <p>---------------------------------------------------------------------------------------------------------------------------</p>
          <br />
          <p>Begin a new adventure, or continue an existing journey!</p>
          <br />
          <label>Enter your Guild&#39;s name: &nbsp;&nbsp;
            <input
              id="setname"
              type="text"
              onChange={this.handleNameChange}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              id="startbtn"
              type="submit"
              onClick={this.handleNameSubmit}
            >
              Onwards!
            </button>
          </label>
          <br /><br />
        </div>
      );
    } else {
      return <Home
        name={this.state.name}
        gold={this.state.gold}
        goldRange={this.state.goldRange}
        gps={this.state.gps}
        members1={this.state.members1}
        members2={this.state.members2}
        members3={this.state.members3}
        members4={this.state.members4}
        members5={this.state.members5}
        members1c={this.state.members1c}
        members2c={this.state.members2c}
        members3c={this.state.members3c}
        members4c={this.state.members4c}
        members5c={this.state.members5c}
        sp1={this.state.sp1}
        sp2={this.state.sp2}
        sp3={this.state.sp3}
        onExit={this.exit}
      />
    }
  }

  render() {
    return (
      <div>
        {this.renderGame()}
      </div>
    );
  }
}

export default Main;
