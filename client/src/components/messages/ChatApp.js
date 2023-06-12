import React from 'react';
import { ChatEngine } from 'react-chat-engine';

function ChatApp() {
	return (
		<ChatEngine
            projectID={process.env.REACT_APP_CHAT_APP_PROJECT_ID}
			userName='roysan9'
            userSecret={process.env.REACT_APP_CHAT_APP_USER_SECRET}

            height='75vh'
		/>
	);
}

export default ChatApp;