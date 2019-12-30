import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Animated, Text, Image, TouchableWithoutFeedback,FlatList } from 'react-native';
import { connect } from 'react-redux';
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
        };
    }
    
    componentDidMount(){
        this.setGame();
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
                newGameArray[openArray[0]] = "";
                newGameArray[openArray[1]] = "";
                    this.setState({score:this.state.score+5,gameArray:newGameArray,canPress:true,openArray:[]})
                
            }
            else{
                let newGameArray = this.state.gameArray;
                newGameArray[openArray[0]].open = false;
                newGameArray[openArray[1]].open = false;
                    this.setState({score:this.state.score-1,gameArray:newGameArray,canPress:true,openArray:[]})
            }

            
        },1000)


    }

	render() {

		return (
			<View style={{flex:1}}>
                {/*header*/}
                <View style={{height:100,alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginHorizontal:20}}> 
                    <View style={{backgroundColor:'#000'}}>
                        <Image source={require('../../asset/images/appit-icon.png')} style={{height:50,width:50}} resizeMode={'contain'}/>
                    </View>
                    <Text>Score:{this.state.score}</Text>

                    <TouchableWithoutFeedback>
                        <View>
                            <Text>High Scores</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                
                {/*game board*/}
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                {!this.state.showGame?
                    <TouchableWithoutFeedback onPress={()=>{
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
                                    return(
                                        <TouchableWithoutFeedback disabled={!this.state.canPress} onPress={ ()=>{
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
                                            <View style={{margin:10,width:50,height:80,borderColor:"#000",borderWidth:1,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
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
                                    <View style={{margin:10,width:50,height:80,alignSelf:'center'}}>
             
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
			</View>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
        userRecord: state.auth.userRecord,
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
