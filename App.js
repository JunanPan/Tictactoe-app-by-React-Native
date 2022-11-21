import { Amplify,Auth, } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Game } from './src/models';
import awsconfig from './src/aws-exports'
Amplify.configure({
  ...awsconfig,
  Analytics:{
    disabled:true,
  },
});

import { withAuthenticator } from 'aws-amplify-react-native';
// import {Auth} from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { Text, View ,ImageBackground,Pressable, Alert} from 'react-native';
import bg from './assets/bg.jpeg'
import React,{useEffect, useState} from 'react';
import Map from './components/Map';
import RuleMode from './components/RuleMode';
import PlayMode from './components/PlayMode';
import Button from './components/Button';
import {Normal_checkWinState,Misere_checkWinState,Normal_RobotTurn,Misere_RobotTurn} from './src/utils/gameLogic';
import {emptyBoard,fullOccupied} from './src/utils/commonUtils';
import {styles} from './App.style.js';



// export default function App() {
function App() {
  const [board,setBoard] = useState(emptyBoard);
  const [ruleMode,setRuleMode]=useState("Normal")//Normal, Misere
  const [playMode,setPlayMode]=useState("Offline") //Offline,Online,Robot Challenge
  const [game,setGame]=useState(null);
  const [currentLabel,setCurrentLabel]=useState('x')
  const [ourLabel,setOurLabel]=useState(null)
  const [userData,setUserData] = useState(null)
  const [playerLastStep,setPlayerLastStep]=useState([null,null])
  //const userData = await Auth.currentAuthenticatedUser();

 const reset=()=>{
    //set Label to empty first,
    setCurrentLabel('');//avoid the situations like "x=>x" which don't trigger useEffect
    setBoard([
      ['','',''],
      ['','',''],
      ['','','']
    ]);
    if(playMode==="Robot Challenge"){
       setCurrentLabel('o');
    }
    else{
      setCurrentLabel('x');
    }
  }


  useEffect(()=>{
    Auth.currentAuthenticatedUser().then(setUserData)
  },[])

  useEffect(()=>{
    reset();
    if (playMode==="Online"){
      getAvailableGames()
    }
    else{ //if it is switched to not Online
      deleteTemporaryGame();
    }
    if (playMode==="Robot Challenge"){
      setCurrentLabel('o');
    }
  },[playMode])


  useEffect(()=>{
    reset();
    if (playMode==="Online"){
      getAvailableGames();
    }
    // if (playMode==="Robot Challenge"){
    //   setCurrentLabel('o');
    // }
  },[ruleMode])

  useEffect(()=>{
    if(!game){
      return
    }
    const subscription = DataStore.observe(Game,game.id).subscribe((msg)=>{
      console.log(msg.model,msg.opType, msg.element);
      if (msg.opType==="UPDATE"){
        setGame(msg.element);
        setBoard(JSON.parse(msg.element.map))//from string to json
        setCurrentLabel(msg.element.currentPlayer)
      }
    })
    return ()=>subscription.unsubscribe();
  },[game])

  useEffect(()=>{
    if (currentLabel===''){//do nothing
      return
    }

    if (playMode==="Online" && game){
      // if (playMode==="Online"){
      updateGame();
    }


    let end = "";
    if (ruleMode==="Normal"){
      end = Normal_checkWinState(board);
    }
    else if (ruleMode==="Misere"){
      end = Misere_checkWinState(board);
    }
    if (end===1){//first player win
      Alert.alert("X win!","",[{
        text:'Restart',
        onPress:reset,
      }]);
      // reset()
    }
    else if (end===2){//second player win
      Alert.alert("O win!","",[{
        text:'Restart',
        onPress:reset,
      }]);
      //  reset()
    }
    else if (end===3 && fullOccupied(board)){
      Alert.alert("Tie!","",[{
        text:'Restart',
        onPress:reset,
      }]);
      // reset()
    }
    else if(end===3){//not end yet, other situations
      if (playMode==="Robot Challenge" && currentLabel==='o'){
        let chosenOption;
        if (ruleMode==="Normal"){
          chosenOption = Normal_RobotTurn(board,playerLastStep); 
        }
        else if(ruleMode==="Misere"){
          chosenOption = Misere_RobotTurn(board,playerLastStep); 
        }
        
        if (chosenOption){//if robot has place to go
          occupyOneposition(chosenOption.row,chosenOption.col);
        }
      }
    }
    
  },[currentLabel])//should write below the definition of currentLabel


  const getAvailableGames = async()=>{
    // const games = await DataStore.query(Game);
    //search for available games that doesn't have the second player
    let games=null;
    if (ruleMode==="Normal"){
      //find a normal game
      games = await DataStore.query(Game,(game)=>game.and(game=>[
      game.player2.eq("not yet"),
      game.points1.eq(1)
    ]))
    }
    else if(ruleMode==="Misere"){
      //find a misere game
      games = await DataStore.query(Game,game=>game.and(game=>[
        game.player2.eq("not yet"),
        game.points1.eq(2)
      ]))
    }

    if (games.length>0){
      Alert.alert("Find a game, good luck!")
      joinGame(games[0]);//join the first game;
    }
    else{//if no existing game, create a new one, and wait for the component
      await createNewGame();
    }
    return games
  }
  const deleteTemporaryGame=async ()=>{
    if (!game){
      return
    }
    if (game.player2!=="not yet"){//if has second player join
      setGame(null);//just set game to null，don't delete
      return;
    }
    await DataStore.delete(Game,game.id);
    setGame(null);
  }
  const joinGame = async(game)=>{
    const updatedGame= await DataStore.save(
      Game.copyOf(game,updatedGame=>{
      updatedGame.player2=userData.attributes.sub;
    })
    )
    setGame(updatedGame)
    setOurLabel('o')//join a game, our label: o

  }
  const createNewGame= async()=>{
    // const userData = await Auth.currentAuthenticatedUser();
    // console.log(userData)

    const emptyBoardString = JSON.stringify(emptyBoard);
    
    const newGame =  await DataStore.save(
      new Game({
        "Player1": userData.attributes.sub,
        "player2": "not yet",
        "map": emptyBoardString,
        "currentPlayer": "x",
        "points1": ruleMode==="Normal"? 1:2,//points1=1 means normal, points1=2 means misere.
        "points2": 0,
        })
    )
    setGame(newGame);
    setOurLabel('x');//create a game , our label:x
    }
  
  const Logout= async()=>{
    deleteTemporaryGame();
    await DataStore.clear();
    Auth.signOut();
  }

  const updateGame=()=>{
    if(!game){
      return;
    }
    DataStore.save(
      Game.copyOf(game,(g)=>{
        g.currentPlayer = currentLabel;
        g.map = JSON.stringify(board)
      })
    );
  }
  const occupyOneposition=(rowIndex,colIndex)=>{
    if (playMode==="Online" && game?.currentPlayer!==ourLabel){
      Alert.alert("Not your turn")
      return;
    }
    if (board[rowIndex][colIndex]!==""){
      Alert.alert("already taken")
      return
    }
    setBoard(board=>{
      // board[rowIndex,colIndex]="x";// doesn't work can‘t change existing array
      const boardcopy=[...board];
      boardcopy[rowIndex][colIndex]=currentLabel;
      return boardcopy
    })
    currentLabel==='x'?setCurrentLabel('o'):setCurrentLabel('x');
  }


  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMethod='contain'>
      <PlayMode playMode={playMode} onPress={setPlayMode}/>

      <Text style={{fontSize:25,color:'white'}}>Current Turn:{' '}
      {currentLabel==='x'?
      <Text style={{color:'#4474BB'}}>{currentLabel.toUpperCase()}</Text>:
      <Text style={{color:'#BB445C'}}>{currentLabel.toUpperCase()}</Text>}
        
        </Text>
      <Map board={board} onPress={[occupyOneposition,setPlayerLastStep]}/>

      <RuleMode ruleMode={ruleMode} onPress={setRuleMode}/>

      <Button onPress={reset} Logout={Logout}/>
      
      </ImageBackground>
      
      <StatusBar style="auto" />
    </View>
  );
  
  }

export default withAuthenticator(App);