import Server from 'Server';
import { Platform,NativeModules } from 'react-native';
const Actions = require('Redux').Action;
import i18 from 'i18';

import {
    Alert,
} from 'react-native';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {

        sendPushToken:  (token) => {
            dispatch(Actions.loading.api('sendPushToken'));
            return Server.sendPushToken(token).then(resp => {	

                console.log("sendPushToken", resp)
                dispatch(Actions.loading.apiSuccess('sendPushToken'))
                if(!resp.internetError) {
                    if(resp.message == 'The request timed out.') {
                        message = i18['Server Busy']
                        dispatch(Actions.main.updateMessageAlert(message));
                        return false
                    }
                    return resp
                }else {
                    return false
                }
                // return true;
            })
            .catch(error => {
                console.warn('sendPushToken error',error);
                Alert.alert(
                    '',
                    error,
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                )
                dispatch(Actions.loading.apiSuccess('sendPushToken'));
                return false;
            })
        },

        loadStart: (t) => {
                console.log('Load Start')
            if(t){
                console.log('Load Start',t)
            }
            dispatch(Actions.loading.api('Load'));
        },
        loadEnd: (t) => {
            console.log('Load End')
            if(t){
                console.log('Load End',t)
            }
            dispatch(Actions.loading.apiSuccess('Load'))
        },
        dismissAllLoading: () => {
            dispatch(Actions.loading.dismissAllLoading());
        },
    }
}

module.exports = mapDispatchToProps;