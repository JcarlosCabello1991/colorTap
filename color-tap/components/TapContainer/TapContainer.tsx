import React, { useEffect, useState } from 'react'
import {View, StyleSheet, Text, Button, TouchableOpacity, Image} from 'react-native'

type Props = {
  init:boolean,
  setTaps:React.Dispatch<React.SetStateAction<number>>,
  timer:boolean,
  currentWidth:number,
  currentHeight: number,
  ballColor: string,
  colorToTap: string,
  newCoords: boolean | undefined,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setTimer: React.Dispatch<React.SetStateAction<boolean>>,
  updatePoints: Function,
  taps: number,
  colorGround: string
}

function TapContainer({init, setTaps, timer, currentWidth, currentHeight, ballColor, colorToTap, newCoords, setError, setTimer, updatePoints, taps, colorGround}:Props) {

  const getInitialHeight = () => {
    return ((currentHeight*0.5 / 2) - 16);
  }

  const getInitialWidth = () => {
    return ((currentWidth / 2*0.9) -16);
  } 

  const [height, setHeight] = useState<number>(getInitialHeight());
  const [width, setWidth] = useState<number>(getInitialWidth());

  // useEffect(()=>{
  //   setWidth(getInitialWidth);
  //   setHeight(getInitialHeight);
  // },[])

  useEffect(() => {
      setWidth(getInitialWidth);
      setHeight(getInitialHeight);
  },[init])

  const newPosition = () => {
    setTaps((prevState) => (prevState+1))
    setNewWidth();
    setNewHeigth();
  }

  const setNewWidth = () => {
    let newWidth:number = 0;
    do{
      newWidth = Math.floor(Math.random()*(currentWidth*0.9-currentWidth*0.1));
    }while(newWidth == width);
    setWidth(newWidth);
  } 

  const setNewHeigth = () => {
    let newHeight:number = 0;
    do{
      newHeight = Math.floor(Math.random()*(currentHeight*0.70-currentHeight*0.25));
    }while(newHeight == height);
    setHeight(newHeight);
  }

  const checkColor = () => {
    if(timer){
      if(colorGround === ballColor){
        newPosition();
      }
      else{
        //Se para el juego        
        setTimer(false); 
        updatePoints(taps);
        setError("Oops, try another game to win the award!!"); 
      }
    }
  }

  useEffect(() => {
    if(timer)newPosition();
  },[newCoords])

  console.log(ballColor)
  return (
    <View style={{width:32,height:32, borderRadius:50, marginTop:height, marginLeft:width, position:'absolute'}}>      
    <TouchableOpacity style={{width:32, height:32, borderRadius:50, backgroundColor:`${ballColor}`}} onPress={()=>{checkColor()}}>
    </TouchableOpacity>
    </View>
  )
}


export default TapContainer