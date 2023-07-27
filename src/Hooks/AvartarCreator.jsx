import React from 'react'

const AvartarCreator = (props) => {
    // Render the item's name
    const senderName = props.UserName;
   

    // Split the string into individual words
    let wordsArray = senderName.split(" ");
    let avartar = ""
    // Extract the first character of each word and concatenate them
    for (let i = 0; i < 2; i++) {
        avartar += wordsArray[i][0];
    }
  return (
      <div>{avartar}</div>
  )
}

export default AvartarCreator