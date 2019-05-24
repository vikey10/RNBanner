
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
		TouchableWithoutFeedback,
	} from 'react-native';

	import {WebView} from 'react-native-webview';

	import {createStackNavigator,createAppContainer} from 'react-navigation';
	import Banner from './Banner';

	const Window_width = Dimensions.get('window').width;
	const Window_height = Dimensions.get('window').height;

	export default class PageTwo extends React.Component {
		static navigationOptions = {
			title: "Banner详情",
		};
    constructor(props){
      super(props);
			this.state = {
				progress:0,
			};
    }

    render() {
			//获取navigate传递过来的数据,官方文档写的直接用this.props.uriStr 并不能获取
		   let urlStr = this.props.navigation.getParam('uriStr',"https://m.study.163.com");
			 let progressColor =  this.state.progress < 1 ? '#165FD0' : '#FFFFFF';
			 let progressBarHeight = this.state.progress < 1 ? 2 : 0;
			 let progressBarWidth =  this.state.progress*Window_width;
			  return (
           <View style={{flex:1}}>
					    <View style={{height:progressBarHeight,width:progressBarWidth,backgroundColor:progressColor}}/>
             	<WebView bounces={false}
							 onLoadProgress = {({ nativeEvent }) => {
								 		this.setState({progress:nativeEvent.progress})
  							}}
               scalesPageToFit={true}
               source={{uri: urlStr}}
               style={{width:Window_width, height:Window_height}}>
             </WebView>
           </View>
				 )
    }


  }
