import React, { useContext, useState } from "react";
import './sidebar.css'
import { assets } from "../../assets/assets";
import { Context } from "../../Context/context";

export default function Sidebar() {
    const [extended, setExtended] = useState(false);
    const {onSent, previousPrompt, setRecentPrompt, setShowResult, newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        await onSent(prompt);
        setRecentPrompt(prompt);
    }


    function extendedHandler() {
        setExtended(!extended);
    }

    return (
        <>
        {/* when extended is true, sidebar will become 'sidebar.extended',then sidebar and sidebar.extended, both will work
        and if we use extended class values with transition inside of main class, this will work smoothly, see extended/sidebar
        class of this project */}

            <div className={`sidebar ${extended ? "extended" : ""}`}>
                <div className="top">
                    <i className="fas fa-bars" onClick={extendedHandler}></i>
                    <div className="new-chat" onClick={() => newChat()}>
                        <i className="fas fa-plus"></i>
                        {extended ? <p>New Chat</p> : null}
                    </div>
                    {extended ? (
                        <div className="recent">
                            <div className="recent-title">Recent</div>
                            {previousPrompt.map((item, index)=>{
                                return(
                                    <div onClick={()=>{loadPrompt(item)}} className="recent-entry">
                                         <i className="fas fa-message"></i>
                                         <p>{item.slice(0,8)}...</p>
                                    </div>
                                )
                            })}

                            
                        </div>
                    ) : null}
                </div>
                <div className="bottom">
                    <div className="bottom-item">
                        <i className="fa-solid fa-question-circle"></i>
                        {extended ? <p>Help</p> : null}
                    </div>
                    <div className="bottom-item">
                        <i className="fas fa-history"></i>
                        {extended ? <p>Activity</p> : null}
                    </div>
                    <div className="bottom-item">
                        <i className="fas fa-gear"></i>
                        {extended ? <p>Settings</p> : null}
                    </div>
                </div>
            </div>
        </>
    );
}
