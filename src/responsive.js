import { PixelRatio, Dimensions, StatusBar, Platform } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



//marginLeft, marginRight, paddingLeft, paddingRight, absolute left, and right
export function getHorizontalResp(currentSize){
  let designScreenWidth = 375;

  let size;

  size = currentSize / designScreenWidth  * screenWidth;

  return round(size, 0);

}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
