/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

const AppNavigator = createStackNavigator({
	PageOne: PageOne,
	PageTwo: PageTwo,
  PageThree: PageThree,
}, {
	initialRouteName : "PageTwo"
});

// 方法一：
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}

// 方法二：
// export default createAppContainer(AppNavigator);
