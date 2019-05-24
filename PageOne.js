
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import PageTwo from './PageTwo';

export default class PageOne extends Component {

	static navigationOptions = {
		 title: "PageOne",
	};
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Button 
         onPress = {() => this.props.navigation.navigate('PageTwo')}
         title = "Go Page2"
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
