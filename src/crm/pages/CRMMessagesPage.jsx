import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { MessageSquare, Send, Search, User, ShieldCheck, Sparkles } from 'lucide-react';

const CRMMessagesPage = () => {
  const { students } = useCRM();
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'student', text: 'Hello Dr. Maya! I submitted the RAG pipeline capstone. Could you check if the cosine similarity threshold meets project specs?', time: '10:30 AM' },
    { id: 2, sender: 'admin', text: 'Hi Ananya! Reviewing it right now. Your persistent ChromaDB setup and chunking looks outstanding.', time: '10:45 AM' },
    { id: 3, sender: 'student', text: 'Thank you! Excited to graduate this cohort!', time: '11:00 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'admin',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInputMsg('');
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontSize: '22px', color: '#1e1b4b' }}>
            Communications & Mentor Messaging
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
            Direct mentorship channels, code review feedback, and cohort announcements
          </p>
        </div>
      </div>

      <div className="crm-card p-0 overflow-hidden" style={{ height: '620px' }}>
        <div className="row g-0 h-100">
          {/* Chat List Column */}
          <div className="col-12 col-md-4 border-end h-100 d-flex flex-column">
            <div className="p-3 border-bottom bg-light bg-opacity-50">
              <div className="fw-bold fs-6 mb-2 text-dark">Active Cohort Chats</div>
              <div className="position-relative">
                <Search size={14} className="position-absolute text-muted" style={{ left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="form-control form-control-sm ps-4 rounded-3 border"
                  placeholder="Filter student..."
                />
              </div>
            </div>

            <div className="flex-grow-1 overflow-auto p-2">
              {students.map((s) => {
                const isSelected = selectedStudent?.id === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    className="p-2 rounded-3 mb-1 cursor-pointer d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: isSelected ? 'var(--crm-lavender-subtle)' : 'transparent',
                      border: isSelected ? '1px solid var(--crm-lavender-border)' : '1px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="rounded-circle"
                      style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1 min-w-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="fw-semibold text-dark text-truncate" style={{ fontSize: '13px' }}>
                          {s.name}
                        </span>
                        <span className="text-muted" style={{ fontSize: '10px' }}>Active</span>
                      </div>
                      <div className="text-muted text-truncate" style={{ fontSize: '11px' }}>
                        {s.course}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Conversation Column */}
          <div className="col-12 col-md-8 h-100 d-flex flex-column">
            {/* Chat Header */}
            {selectedStudent && (
              <div className="p-3 border-bottom d-flex align-items-center justify-content-between bg-white">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="rounded-circle border"
                    style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                  />
                  <div>
                    <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>
                      {selectedStudent.name}
                    </div>
                    <div className="text-muted" style={{ fontSize: '11px' }}>
                      {selectedStudent.course} • Mentor: {selectedStudent.mentor}
                    </div>
                  </div>
                </div>

                <span className="badge bg-success bg-opacity-10 text-success" style={{ fontSize: '11px' }}>
                  Online
                </span>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-3" style={{ backgroundColor: '#f8f9fe' }}>
              {messages.map((m) => {
                const isAdmin = m.sender === 'admin';
                return (
                  <div
                    key={m.id}
                    className={`d-flex flex-column ${isAdmin ? 'align-items-end' : 'align-items-start'}`}
                  >
                    <div
                      className="p-3 rounded-4 shadow-sm"
                      style={{
                        maxWidth: '75%',
                        backgroundColor: isAdmin ? '#6366f1' : '#ffffff',
                        color: isAdmin ? '#ffffff' : '#0f172a',
                        border: isAdmin ? 'none' : '1px solid #ede9fe',
                        borderBottomRightRadius: isAdmin ? '4px' : '16px',
                        borderBottomLeftRadius: isAdmin ? '16px' : '4px',
                        fontSize: '13px',
                        lineHeight: '1.5'
                      }}
                    >
                      {m.text}
                    </div>
                    <span className="text-muted mt-1 px-1" style={{ fontSize: '10px' }}>
                      {m.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-top bg-white d-flex align-items-center gap-2">
              <input
                type="text"
                className="crm-form-control flex-grow-1"
                placeholder={`Message ${selectedStudent?.name || 'student'}...`}
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
              />
              <button type="submit" className="crm-btn crm-btn-primary crm-btn-sm">
                <Send size={15} />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMMessagesPage;
