import React, { useEffect, useState } from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native'
import TapContainer from '../TapContainer/TapContainer'

const colors:string[] = ['orange', 'blue', 'yellow', 'pink', 'purple', 'brown', 'grey', 'white','red'];

type Props = {
  setError: React.Dispatch<React.SetStateAction<string>>,
  init:boolean,
  setTimer: React.Dispatch<React.SetStateAction<boolean>>,
  setTaps:React.Dispatch<React.SetStateAction<number>>,
  timer:boolean, 
  taps:number,
  updatePoints: Function,
  setColorToTap: React.Dispatch<React.SetStateAction<string>>,
  colorToTap:string,
  setColorGround: React.Dispatch<React.SetStateAction<string>>,
  colorGround:string
}

function GameContainer({setError, init, setTimer, setTaps, timer, taps, updatePoints, setColorToTap, colorToTap,setColorGround, colorGround}:Props) {
  const [currentWidth, setCurrentWidth] = useState<number>(Dimensions.get('window').width > 414 ? 414 : Dimensions.get('window').width);
  const [currentHeight, setCurrentHeight] = useState<number>(Dimensions.get('window').height > 896 ? 896 : Dimensions.get('window').height);
  const [colorContainer, setColorContainer] = useState<string>('white');
  const [ballColor, setBallColor] = useState<string>('black');
  const [newCoords, setNewCoords] = useState<boolean | undefined>(undefined);

  const getColor = () => {
    const index:number = Math.floor(Math.random() * colors.length);
    const color:string = colors[index];
    const colorsAux:string[] = colors;
    
    let colorBall: string = '';
    do{
      colorBall = colorsAux[Math.floor(Math.random()*colorsAux.length)];
    }while(colorBall === color)

    setColorContainer(color);
    setBallColor(colorBall);

    const currentColors: string[] = [`${color}`, `${colorBall}`]
    const colorTap:number = Math.floor(Math.random() * 2);

    setColorGround(currentColors[Math.floor(Math.random()*2)])

    setColorToTap(currentColors[colorTap])
  }

  useEffect(() => {
    getColor();
  },[taps])

  const checkColor = () => {
    if(timer){
      if(colorGround === colorContainer){
        //Aumentamos en 1 los taps
        setNewCoords(newCoords === undefined ? true : !newCoords);
      }else{        
        setTimer(false); 
        updatePoints(taps);
        setError("Oops, try another game to win the award!!"); 
      }
    }
  }

  return (
    <View style={styles.containerGame}>
      <TouchableOpacity style={{width:'100%', height:'100%',backgroundColor:`${colorContainer}`}} onPress={()=>{checkColor()}}/>
      <TapContainer init={init} setTaps={setTaps} timer={timer} currentWidth={currentWidth} currentHeight={currentHeight} ballColor={ballColor} colorToTap={colorToTap} newCoords={newCoords} setError={setError} setTimer={setTimer} updatePoints={updatePoints} taps={taps} colorGround={colorGround}/>
    </View>
  )
}

const styles = StyleSheet.create({
  containerGame:{
    width:'90%',
    maxWidth:414,
    height:'50%',
    maxHeight:896,
    borderColor:'#0c94b6',
    borderWidth:2,
    borderRadius:5,
  }
})

export default GameContainer