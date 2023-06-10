import React from 'react';
import { ChatEngine } from 'react-chat-engine';


function ChatApp() {
    const userSecret = process.env.CHAT_APP_USER_SECRET;

	return (
		<ChatEngine
			userName='roysan9'
            userSecret={userSecret}
		/>
	);
}

export default ChatApp;