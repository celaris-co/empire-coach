import { useState } from 'react'
import './App.css'

export default function EmpireCoach() {
  const [screen, setScreen] = useState('splash')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showApiModal, setShowApiModal] = useState(false)

  const SYSTEM_PROMPT = `Tu es Empire Coach, un mentor d'élite en entrepreneuriat, business, finance et création de richesse.

Tu enseignes :
- Entrepreneuriat & lean startup
- Finance & comptabilité
- Marketing & growth
- Vente & négociation
- Investissement
- Stratégie d'entreprise

Réponds de manière CONCISE et ACTIONNABLE. Donne des exemples concrets et des chiffres réels.`

  const startGame = () => {
    setScreen('chat')
    setMessages([{
      role: 'assistant',
      content: '👋 Bienvenue sur Empire Coach !\n\nJe suis ton mentor personnel pour construire ton empire.\n\nQuel est ton objectif principal ?'
    }])
    setShowApiModal(true)
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return
    
    if (!apiKey) {
      setShowApiModal(true)
      return
    }

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          messages: [
            { role: 'user', content: SYSTEM_PROMPT },
            ...messages.filter(m => m.role !== 'system'),
            { role: 'user', content: userMessage }
          ]
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error?.message || 'Erreur API')
      }

      const data = await response.json()
      const assistantMessage = data.content[0].text

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: assistantMessage
      }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Erreur : ' + error.message + '\n\nVérifie ta clé API sur https://console.anthropic.com'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const saveApiKey = () => {
    if (apiKey.trim()) {
      setShowApiModal(false)
    }
  }

  // ========== SCREENS ==========
  
  if (screen === 'splash') {
    return (
      <div className="app">
        <div className="splash-screen">
          <div className="splash-content">
            <div className="logo">💰 EMPIRE COACH</div>
            <div className="tagline">Construis ton empire. Sans limite.</div>
            <button className="start-button" onClick={startGame}>
              ▶ COMMENCER
            </button>
            <div className="splash-footer">Parcours adaptatif alimenté par Claude AI</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* API Key Modal */}
      {showApiModal && (
        <div className="api-modal" onClick={() => setShowApiModal(false)}>
          <div className="api-modal-content" onClick={e => e.stopPropagation()}>
            <div className="api-modal-title">🔑 Clé API Anthropic</div>
            <div className="api-modal-text">
              Tu as besoin d'une clé API Anthropic pour utiliser Empire Coach.
              <br /><br />
              Crée un compte gratuit (5$ de crédits) sur{' '}
              <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="api-link">
                console.anthropic.com
              </a>
            </div>
            <input
              type="password"
              className="api-input"
              placeholder="sk-ant-..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && saveApiKey()}
            />
            <button className="api-submit" onClick={saveApiKey}>
              Valider
            </button>
          </div>
        </div>
      )}

      {/* Chat Screen */}
      <div className="message-list">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role === 'user' ? 'message-user' : ''}`}>
            <div className="message-avatar">
              {msg.role === 'user' ? 'L' : '💰'}
            </div>
            <div className="message-content">
              <div className="message-text">{msg.content}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message">
            <div className="message-avatar">💰</div>
            <div className="message-content">
              <div className="loader">
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <div className="input-wrapper">
          <input
            type="text"
            className="message-input"
            placeholder="Pose ta question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button
            className="send-button"
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? '...' : '➤'}
          </button>
        </div>
      </div>
    </div>
  )
}
