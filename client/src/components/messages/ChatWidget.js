import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import "@chatscope/chat-ui-kit-react-styles/dist/default/styles.min.css";
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

 const ChatWidget = () => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [addMessage, { error }] = useMutation(ADD_MESSAGE);
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.user || {};
  const [chatMessages, setChat] = useState({
    role: "user",
    content: `${messageText}`,
  });

  const HandleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(messageText);
    console.log(username);
    console.log(chatMessages);
    try {
      const { data } = await addMessage({
        variables: {
          username: username,
          messageText: messageText,
        },
      });
      setMessageText("");
      setMessages([data.messageText, ...messages]);
      setUsername(data.username);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setChat(data.messageText);
  }, [data.messageText]);
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