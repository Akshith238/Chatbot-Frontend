import React, { useState, useRef, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  TextField, 
  IconButton, 
  Avatar,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Tooltip,
  Fade
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const API_BASE_URL = 'http://localhost:5000';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "👋 Hi! I'm DocMind, your personal document assistant. Upload documents and I'll help you analyze them!"
    }
  ]);
  const [input, setInput] = useState('');
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <PictureAsPdfIcon className="text-red-500" />;
      case 'docx':
        return <DescriptionIcon className="text-blue-500" />;
      case 'txt':
        return <TextSnippetIcon className="text-gray-500" />;
      default:
        return <DescriptionIcon className="text-gray-500" />;
    }
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => 
      ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      .includes(file.type)
    );
    
    if (validFiles.length === 0) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "⚠️ Please upload PDF, DOCX, or TXT files only."
      }]);
      return;
    }

    setIsLoading(true);
    
    const formData = new FormData();
    validFiles.forEach(file => {
      formData.append('files[]', file);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const newDocs = validFiles.map(file => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        file: file
      }));
      
      setDocuments(prev => [...prev, ...newDocs]);
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: `📚 Great! I've processed ${validFiles.length} document(s). What would you like to know about them?`
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: `❌ Error processing documents: ${error.message}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuestion = input.trim();
    setMessages(prev => [...prev, {
      type: 'user',
      content: userQuestion
    }]);

    setIsTyping(true);
    setInput('');

    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userQuestion })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: data.answer,
        sources: data.sources
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: `❌ Error: ${error.message}`
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const removeDocument = async (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
    if (documents.length === 1) { // Last document being removed
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "All documents have been removed. Please upload new documents to continue."
      }]);
    }
  };

  const handleQuickAction = async (action) => {
    setIsTyping(true);
    try {
      let endpoint = '';
      let body = {};
      
      switch (action) {
        case 'summary':
          endpoint = '/summary';
          break;
        case 'issues':
          endpoint = '/analyze';
          body = { aspect: 'issues' };
          break;
        case 'recommendations':
          endpoint = '/analyze';
          body = { aspect: 'recommendations' };
          break;
        default:
          throw new Error('Invalid action');
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: endpoint === '/summary' ? 'GET' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        ...(Object.keys(body).length && { body: JSON.stringify(body) })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: data.answer,
        sources: data.sources
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: `❌ Error: ${error.message}`
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <Card className="w-full max-w-5xl mx-auto flex flex-col h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-white border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="bg-[#0f172a] p-2">
              <SmartToyIcon />
            </Avatar>
            <div>
              <Typography variant="h5" className="font-poppins font-bold">
                DocMind Assistant
              </Typography>
              <Typography variant="body2" className=" font-poppins  text-gray-500">
                {documents.length > 0 ? `${documents.length} documents uploaded` : 'Upload documents to begin'}
              </Typography>
            </div>
          </div>
          <div className="flex gap-2">
            {documents.length > 0 && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => handleQuickAction('summary')}
                  className="text-[#0f172a] font-poppins  border-[#0f172a]"
                >
                  Get Summary
                </Button>
                {/* <Button
                  variant="outlined"
                  onClick={() => handleQuickAction('recommendations')}
                  className="text-[#0f172a] border-[#0f172a]"
                >
                  Get Recommendations
                </Button> */}
              </>
            )}
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              onClick={() => fileInputRef.current.click()}
              className="bg-[#0f172a] font-poppins hover:bg-[#0f172a] shadow-md"
            >
              Upload Files
            </Button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            accept=".pdf,.docx,.txt"
            className="hidden"
          />
        </div>

        {/* Document List */}
        {documents.length > 0 && (
          <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
            {documents.map((doc, index) => (
              <Fade in={true} key={index}>
                <Chip
                  icon={getFileIcon(doc.name)}
                  label={`${doc.name} (${doc.size}MB)`}
                  onDelete={() => removeDocument(index)}
                  className="bg-white shadow-sm"
                />
              </Fade>
            ))}
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <Fade in={true} key={index}>
              <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-3 max-w-[70%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <Avatar className={message.type === 'user' ? 'bg-[#0f172a]' : 'bg-gray-200'}>
                    {message.type === 'user' ? <PersonIcon /> : <SmartToyIcon className="text-[#0f172a]" />}
                  </Avatar>
                  <Paper
                    elevation={0}
                    className={`p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-[#0f172a] text-white'
                        : 'bg-white border border-gray-100'
                    }`}
                  >
                    <Typography variant="body1 font-poppins ">
                      {message.content}
                    </Typography>
                    {message.sources && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <Typography variant="caption" className="font-poppins text-gray-500">
                          Sources:
                        </Typography>
                        <ul className="mt-1 space-y-1">
                          {message.sources.map((source, idx) => (
                            <li key={idx} className="text-sm font-poppins text-gray-600">
                              {source.substring(0, 150)}...
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Paper>
                </div>
              </div>
            </Fade>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2">
              <Avatar className="bg-gray-200">
                <SmartToyIcon className="text-slate-900" />
              </Avatar>
              <Paper elevation={0} className="p-4 bg-white border border-gray-100 rounded-2xl">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </Paper>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <TextField
              fullWidth
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={documents.length === 0 ? "Upload documents to start chatting..." : "Ask anything about your documents..."}
              disabled={documents.length === 0}
              className="font-poppins bg-white"
              InputProps={{
                className: 'rounded-xl'
              }}
            />
            <IconButton 
              type="submit" 
              disabled={!input.trim() || documents.length === 0}
              className="bg-[#0f172a] hover:bg-[#0f172a] text-white w-12 h-12 shadow-lg disabled:bg-gray-300"
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
            </IconButton>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;