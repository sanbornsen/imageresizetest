'use strict';
import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import ImageResizer from 'react-native-image-resizer';

//var ImageResizer = require('react-native-image-resizer').default;

var imagetest = React.createClass({
  render: function(){
    return (
      <View style={styles.container}>
        <Camera
          ref={"camera"}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk} />
        <Text style={styles.capture} onPress={this.takePicture}>{'Capture'}</Text>
      </View>
    );
  },

  takePicture: function(){
      this.refs.camera.capture()
      .then((data) => {
        console.log(data)


        // Block of code needs to be watched
        ImageResizer.createResizedImage(data, 1000, 4000, 'JPEG', 100)
        .then(function(resizedImageUri){
            console.log(resizedImageUri);
        })
        .catch(function(e){

            // Coming at this section with an error
            // TypeError: Cannot read property 'createResizedImage' of undefined
            // at http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false:64281:20
            // at tryCallTwo (http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false:3216:1)
            // at doResolve (http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false:3371:9)
            // at new Promise (http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false:3237:1)
            // at Object.exports.default.createResizedImage (http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false:64280:8)
            // at http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false:15812:14
            // at tryCallOne (http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false:3208:8)
            // at http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false:3294:9
            // at JSTimersExecution.callbacks.(anonymous function) (http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false:17814:13)
            // at Object.JSTimersExecution.callTimer (http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false:17480:1)

            console.log(e);
        })



      })
      .catch(err => console.error(err));
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  }
});

AppRegistry.registerComponent('imagetest', () => imagetest);