import React from 'react';
import { ChatEngine } from 'react-chat-engine';

function ChatApp(){
	const projectID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID;
	const userSecret = process.env.REACT_APP_CHAT_ENGINE_USER_SECRET;

	return (
		<ChatEngine
            projectID={projectID}
			userName='roysan9'
            userSecret={userSecret}

            height='75vh'
		/>
	)
}

export default ChatApp;