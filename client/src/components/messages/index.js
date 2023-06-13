import React, { useContext } from 'react'
import { AppStateContext } from '../../app-state';
import { QUERY_MESSAGES } from '../../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Card, CardContent, Typography } from '@mui/material';
import ChatApp from '../messages/ChatApp';

/**
 * @typedef {Object} Message
 * @property {string} id - The ID of the message.
 * @property {string} messageText - The text content of the message.
 * @property {string} messageAuthor - The author of the message.
 * @property {string} createdAt - The timestamp indicating when the message was created.
 */

function Messages() {
  const { appState: { user } } = useContext(AppStateContext);
  /**
   * @type {[any,{data:{messages:Message[]}}]}
   */
  const [getMessages, { data, error }] = useLazyQuery(QUERY_MESSAGES);

  React.useEffect(() => {
    if (user) {
      getMessages({ variables: { userId: user._id ?? user.id } })
    }
  }, [user, getMessages])

  if (error) {
    toast(error.message ?? JSON.stringify(error), { type: 'error' })
  }
  return (
    <div>
      <h1 className='text-center'>
        Message
      </h1>

      {data && data.messages.map(message =>
        <Card sx={{
          marginBottom: "1rem",
        }} variant='outlined'>
          <CardContent>
            <Typography variant="h6" >
              {message.messageAuthor}
            </Typography>
            <Typography variant="body2" >
              {message.messageText}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {message.createdAt}
            </Typography>
          </CardContent>

        </Card>
      )
      }
      {(data && data.messages.length === 0) &&
        <Typography variant="body2" >
          
        </Typography>}
      <ChatApp />
    </div>
  )
}

export default Messages