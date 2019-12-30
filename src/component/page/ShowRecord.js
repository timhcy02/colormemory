import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Animated, Text, Image, TouchableWithoutFeedback,FlatList,TextInput,ScrollView } from 'react-native';
import { connect } from 'react-redux';
const colorArray = ["red","blue","yellow","orange","green","pink","black","grey",]
class ShowRecord extends Component {

	constructor(props) {
        super(props);
        this.state = {
            scoreData:[],
        };
    }
    
    componentDidMount(){
        let userRecord = this.props.userRecord;
        userRecord.sort(function(a, b){return b.score > a.score});
        this.setState({scoreData:userRecord})
    }

	render() {

		return (
			<View style={{flex:1}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}/>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.closeView()
                    }}>
                            <Text style={{fontSize:20,padding:10,fontWeight:'bold'}}>X</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{width:'100%',flexDirection:'row',}}>
                    <View style={{flex:1,borderBottomWidth:1,borderRightWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                      <Text>Rank</Text>  
                    </View>
                    <View style={{flex:1,borderBottomWidth:1,borderRightWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                        <Text>Name</Text>
                    </View>
                    <View style={{flex:1,borderBottomWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                        <Text>Score</Text>
                    </View>
                </View>
                <ScrollView>
                    {this.state.scoreData.map((element,index)=>{
                        return(
                        <View style={{width:'100%',flexDirection:'row',}}>
                            <View style={{flex:1,borderBottomWidth:1,borderRightWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                                <Text>{index+1}</Text>  
                            </View>
                            <View style={{flex:1,borderBottomWidth:1,borderRightWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                                <Text>{element.name}</Text>
                            </View>
                            <View style={{flex:1,borderBottomWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                                <Text>{element.score}</Text>
                            </View>
                        </View>
                        )
                    })}
                </ScrollView>
                {/* <FlatList
                    data={this.state.scoreData}
                    renderItem={({ item,index }) => {
                        <View style={{width:'100%',flexDirection:'row',}}>
                        <View style={{flex:1,borderBottomWidth:1,borderRightWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                            <Text>{index+1}</Text>  
                        </View>
                        <View style={{flex:1,borderBottomWidth:1,borderRightWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                            <Text>{item.name}</Text>
                        </View>
                        <View style={{flex:1,borderBottomWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                            <Text>{item.score}</Text>
                        </View>
                    </View>
                    }
                    }
                    keyExtractor={(item,index) => index}
                    extraData={this.state}/> */}
			</View>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
        userRecord: state.main.userRecord,
	}
}

import { 
  Main as mainMapDispatchToProps,
} from 'Controller';

let mainProps;

module.exports = connect(mapStateToProps, (dispatch, ownProps)=>{
    mainProps = mainMapDispatchToProps(dispatch, ownProps)
	return { ...mainProps};
})(ShowRecord);
