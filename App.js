/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet, 
  Dimensions,
  View
} from 'react-native';
import {Root, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Grid, ActionSheet, Item, Input, Col, Toast} from 'native-base';
import MapView from 'react-native-maps';
import nodejs from 'nodejs-mobile-react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 49.93489833333333;
const LONGITUDE = -4.887698333333334;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export default class App extends Component {
  constructor (props){
    super(props);
    this.state = { 
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: []
    };
  }

  componentWillMount(){
    nodejs.start();
    nodejs.channel.addListener(
      "message",
      (msg) => {
        Toast.show({
          text: msg,
          position: 'bottom',
          buttonText: 'Okay'
        })
      },
      this 
    );
  }

  getLocation() {
    return fetch('http://localhost:3000/act?role=api&cmd=getCoords')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          markers: responseJson.location
        }),alert(this.state.markers)
      })
      .catch(error => {
        console.error(error);
      });
  }
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }
  render() {
    return (
      <Root>
        <Container>
          <Header>
            <Body>
              <Title>RastreURJC</Title>
            </Body>          
          </Header>
          <Content>
            <Item>
              <Icon active name='home' />
              <Input placeholder="Inserte IP" />
              <Button full  onPress={()=> this.getLocation()}>
                <Text>Get Server</Text>
              </Button> 
            </Item>
          </Content>
          <View style={styles.container}>
            <MapView style={styles.map}
              initialRegion={this.state.region}>
              {this.state.markers.map(marker => (
              <MapView.Marker 
                key = {marker.id}
                title="This is a title"
                description={marker.id}
                coordinate= {{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
              />
              ))}
            </MapView>
          </View>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map:{
    ...StyleSheet.absoluteFillObject,
  }
});
