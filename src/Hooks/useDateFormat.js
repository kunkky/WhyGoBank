import React from 'react'

const useDateFormat = (tDate) => {


        // Create a new Date object using the original date string
        var date = new Date(tDate);

        // Format the date
        var formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

        // Format the time
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var formattedTime = `${hours}:${minutes}${ampm}`;

        // Combine the formatted date and time
        var formattedDateTime = `${formattedDate} | ${formattedTime}`;
        return (formattedDateTime);
    }
 


export default useDateFormat