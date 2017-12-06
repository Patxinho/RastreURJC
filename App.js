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


export default class App extends Component {
  componentWillMount(){
    nodejs.start();
    nodejs.channel.addListener(
      "message",
      (msg) => {
        alert("From node: " + msg);
      },
      this 
    );
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
              <Button full  onPress={()=> Toast.show({
                text: 'Wrong password!',
                position: 'bottom',
                buttonText: 'Okay'
              })}>
                <Text>Get Server</Text>
              </Button> 
            </Item>
          </Content>
          <View  style={styles.container}>
            <MapView style={styles.map}
              region={{
                latitude: 40.348042,
                longitude: -3.818996,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <MapView.Marker 
                coordinate={{latitude: 40.348042, longitude:-3.81899}}
                title='Casa'
              />        
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
