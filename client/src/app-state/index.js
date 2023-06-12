import { useLazyQuery } from '@apollo/client';
import React, { createContext, useState } from 'react';
import { QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

/**
 * @typedef {Object} User
 * @property {string} _id - The user's ID.
 * @property {string} username - The user's username.
 * @property {string} firstName - The user's first name.
 * @property {string} email - The user's email address.
 */
/**
 * @typedef {Object} Trip
 * @property {string} id
 * @property {string} destination
 * @property {string} time
 */

/**
 * @typedef {Object} Comment
 * @property {string} id
 * @property {string} commentText
 * @property {string} commentAuthor
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Post
 * @property {string} _id
 * @property {string} postTitle
 * @property {string} postText
 * @property {string} postAuthor
 * @property {string} createdAt
 * @property {Array<Comment>} comments
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} messageText
 * @property {string} messageAuthor
 * @property {string} createdAt
 */

// Create the initial state
/**
 * @typedef {{user:User,friends:User[], comments:Comment[], posts:Post[]}} State
 */

/**
 * @type {State} 
 */
const initialState = {
    user: null,
    comments: [],
    posts: [],
    friends: [],
};

// Create the context
export const AppStateContext = createContext({
    appState: initialState,
    addComment: (post) => null,
    addPost: () => null,
    addFriend: () => null,
    removeFriend: (friendId) => null,
    isFriend: (id) => false
});

// Create the context provider component
export const AppStateProvider = ({ children }) => {
    const [appState, setAppState] = useState(initialState);

    // Method to add a comment
    /**
     * 
     * @param {Post} post 
     */
    const addComment = (post) => {
        setAppState((prevState) => ({
            ...prevState,
            comments: [...prevState.comments, post.comments.filter(comment => comment.commentAuthor === appState.user.username)],
            posts: prevState.posts.map(post_ => {
                if (post._id === post_.id) {
                    return post
                }
                return post_;
            })
        }));
    };

    // Method to add a post
    const addPost = (post) => {
        post.comments = []
        setAppState((prevState) => ({
            ...prevState,
            posts: [...prevState.posts, post],
        }));
    };

    // Method to add a friend
    const addFriend = (friend) => {
        setAppState((prevState) => ({
            ...prevState,
            friends: [...prevState.friends, friend],
        }));
    };
    // Method to add a friend
    const removeFriend = (friendId) => {
        setAppState((prevState) => ({
            ...prevState,
            friends: prevState.friends.filter(friend_ => friend_._id !== friendId),
        }));
    };
    const isFriend = (id) => {
        for (const friend of appState.friends) {
            if (friend._id === id) {
                return true;
            }
        }
        return false
    }
    const [getData, { data, error }] = useLazyQuery(QUERY_ME);
    React.useEffect(() => {
        async function initApp() {
            if (AuthService.loggedIn()) {
                await getData();
            }

        }
        initApp();
    }, [getData]);
    if (error) {
        console.log(error)
    }
    React.useEffect(() => {
        if (data) {
            const { me } = data;
            if (!me) {
                console.log("Revived Invalid data from the server ", data)
                AuthService.logout()
            }
            setAppState({
                comments: me.comments,
                friends: me.friends,
                messages: me.messages,
                posts: me.posts,
                trips: me.trips,
                user: {
                    id: me._id,
                    username: me.username,
                    firstName: me.firstName,
                    email: me.email,
                    _id: me._id
                },
            });
        }
    }, [data])

    return (
        <AppStateContext.Provider
            value={{
                appState,
                addComment,
                addPost,
                addFriend,
                isFriend,
                removeFriend
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
};

