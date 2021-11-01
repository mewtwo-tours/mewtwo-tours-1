import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { upvote, downvote} from './getListingsSlice';
import tailwind from 'tailwind-rn';
import { AntDesign } from '@expo/vector-icons';

const PostCard = (props) => {
  /*
  TODO:
  -how to make it so if you press bg or picture (maybe just picture?) it goes to post view?
  **UPVOTE DOWNVOTE LOGIC
    -user clicks upvote button
    -send req to BE (post id, user id)
    -update score in state and render visual feedback on FE
      option a -set some kind of variable that will not allow user to upvote it again
      option b - if user presses upvote again, it should actually downvote (I think this is better)
  */

 const [score, updateScore] = useState(props.score);
 const [upvoted, updateUpvoted] = useState(false);
 const [downvoted, updateDownvoted] = useState(false);
 const dispatch = useDispatch();

 const upvoteEmpty = <AntDesign name="upcircleo" size={24} color="black" />
 const upvoteFull = <AntDesign name="upcircle" size={24} color="#62C370" />
 const downvoteEmpty = <AntDesign name="downcircleo" size={24} color="black" />
 const downvoteFull = <AntDesign name="downcircle" size={24} color="#C1292E" />

 const upvoteFn = (post) => {
  const upvoteMsg = {
    username: "adam123",
    id: 'tempid'
  }
  const route = upvoted ? 'downvote' : 'upvote'
  fetch(`http://localhost:3000/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(upvoteMsg)
  })
    .then(console.log('hello'))
    .catch((err) => console.log('upvoteFn error: ', err))
  }
  
  const downvoteFn = (post) => {
 
    const downvoteMsg = {
      username: "adam123",
      id: 'tempid'
    }
    const route = downvoted ? 'upvote' : 'downvote'
    fetch(`http://localhost:3000/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(downvoteMsg)
    })
      .then(console.log('hello'))
      .catch((err) => console.log('downvoteFn error: ', err))
    } 

  return (
    <View style={{backgroundColor: '#F1F2F6', ...tailwind('w-full h-52 border-2 p-2') }}>
      <View style={tailwind(' w-full h-full p-2 flex flex-row justify-between')}>
        {/*onclick to hit individual post route goes here*/}
        <Image 
          source={props.image}
          style={tailwind('w-40 h-40')}
        />
         
        <View style={tailwind('w-9 mt-3 mb-7 flex-col justify-center')}>
        <TouchableOpacity
            onPress={()=>{
              console.log(props.idx)
              upvoteFn(props.idx);
              upvoted ? dispatch(downvote(props.idx)) : dispatch(upvote(props.idx));
              upvoted ? updateScore(score - 1) : updateScore(score + 1);
              updateUpvoted(!upvoted);
            }}
            style={tailwind('items-center')}  
          >
            {upvoted ? upvoteFull : upvoteEmpty}
          </TouchableOpacity>
          <Text style={tailwind('text-xs')}>{score}</Text>
          <TouchableOpacity
            onPress={()=>{
              console.log(props.idx)
              downvoteFn(props.idx);
              downvoted ? dispatch(upvote(props.idx)) : dispatch(downvote(props.idx));
              downvoted ? updateScore(score + 1) : updateScore(score - 1);
              updateDownvoted(!downvoted);
            }}
            style={tailwind('items-center')}  
          >
            {downvoted ? downvoteFull : downvoteEmpty}
          </TouchableOpacity>
        </View>

        <View style={tailwind('w-48 mb-2 ml-2 mr-2')}>
          <Text style={{color: '#020100', ...tailwind('text-lg font-bold')}}>{props.title}</Text>
          <Text style={{color: '#FFA400', ...tailwind('text-xs font-bold')}}>{props.address}</Text>
          <Text style={tailwind('text-xs mt-3 italic pr-2')}>{props.description}</Text>
        </View>

      </View>
    </View>

  )
}

export default PostCard;

// return (
//   <View style={tailwind('bg-blue-200 w-full h-52 border-2 p-2')}>
//     <View style={tailwind(' w-full h-full p-2 flex flex-row justify-between')}>
//       <Image 
//         source={require('../../../assets/icon.png')}
//         style={tailwind('w-40 h-40')}
//       />
//         {/*placeholder for upvote downvote */}
//       <View style={tailwind('bg-yellow-200 w-8 mt-3 mb-7')}/>

//       <View style={tailwind('bg-green-200 w-48 mb-2')}>
//         <Text style={tailwind('text-lg')}>The Anchored Inn</Text>
//         <Text style={tailwind('text-xs font-bold')}>323 Stagg Street, Brooklyn</Text>
//         <Text style={tailwind('text-xs mt-3')}>A pirate themed dive bar - cheap drinks by NYC standards, decent food, here are a few more words</Text>
//       </View>

//     </View>
//   </View>

// )