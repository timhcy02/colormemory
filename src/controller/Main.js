import Server from 'Server';
import { Platform,NativeModules } from 'react-native';
const Actions = require('Redux').Action;
import i18 from 'i18';

import {
    Alert,
} from 'react-native';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
        saveRecord:(record) =>{
             dispatch(Actions.main.updateUserRecord(record));
        }
    }
}

module.exports = mapDispatchToProps;