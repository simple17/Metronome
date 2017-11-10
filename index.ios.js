import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Slider,
  Switch,
  View
} from 'react-native';
import Sound from 'react-native-sound';

const tick = new Sound('metronome.mp3', Sound.MAIN_BUNDLE, (error) => { return; });
const maxTempo = 218;
const minTempo = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  switchLabel: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tempo: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: 100,
      boom: null
    };
    this.toggleMetronome = this.toggleMetronome.bind(this);
    this.boom = this.boom.bind(this);
  }

  toggleMetronome() {
    if (this.state.boom) {
      clearInterval(this.state.boom);
      this.setState({
        boom: null
      });
    } else {
      this.setState({
        boom: setInterval(this.boom, 60000 / this.state.tempo)
      })
    }
  }

  boom() {
    tick.stop(() => {
      tick.play();
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.switchLabel}>
          Off <Switch 
            value={!!this.state.boom}
            onValueChange={this.toggleMetronome}
          /> On
        </Text>
        <Text style={styles.tempo}>
          Tempo: {this.state.tempo}
        </Text>
        <Slider
          style={{ width: 300 }}
          step={1}
          minimumValue={minTempo}
          maximumValue={maxTempo}
          value={this.state.tempo}
          onValueChange={val => this.setState({ tempo: val })}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('Metronome', () => Metronome);
