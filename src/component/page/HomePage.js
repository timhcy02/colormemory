import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Animated, Text, Image, TouchableWithoutFeedback,FlatList,TextInput,Dimensions } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import ShowRecord from './ShowRecord';
const colorArray = ["red","blue","yellow","orange","green","pink","black","grey",]
class HomePage extends Component {

	constructor(props) {
        super(props);
        this.state = {
            showGame:false,
            showInput:false,
            gameArray:[],
            openArray:[],
            score:0,
            canPress:true,
            endGame:false,
            matchedPair:0,
            name:'',
            showHighScore:false,
            width:1,
            height:1
        };
    }
    
    componentDidMount(){
        this.setState({width:Dimensions.get('window').width,height:Dimensions.get('window').height});
        console.log(this.props.userRecord,this.props.test)
        Dimensions.addEventListener('change',()=>{
            console.log("testing",Dimensions.get('window').width)
                this.setState({width:Dimensions.get('window').width,height:Dimensions.get('window').height});
        });
    }

    componentWillReceiveProps(newProps){
        console.log(newProps.userRecord,newProps.test)
    }

    componentWillUnmount(){
        Dimensions.removeEventListener('change')
    }

    setGame(){
        let gameArray = [{pair:0,open:false},
            {pair:0,open:false},
            {pair:1,open:false},
            {pair:1,open:false},
            {pair:2,open:false},
            {pair:2,open:false},
            {pair:3,open:false},
            {pair:3,open:false},
            {pair:4,open:false},
            {pair:4,open:false},
            {pair:5,open:false},
            {pair:5,open:false},
            {pair:6,open:false},
            {pair:6,open:false},
            {pair:7,open:false},
            {pair:7,open:false}]
            for (let i = gameArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [gameArray[i], gameArray[j]] = [gameArray[j], gameArray[i]];
            }
            console.log(gameArray)
        this.setState({gameArray:gameArray})
    }

    handleChecking(openArray){
        setTimeout(()=>{
            let card1 = this.state.gameArray[openArray[0]].pair
            let card2 = this.state.gameArray[openArray[1]].pair
            if(card1 == card2){
                let newGameArray = this.state.gameArray;
                let newMatchedPair = this.state.matchedPair;
                newGameArray[openArray[0]] = "";
                newGameArray[openArray[1]] = "";
                newMatchedPair += 1;
                this.setState({score:this.state.score+5,gameArray:newGameArray,canPress:true,openArray:[],matchedPair:newMatchedPair})
                if(newMatchedPair == 8){
                    this.setState({endGame:true})
                }
            }
            else{
                let newGameArray = this.state.gameArray;
                newGameArray[openArray[0]].open = false;
                newGameArray[openArray[1]].open = false;
                    this.setState({score:this.state.score-1,gameArray:newGameArray,canPress:true,openArray:[]})
            }
        },1000)
    }

       saveRecord(){

            let name  = this.state.name;
            name = name.trim();
            if(name == ''){
                alert("Please input valid name");
                return;
            }
            let record = {name:name,score:this.state.score};
            this.props.saveRecord(record)
            this.setState({showGame:false,endGame:false,score:0})

    }

	render() {
        let remainHeight = Dimensions.get('window').height - 90 - 100
		return (
			<View style={{flex:1}}>
                {/*header*/}

                <View style={{height:80,alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginHorizontal:20}}> 
                    <View style={{backgroundColor:'#000',}}>
                        <Image source={require('../../asset/images/appit-icon.png')} style={{height:40,width:40}} resizeMode={'contain'}/>
                    </View>
                    <View>
                        <Text>Score:{this.state.score}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>{this.setState({showHighScore:true})}}>
                        <View >
                            <Text>High Scores</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                
                {/*game board*/}
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                {!this.state.showGame?
                    <TouchableWithoutFeedback onPress={()=>{
                        this.setGame();
                        this.setState({showGame:true})
                    }}>
                        <View style={{padding:20,backgroundColor:"#aaa"}}>
                            <Text>Start</Text>
                        </View>
                    </TouchableWithoutFeedback>
                  :  
                <View style={{flex:1}}>
                    <FlatList
                            data={this.state.gameArray}
                            renderItem={({ item,index }) => {
                                if( item != '' || item != ""){
                                    let disabledPress = !this.state.canPress;
                                    if(this.state.openArray.includes(index)){
                                        disabledPress = true
                                    }
                                    return(
                                        <TouchableWithoutFeedback disabled={disabledPress} onPress={ ()=>{
                                            this.setState({canPress:false})
                                            let newGameArray = this.state.gameArray
                                            newGameArray[index].open = true;
                                            let newOpenArray = this.state.openArray;
                                            newOpenArray.push(index)
                                            
                                            if(newOpenArray.length == 2){
                                                this.setState({gameArray:newGameArray,openArray:newOpenArray})
                                                this.handleChecking(newOpenArray)
                                            }
                                            else{
                                                this.setState({gameArray:newGameArray,openArray:newOpenArray,canPress:true})
                                            }
                                        }
                                        }>
                                            <View style={{margin:10,width:80,height:remainHeight/4,borderColor:"#000",borderWidth:1,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                                                {item.open?
                                                    <View style={{width:'100%',height:'100%',backgroundColor:colorArray[item.pair]}}/>
                                                :
                                                    null
                                                }
                                            </View>
                                        </TouchableWithoutFeedback>  
                                    )
                                }
                                else{
                                    return(
                                    <View style={{margin:10,width:80,height:remainHeight/4,alignSelf:'center'}}>
             
                                    </View>
                                    )
                                
                                }
                            }
                            }
                            keyExtractor={(item,index) => index}
                            numColumns={4}
                            extraData={this.state}
                    />
                </View>
                }
                </View>
                {
                    this.state.endGame?
                    <View style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'#aaaaaa'}}>
                        <TouchableWithoutFeedback onPress={()=>{
                            this.setState({showGame:false,endGame:false,score:0})
                        }}>
                            <Text style={{fontSize:20,fontWeight:'bold',position:'absolute',top:20,right:20}}>X</Text>
                        </TouchableWithoutFeedback>
                        <View style={{alignItems:'center',justifyContent:'center',}}>
                            <Text>End Game</Text>
                            <Text>You got {this.state.score} points</Text>
                            <Text>Please input your name to store record</Text>
                            <TextInput
                            style={{paddingLeft:10,width:200,height:25,borderWidth:1,backgroundColor:'white',marginVertical:10}}
                            onChangeText={text => this.setState({name:text})}
                            value={this.state.name}
                            />
                            <TouchableWithoutFeedback onPress={()=>{
                                this.saveRecord();
                            }}>
                            <View style={{padding:10,marginVertical:10,backgroundColor:'white'}}>
                                <Text style={{fontSize:20,fontWeight:'bold',}}>Submit</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    :
                    null
                }
                {
                    this.state.showHighScore?
                    <View style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'#aaaaaa'}}>
                        <ShowRecord closeView={()=>{this.setState({showHighScore:false})}}/>
                    </View>
                    :
                    null
                }
			</View>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
        userRecord: state.main.userRecord,
        test: state.main.test,
	}
}

import { 
  Main as mainMapDispatchToProps,
} from 'Controller';

let mainProps;

module.exports = connect(mapStateToProps, (dispatch, ownProps)=>{
    mainProps = mainMapDispatchToProps(dispatch, ownProps)
	return { ...mainProps};
})(HomePage);
