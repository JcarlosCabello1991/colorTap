import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserinJson = async(points:number) => {
  try {
    const StoragePoints: string | null = await AsyncStorage.getItem('points');
    if(points > parseInt(StoragePoints as string)){
    const newPoints = await AsyncStorage.setItem('points', points.toString())
    return newPoints
    }
  } catch (e) {
    // saving error
    console.log(e)
  }
}