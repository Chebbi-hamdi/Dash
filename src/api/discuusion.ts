import customAxios from '../hooks/customAxios';

interface Discussion {
    _id: string;
    participants: string[];
}

interface Message {
    _id: string;
    discussionId: string;
    message: string;
    senderId: string;
    createdAt: string;
}




export const getDiscussions = async () => {
    const response = await customAxios.get('/api/v0/discussion/getDiscussions', {
        headers: {
        'Authorization': `bearer ${localStorage.getItem('token')}`
        }
    });
    
    return response.data;
    
    }

    export const createDiscussion = async (currentUserId: string, selectedUserId: string) => {
        const credentials = {
            participants: [currentUserId, selectedUserId] // Include both user IDs in the participants array
        };
    
        const response = await customAxios.post('/api/v0/discussion', credentials, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    
        return response.data;
    };
    export const getExistingDiscussion = async (currentUserId: string, selectedUserId: string) => {
        try {
          const participants = [currentUserId, selectedUserId];
          const participantsString = participants.join(',');
      
          const response = await customAxios.get('/api/v0/discussion', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: {
              participants: participantsString
            }
          });
      
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('No existing discussion found');
          }
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      }

    export const getDiscussion = async (discussionId: string) => {
        const response = await customAxios.get(`/api/v0/discussion/${discussionId}`);
        return response.data;
    }

    export const getMessages = async (discussionId: string) => {
        const response = await customAxios.get(`/api/v0/message/${discussionId}`);
        return response.data;
    }

    export const sendMessage = async (discussionId: string, message: string, senderId: string) => {
        const response = await customAxios.post(`/api/v0/message/`, {
            discussion:discussionId,
            content: message,
            sender: senderId,
        });
        return response.data;
    }
   