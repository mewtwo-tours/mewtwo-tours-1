import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { upvote, downvote } from './getListingsSlice';
import tailwind from 'tailwind-rn';

const PostCard = (props) => {
  /*
  TODO:
  -how to make it so if you press bg or picture (maybe just picture?) it goes to post view?
  -upvote function - send upvote to backend AND update it in state?
  -downvote function - send downvote to backend AND update it in state?
  */
 const [score, updateScore] = useState(props.score);

//  const upVoteFn = () => updateScore(score + 1);
//  const downVoteFn = () => updateScore(score - 1);


  return (
    <View style={tailwind('bg-blue-200 w-full h-52 border-2 p-2')}>
      <View style={tailwind(' w-full h-full p-2 flex flex-row justify-between')}>
        {/*onclick to hit individual post route goes here*/}
        <Image 
          source={props.image}
          style={tailwind('w-40 h-40')}
        />
         
        <View style={tailwind('w-9 mt-3 mb-7 flex-col justify-center')}>
        <TouchableOpacity
            onPress={()=>props.upvote()}
            style={tailwind('bg-green-200 items-center')}  
          >
            <Text>U</Text>
          </TouchableOpacity>
          <Text style={tailwind('text-xs')}>{score}</Text>
          <TouchableOpacity
            onPress={()=>props.downvote()}
            style={tailwind('bg-green-200 items-center')}  
          >
            <Text>D</Text>
          </TouchableOpacity>
        </View>

        <View style={tailwind('w-48 mb-2 ml-2 mr-2')}>
          <Text style={tailwind('text-lg')}>{props.title}</Text>
          <Text style={tailwind('text-xs font-bold')}>{props.address}</Text>
          <Text style={tailwind('text-xs mt-3')}>{props.description}</Text>
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