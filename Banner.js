      import React, {Component} from 'react';
      import {
      	Platform,
      	StyleSheet,
      	Text,
      	View,
        Image,
      	Button,
      	ScrollView,
        DeviceEventEmitter,
      	TouchableWithoutFeedback,
      } from 'react-native';

      //图片组件
    class BannerImage extends Component {
       constructor(props){
         super(props)
         this.state = {
            dataModel : props.dataModel,
            width: props.width,
            height: props.height,
         };

       }
       render() {
         return (
           //无视觉反馈的点击控件
         <TouchableWithoutFeedback onPress = {() => {this.handleClick(this.state.dataModel.targetTo)}} >
             <Image source={{uri:this.state.dataModel.photoUrl}} style={{width:this.state.width,height:this.state.height}}/>
         </TouchableWithoutFeedback>
       )}

       handleClick(link){
          //图片被点击，发送通知
          DeviceEventEmitter.emit("checkBannerDetail",link);
        }
    }

  export default class Banner extends Component {

        constructor(props) {
          super(props);
          this.state = {
            dataSource : props.dataSource,
            _index : 0,
            height : props.height,
            width : props.width,
          };
          this._max = props.dataSource.length;
        }

    render() {
      //轮播图图片
        let images = this.state.dataSource.map((value,i) => {
           return (
              <BannerImage dataModel={value} width={this.state.width} height={this.state.height} />
            );
        });

      //indicator
        let circles = this.state.dataSource.map((value,i) => {
          return (
            <View style={i == this.state._index ? styles.selectedCircle : styles.normalCircle}/>
          );
        });

      let circleLength = 6 * this.state.dataSource.length + 5 * 2 * this.state.dataSource.length;

      return (
        <View style={{flexDirection:'column',justifyContent: 'center',alignItems:'center',height:this.state.height,width:this.state.width}}>
        <ScrollView
                     horizontal={true}
                     pagingEnabled={true}
                     showsHorizontalScrollIndicator={false}
                     showsVerticalScrollIndicator={false}
                     onScrollBeginDrag={()=>this._onScrollBeginDrag()}
                     onMomentumScrollEnd={(event) => this._onMomentumScrollEnd(event)}
                     onScrollEndDrag={(event)=>this._onScrollEndDrag(event)}
                     ref={(scrollView) => {this._scrollView = scrollView;}}>
                       {images}
         </ScrollView>
         <View  style={{flexDirection:'row',bottom:20,width:circleLength}}>{circles}</View>
        </View>
       )
     }

      _runFocusImage(){
          if(this.imageLength <= 1){ // 只有一个则不启动定时任务
              return;
          }
          this._timer = setInterval(function () {
              this.state._index++;
              if(this.state._index >= this._max){
                  this.state._index = 0;
              }
              this._scrollView.scrollTo({x:this.state._index * this.state.width},true);
          }.bind(this), 3000);
      }

      //滚动结束事件
      _onMomentumScrollEnd(e){
          this.setState({_index : this.state._index});
      }

      //拖拽结束事件
       _onScrollEndDrag(e) {
         if(e.nativeEvent.contentOffset.x - this.state._index * this.state.width > 0) {
           this.state._index += 1;
         } else {
           this.state._index -= 1;
         }
         this._scrollView.scrollTo({x:this.state._index * this.state.width},true);
         this._runFocusImage();
       }
      //开始拖拽事件
      _onScrollBeginDrag() {
        clearInterval(this._timer);
      }

      //MARK:生命周期
      // 组件装载完成
      componentDidMount(){
          this._runFocusImage();
      }
      // 组件即将卸载
      componentWillUnmount(){
          clearInterval(this._timer);
      }
  }
      const styles = StyleSheet.create({
        selectedCircle: {
            width:6,
            height:6,
            borderRadius:6,
            backgroundColor:'#ffffff',
            marginHorizontal:5,
        },
        normalCircle: {
            width:6,
            height:6,
            borderRadius:6,
            backgroundColor:'#cccccc',
            marginHorizontal:5,
        },
      });
