
	import React, {Component} from 'react';
	import {
		Platform,
		StyleSheet,
		Text,
		View,
		Button,
		ActivityIndicator,
		ScrollView,
		Dimensions,
		Animated,
		DeviceEventEmitter,
		TouchableWithoutFeedback,
	} from 'react-native';

	import {createStackNavigator,createAppContainer} from 'react-navigation';
	import Banner from './Banner';

	const Window_width = Dimensions.get('window').width;
	const Window_height = Dimensions.get('window').height;

	export default class PageTwo extends React.Component {
		static navigationOptions = {
			title: "首页",
		};

		constructor(props) {
			super(props);
			this.state = {isLoading:true};
		};

	//获取banner
		render() {
			if(this.state.isLoading) {
				return (
					<View style={{flex:1,padding:20}}>
					<ActivityIndicator/>
					</View>
				)
			}
				return (
				  	<Banner dataSource = {this.state.dataSource} width={Window_width} height={200} />
				)
	  }

		componentDidMount() {
			this.listener = DeviceEventEmitter.addListener('checkBannerDetail',(value) => {
				   this._checkBannerDetail(value);
			})
			return fetch('https://m.study.163.com/j/operation/homepage.json',{
								method: 'POST',
						}).then((response) => response.json())
						 .then((responseJson) => {
							 this.setState({
								 isLoading : false,
								 dataSource : responseJson.result.focusDtoList,
							 },function(){

							 });
						 }).catch((error) => {
							 	console.error(error);
						 });
		};

		_checkBannerDetail(link) {
			this.props.navigation.push('PageThree', {
			    uriStr: link,
			})
		}

		componentWillUnmount() {
			this.listener.remove();
		};
	}
