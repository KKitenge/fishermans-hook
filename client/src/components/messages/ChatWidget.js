import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
 
} from "@chatscope/chat-ui-kit-react";

import { useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_MESSAGE } from "../../utils/mutations";

// ChatWidget component
// Component to display the chat widget
const ChatWidget = () => {
  // useState to set the message text
  const [messageText, setMessageText] = useState("");
  // useState to set the messages
  const [messages, setMessages] = useState([]);
  // useState to set the username
  const [username, setUsername] = useState("");
  // useMutation to add a message
  const [addMessage, { error }] = useMutation(ADD_MESSAGE);
  // useQuery to get the user
  const { data } = useQuery(QUERY_ME);
  // user object
  const user = data?.user || {};
  // useState to set the chat messages
  const [chatMessages, setChat] = useState({
    role: "user",
    content: `${messageText}`,
  });

  // HandleFormSubmit function
  const HandleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(messageText);
    console.log(username);
    console.log(chatMessages);
    // try/catch block to add a message
    try {
      // addMessage mutation
      const { data } = await addMessage({
        variables: {
          username: username,
          messageText: messageText,
        },
      });
      // setMessageText to empty string
      setMessageText("");
      // setMessages to include the messageText
      setMessages([data.messageText, ...messages]);
      // setUsername to the username
      setUsername(data.username);
    } catch (err) {
      console.error(err);
    }
  };
  // useEffect to set the chat messages
  useEffect(() => {
    setChat(data.messageText);
  }, [data.messageText]); //messageText is the state variable
  // return the chat widget
  // returns the MainContainer, ChatContainer, MessageList, Message, and MessageInput, messages, messageText
  return (
    <div className="chat-widget">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>{data?(user.messages.push(messageText)):error.message}
            <MessageList scrollBehavior="smooth">
              {messages.map((message, i) => {
                console.log(message);
                return (
                  <Message
                    key={i}
                    model={{ messageText }}
                    name={{ username }}
                  ></Message>
                );
              })}
            </MessageList>
            <MessageInput
              placeholder="Send a message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onSend={HandleFormSubmit}
            ></MessageInput>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatWidget;