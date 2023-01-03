import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Image, AppState } from 'react-native';
import { useEffect, useState} from 'react'
import GameContainer from './components/gameContainer/GameContainer';
import {saveUserinJson} from './user/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
import RNFS from 'react-native-fs'

export default function App() {
  const [error, setError] = useState<string>("");
  const [init, setInit] = useState<boolean>(false);
  const [timer, setTimer] = useState<boolean>(false);
  const [taps, setTaps] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [colorToTap, setColorToTap] = useState<string>('');
  const [colorGround, setColorGround] = useState<string>('');
  const [counter, setCounter] = useState<number>(30);

  console.log(RNFS)
  
  useEffect(() => {
    let counterTimeOut:any;
    if(timer == true){
      counterTimeOut = setTimeout(()=>{
        setCounter(counter-1);
      },1000);
    }
    if(counter === 0 || error != ''){
      counter === 0 && finish();
      clearTimeout(counterTimeOut);
    }    
  },[timer, counter])

  useEffect(()=>{
    const getStorage = async() => {
      const pointsSaved = await AsyncStorage.getItem('points');
      console.log(pointsSaved, "points")
      
      if(pointsSaved != null){
        setPoints(parseInt(pointsSaved));
      }
    }
    getStorage()
  },[])

  const updatePoints = (taps:number)=> {
    const v = saveUserinJson(taps);
    setPoints(taps)
  }
  const showTimer = () => {
    setTimer(true)
  }

  const reset = () => {
    setInit(!init);
    setError("");
    setTimer(false);
    setTaps(0)
  }
 
  const finish = () => {
    setError("Congrats, Do you want to play again?");
    setTimer(false);
    updatePoints(taps)
    setCounter(30);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{width:'100%', height:'20%', marginBottom:10}}>
        <Image source={require('./assets/taptap.png')} style={{width:'100%', height:'100%'}}/>
      </View>
      <View style={{backgroundColor:'black', width:100, borderRadius:5, alignItems:'center', marginBottom:10}}>
        <Text style={{color:`${colorGround}`,fontSize: 20, fontWeight:'bold'}}>
          {colorToTap.toUpperCase()}
        </Text>
      </View>
      <View style={styles.containerTaps}>
          <View style={styles.taps}>
            <Text>
              Max. taps: {points}
            </Text>
          </View>
          <View style={styles.yourTaps}>
            <Text>
              Game taps: {taps}
            </Text>
          </View>        
      </View>
        <GameContainer setError={setError} init={init} timer={timer} setTimer={setTimer} setTaps={setTaps} taps={taps} updatePoints={updatePoints} setColorToTap={setColorToTap} colorToTap={colorToTap} setColorGround={setColorGround} colorGround={colorGround}/>
        {
        error != "" && 
          <View style={{position:'absolute', width:50}}>
            <Dialog.Container visible={true}>
              <Dialog.Description>
                {error}
              </Dialog.Description>
              <Dialog.Button label="Play Again" onPress={reset}/>
            </Dialog.Container>
          </View>
        }
        <View style={{marginTop:1}}>
        {
          timer && 
          <View>
            <Text>{counter}</Text>
          </View>
        }
        </View>
        {(!timer && error === "") && <View style={styles.btnsContainer}><Button title='Play' onPress={showTimer}/></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a3fdd3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTaps:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'88%',
    maxWidth:414
  },
  taps:{
    backgroundColor:'gold',
    borderColor:'black',
    borderWidth:2,
    borderRadius:25,
    paddingHorizontal:5,
    marginBottom:10
  },
  yourTaps:{
    backgroundColor:'#9ef06b',
    borderColor:'black',
    borderWidth:2,
    borderRadius:25,
    paddingHorizontal:5,
    marginBottom:10
  },
  btnsContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    width:88,
    maxWidth:414,
    marginTop:10
  },
  dialog:{
    borderRadius:10
  }
});
