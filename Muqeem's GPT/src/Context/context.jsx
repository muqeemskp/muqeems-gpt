import React, { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    // Function to handle delayed word display
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    // this function should've worked if i used setLoading/setShowResult in the sidebar by importing them by using context, but it is not working there
    function newChat(){
        setLoading(false);
        setShowResult(false);
    }

    // Function to handle user input
    const onSent = async (prompt) => {
        setResultData(""); // Clear previous result
        setLoading(true);  // Show loading indicator
        setShowResult(true); // Show result section
        let response;
        if(prompt){
            setRecentPrompt(prompt);
            setPreviousPrompt(prev => [...prev, prompt])
            response = await run(prompt);
        }
        else{
            setRecentPrompt(input); // Set recent prompt, which is currently in input box
            setPreviousPrompt( prev => [...prev, input]); //spreading prev and storing all new inputs
            response = await run(prompt);
        }

        // Convert the response into a format suitable for rendering
        let responseArray = response.split("**");
        let newResponse = "";
        
        // Build the newResponse with bold tags after replacing ** with <b>, AI was giving **
        for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 1) {
                newResponse += "<b>" + responseArray[i] + "</b>"; // Fix closing bold tag
            } else {
                newResponse += responseArray[i];
            }
        }

        
    // Replace single '*' with line breaks
        let newResponse2 = newResponse.replace(/\*/g, "<br/>");
        //         /\*/g is a regular expression (regex) pattern used in this context.
//                  \*: Matches the asterisk character. The backslash (\) is used to escape
//                  the asterisk, as * has a special meaning in regex (zero or more occurrences).
//                  g: The global flag. It indicates that the replacement should happen for all
//                  matches in the string, not just the first one.

        // Clear previous result and set result data with typing effect
        setResultData("");
        let newResponseArray = newResponse2.split(" ");
        
        // Apply typing effect
        newResponseArray.forEach((word, index) => {
            delayPara(index, word + " ");
        });

        setLoading(false); // Hide loading indicator
        setInput(""); // Clear input field
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        previousPrompt,
        setPreviousPrompt,
        showResult,
        loading,
        resultData,
        onSent,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
