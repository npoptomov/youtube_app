// Comments.js
import React, { useState, useEffect } from 'react';
import { CommentContainer, CommentBlock, Author, Text } from '../styles';

const Comments = ({ videoId, token }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`/api/videos/${videoId}/comments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setComments(data);
        };

        fetchComments();
    }, [videoId, token]);

    return (
        <CommentContainer>
            <h3>Comments</h3>
            {comments.map(comment => (
                <CommentBlock key={comment.id}>
                    <Author>{comment.author}</Author>
                    <Text>{comment.text}</Text>
                </CommentBlock>
            ))}
        </CommentContainer>
    );
};

export default Comments;