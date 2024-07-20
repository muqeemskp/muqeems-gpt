import React, { useContext } from "react";
import './prompt-main.css';
import { assets } from "../../assets/assets";
import { Context } from "../../Context/context";

export default function PromptMain() {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    function inputSender(){
        onSent(input);
        setInput("");
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          onSent(input);
        }
    }

    return (
        <>
            <div className="main">
                <div className="nav">
                    <p>MUQEEM'S GPT</p>
                    <img src={assets.muqeems} />
                </div>
                <div className='prompt-container'>
                    {!showResult ?
                        <>
                            <h1 className='main-heading'>MUQEEM'S GPT</h1>
                            <div className='prompt-input'>
                                <input type='text' placeholder='Enter a prompt...' onChange={e => { setInput(e.target.value) }} value={input} onKeyDown={handleKeyPress}/>
                                <i className='fa-solid fa-paper-plane' onClick={() => onSent(input)}></i>
                            </div>
                            <p className="creator">Created by Muqeem Malik using Gemini API</p>
                            {/* <div className="cards">
                                <div className="card">
                                    <p>Give me complete roadmap to MERN Stack Developer.</p>
                                    <i className="fas fa-road"></i>
                                </div>
                                <div className="card">
                                    <p>How can I become successful in programming.</p>
                                    <i className="fas fa-medal"></i>
                                </div>
                                <div className="card">
                                    <p>How to create my own ChatBot using Python.</p>
                                    <i className="fas fa-robot"></i>
                                </div>
                                <div className="card">
                                    <p>Give me detail of all features of Range Rover.</p>
                                    <i className="fas fa-car"></i>
                                </div>
                            </div> */}
                        </>
                        :
                        <div className="result-container">
                            <div className="result">
                                <div className="result-title">
                                    <img src={assets.muqeems} />
                                    <p>{recentPrompt}</p>
                                </div>
                                <div className="result-data">
                                    <i className="fas fa-robot"></i>
                                    {loading ? <div className="loader">
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                        :
                                        <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}
                                </div>
                            </div>
                            <div className='prompt-input input2'>
                                <input type='text' placeholder='Enter a prompt...' onChange={e => { setInput(e.target.value) }} value={input} onKeyDown={handleKeyPress}/>
                                <i className='fa-solid fa-paper-plane' onClick={inputSender}></i>
                                <p>Created by Muqeem Malik using Gemini API</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}
