import { useState, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { formatDistanceToNow } from 'date-fns';

export default function Messages() {
  const { user, token } = useAuthStore();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation);
    }
  }, [activeConversation]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/messages/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(`/api/messages/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await axios.post('/api/messages', {
        conversation_id: activeConversation,
        content: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewMessage('');
      fetchMessages(activeConversation);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Messages</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', height: '600px' }}>
        {/* Conversations List */}
        <div className="card" style={{ overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '1rem' }}>Conversations</h3>
          {conversations.length === 0 ? (
            <p style={{ color: 'var(--gray-600)' }}>No conversations yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversation(conv.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--border-radius)',
                    cursor: 'pointer',
                    backgroundColor: activeConversation === conv.id ? 'var(--gray-100)' : 'transparent',
                    border: '1px solid var(--gray-200)'
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{conv.other_party}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.last_message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          {!activeConversation ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--gray-600)' }}>
              Select a conversation to start messaging
            </div>
          ) : (
            <>
              <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', padding: '1rem 0' }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ marginBottom: '1rem', display: 'flex', justifyContent: msg.sender_id === user.id ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '70%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--border-radius)',
                      backgroundColor: msg.sender_id === user.id ? 'var(--primary)' : 'var(--gray-100)',
                      color: msg.sender_id === user.id ? 'white' : 'var(--gray-900)'
                    }}>
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.875rem' }}>{msg.sender_name}</div>
                      <div>{msg.content}</div>
                      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.8 }}>
                        {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary">
                  <Send size={20} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
