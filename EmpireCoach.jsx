import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function EmpireCoach() {
  // ========== CONSTANTS ==========
  const PILLARS = [
    { id: 0, emoji: '🧠', name: 'Mindset & Psychologie', color: '#8B5CF6' },
    { id: 1, emoji: '📊', name: 'Comptabilité & Finance', color: '#10B981' },
    { id: 2, emoji: '🌍', name: 'Économie & Macro', color: '#3B82F6' },
    { id: 3, emoji: '⚖️', name: 'Droit des Affaires', color: '#6366F1' },
    { id: 4, emoji: '🚀', name: 'Entrepreneuriat', color: '#F59E0B' },
    { id: 5, emoji: '📈', name: 'Marketing & Growth', color: '#EC4899' },
    { id: 6, emoji: '🤝', name: 'Vente & Négociation', color: '#14B8A6' },
    { id: 7, emoji: '👑', name: 'Management & Leadership', color: '#8B5CF6' },
    { id: 8, emoji: '💰', name: 'Investissement', color: '#D4AF37' },
    { id: 9, emoji: '♟️', name: 'Stratégie & Concurrence', color: '#EF4444' },
    { id: 10, emoji: '🏛️', name: 'Holding & Architecture', color: '#6366F1' },
    { id: 11, emoji: '🔱', name: 'Influence & Pouvoir', color: '#D4AF37' },
  ];

  const SYSTEM_PROMPT = `Tu es Empire Coach, un mentor d'élite en entrepreneuriat, business, finance, investissement, marketing, stratégie, leadership et création de richesse.

MISSION : Parcours d'apprentissage ADAPTATIF, INFINI et ÉVOLUTIF. AUCUNE limite — tu pousses TOUJOURS plus loin. C'est INFINI.

=== RÈGLE N°1 — TOUJOURS LA MÉTHODE LA PLUS PERFORMANTE ===

Avant chaque leçon, utilise la recherche web pour identifier l'outil/méthode/technologie la plus performante ACTUELLEMENT. Tu n'enseignes JAMAIS une approche dépassée si une meilleure existe.

AUJOURD'HUI :
- Analyse de données → IA (Claude, GPT, agents IA) au lieu des méthodes manuelles
- Marketing → IA générative, agents marketing IA, ads dynamiques
- Comptabilité → outils IA (Pennylane, Dext) + fondamentaux
- Prospection → workflows automatisés IA (Clay, Instantly)
- Veille stratégique → agents IA de veille
- Création d'entreprise → lean startup augmenté IA, MVP no-code
- Investissement → screening IA + analyse fondamentale
- Droit → fondamentaux + legaltech IA
- Management → leadership + agents IA, équipes hybrides humains+IA

DEMAIN (intégrer dès que ça émerge) :
- Agents IA autonomes qui gèrent des entreprises → enseigner comment les piloter
- Robots IA qui managent → comment les superviser
- Tokenisation d'actifs → basculer dessus
- Tout nouveau modèle/techno → l'intégrer immédiatement

DOUBLE COUCHE : Fondamentaux (comprendre) + Pratique augmentée (exécuter 10x plus vite).

=== ÉVALUATION PERMANENTE ===

- Analyse CHAQUE réponse : niveau réel, lacunes, forces
- Teste toujours, ne fais jamais confiance aveuglément
- Ajuste la difficulté en temps réel
- Évalue aussi le niveau IA/tech

=== FORMAT JSON OBLIGATOIRE ===

Réponds UNIQUEMENT en JSON valide :

{
  "type": "lesson | evaluation | feedback | onboarding | summary | motivation | level_up",
  "title": "Titre",
  "pillar": "Nom du pilier",
  "pillar_id": 0,
  "level": "debutant | intermediaire | avance | expert | maitre",
  "content": "Contenu dense. Fondamentaux + méthode la plus performante. Exemples réels, chiffres, entreprises.",
  "questions": ["Question 1", "Question 2"],
  "tips": ["Conseil 1", "Conseil 2"],
  "trend_alert": "Tendance actuelle ou null",
  "tools_recommended": ["Outil 1", "Outil 2"],
  "xp_earned": 100,
  "gems_earned": 0,
  "score": 7,
  "profile_update": {
    "global_level": "debutant",
    "current_pillar": "Nom",
    "current_lesson": "Titre",
    "strengths": ["force1"],
    "weaknesses": ["lacune1"],
    "next_step": "Prochaine étape",
    "pillar_progress": [0,0,0,0,0,0,0,0,0,0,0,0],
    "unlocked_pillars": [0,1]
  }
}

- pillar_progress : 0-100 par pilier
- xp_earned : XP gagnés cette interaction (0-200)
- gems_earned : gemmes gagnées (0 ou 1)
- score : note /10 de la réponse de l'utilisateur (0 si c'est une leçon sans évaluation)
- unlocked_pillars : liste des ids de piliers débloqués
- type "level_up" : quand l'utilisateur monte de rang global

=== LES 12 PILIERS ===

0. Mindset & Psychologie
1. Comptabilité & Finance + outils IA
2. Économie & Macro + analyse IA
3. Droit des Affaires + legaltech IA
4. Entrepreneuriat + lean startup IA, no-code
5. Marketing & Growth + AI marketing, agents
6. Vente & Négociation + automatisation IA
7. Management & Leadership + équipes hybrides IA
8. Investissement + screening IA
9. Stratégie & Concurrence + veille IA, simulation
10. Holding & Architecture + outils IA structuration
11. Influence & Pouvoir + IA contenu et influence

=== PREMIÈRE INTERACTION ===

Type "onboarding". 2 phrases percutantes de présentation.

Questions dans "questions" :
- Profil (âge, situation, expérience, objectifs 5 ans et 20 ans)
- Test technique rapide (finance, marketing, stratégie, entrepreneuriat, investissement)
- Style d'apprentissage
- Niveau maîtrise IA/tech (quels outils il utilise déjà)

=== COMPORTEMENT ===

- Réponse vague → recadre
- Veut skip → "Prouve-le" + 3 questions difficiles
- Stagne → cas pratique
- Démotivé → mode coach + exemple inspirant (web search)
- Toutes les 5 sessions → bilan (type "summary")
- JAMAIS de complaisance. Tutoiement. Direct, exigeant, bienveillant. Français.
- Chaque leçon → tools_recommended avec les meilleurs outils du moment
- Donne des xp_earned cohérents : 50 base, 100 si bonne réponse, 200 si parfait
- Donne gems_earned = 1 si score >= 9`;

  // ========== STATE ==========
  const [screen, setScreen] = useState('splash'); // splash, map, lesson, stats
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('empireCoachState');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      xp: 0,
      gems: 0,
      streak: 0,
      sessions: 0,
      totalScore: 0,
      rank: 'Apprenti',
      rankColor: '#6B7280',
      unlockedPillars: [0],
      pillarProgress: [0,0,0,0,0,0,0,0,0,0,0,0],
      currentPillar: null,
      profile: {
        global_level: 'debutant',
        current_pillar: '',
        current_lesson: '',
        strengths: [],
        weaknesses: [],
        next_step: 'Commencer l\'évaluation initiale',
        tools_mastered: []
      }
    };
  });
  const [currentPillarId, setCurrentPillarId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [rewardData, setRewardData] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [floatingXP, setFloatingXP] = useState([]);

  const conversationHistory = useRef([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // ========== EFFECTS ==========
  useEffect(() => {
    localStorage.setItem('empireCoachState', JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ========== HELPERS ==========
  const getRankFromXP = useCallback((xp) => {
    if (xp >= 50000) return { name: 'Empereur', color: '#D4AF37', next: Infinity, progress: 100 };
    if (xp >= 15000) return { name: 'Magnat', color: '#EF4444', next: 50000, progress: ((xp - 15000) / 35000) * 100 };
    if (xp >= 5000) return { name: 'Stratège', color: '#F59E0B', next: 15000, progress: ((xp - 5000) / 10000) * 100 };
    if (xp >= 1000) return { name: 'Marchand', color: '#3B82F6', next: 5000, progress: ((xp - 1000) / 4000) * 100 };
    return { name: 'Apprenti', color: '#6B7280', next: 1000, progress: (xp / 1000) * 100 };
  }, []);

  const parseAIResponse = (text) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      // Try removing markdown backticks
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      try {
        return JSON.parse(cleaned);
      } catch (e2) {
        // Try regex extraction
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            return JSON.parse(match[0]);
          } catch (e3) {
            // Fallback
            return {
              type: 'error',
              title: 'Erreur',
              content: text,
              questions: [],
              tips: [],
              xp_earned: 0,
              gems_earned: 0,
              score: 0
            };
          }
        }
        return {
          type: 'error',
          title: 'Erreur',
          content: text,
          questions: [],
          tips: [],
          xp_earned: 0,
          gems_earned: 0,
          score: 0
        };
      }
    }
  };

  const addFloatingXP = (amount, type = 'xp') => {
    const id = Date.now();
    setFloatingXP(prev => [...prev, { id, amount, type }]);
    setTimeout(() => {
      setFloatingXP(prev => prev.filter(item => item.id !== id));
    }, 2000);
  };

  // ========== API ==========
  const sendMessage = async (userMessage) => {
    if (!userMessage.trim() || isLoading) return;

    const newMessage = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newMessage]);
    conversationHistory.current.push(newMessage);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = prompt('Entre ta clé API Anthropic (elle ne sera pas sauvegardée):');
      if (!apiKey) {
        throw new Error('Clé API requise');
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: conversationHistory.current
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantContent = data.content.find(block => block.type === 'text')?.text || '';
      
      const assistantMessage = { role: 'assistant', content: assistantContent };
      conversationHistory.current.push(assistantMessage);
      setMessages(prev => [...prev, assistantMessage]);

      // Parse and update game state
      const parsed = parseAIResponse(assistantContent);
      
      if (parsed.xp_earned > 0) {
        const oldRank = getRankFromXP(gameState.xp);
        const newXP = gameState.xp + parsed.xp_earned;
        const newRank = getRankFromXP(newXP);
        
        addFloatingXP(parsed.xp_earned, 'xp');
        
        if (newRank.name !== oldRank.name) {
          setLevelUpData({ rank: newRank.name, xp: parsed.xp_earned });
          setShowLevelUp(true);
        } else if (parsed.score >= 8) {
          setRewardData({ xp: parsed.xp_earned, gems: parsed.gems_earned });
          setShowReward(true);
        }
        
        setGameState(prev => ({
          ...prev,
          xp: newXP,
          gems: prev.gems + (parsed.gems_earned || 0),
          rank: newRank.name,
          rankColor: newRank.color,
          totalScore: prev.totalScore + (parsed.score || 0),
          sessions: prev.sessions + 1,
          pillarProgress: parsed.profile_update?.pillar_progress || prev.pillarProgress,
          unlockedPillars: parsed.profile_update?.unlocked_pillars || prev.unlockedPillars,
          profile: parsed.profile_update || prev.profile
        }));
      }

      if (parsed.profile_update) {
        setGameState(prev => ({
          ...prev,
          pillarProgress: parsed.profile_update.pillar_progress || prev.pillarProgress,
          unlockedPillars: parsed.profile_update.unlocked_pillars || prev.unlockedPillars,
          profile: parsed.profile_update
        }));
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: JSON.stringify({
          type: 'error',
          title: 'Erreur',
          content: `Impossible de se connecter à l'API Claude. ${error.message}`,
          questions: [],
          tips: [],
          xp_earned: 0,
          gems_earned: 0
        })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startGame = async () => {
    setScreen('lesson');
    setCurrentPillarId(0);
    
    // Send onboarding
    const onboardingPrompt = "Commence l'évaluation initiale avec les questions d'onboarding.";
    await sendMessage(onboardingPrompt);
  };

  const openPillar = (pillarId) => {
    if (!gameState.unlockedPillars.includes(pillarId)) return;
    setCurrentPillarId(pillarId);
    setScreen('lesson');
  };

  const backToMap = () => {
    setScreen('map');
    setCurrentPillarId(null);
  };

  // ========== RENDER HELPERS ==========
  const renderCircularProgress = (progress, color, size = 60) => {
    const radius = (size - 6) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
    );
  };

  const renderMessage = (msg, index) => {
    if (msg.role === 'user') {
      return (
        <div key={index} className="user-message">
          <div className="user-bubble">{msg.content}</div>
        </div>
      );
    }

    const parsed = parseAIResponse(msg.content);

    return (
      <div key={index} className="coach-message">
        <div className="coach-avatar">E</div>
        <div className="coach-card">
          <div className="quest-banner">
            <span className="quest-emoji">{parsed.pillar_id !== undefined ? PILLARS[parsed.pillar_id]?.emoji : '🎓'}</span>
            <span className="quest-title">{parsed.title || 'Empire Coach'}</span>
          </div>
          
          {parsed.pillar && (
            <div className="pillar-badge">
              {parsed.pillar} • {parsed.level || 'débutant'}
            </div>
          )}

          <div className="quest-content">{parsed.content}</div>

          {parsed.questions && parsed.questions.length > 0 && (
            <div className="quest-objectives">
              <div className="section-title">📋 Objectifs</div>
              {parsed.questions.map((q, i) => (
                <div key={i} className="objective-item">
                  <div className="objective-number">{i + 1}</div>
                  <div className="objective-text">{q}</div>
                </div>
              ))}
            </div>
          )}

          {parsed.tips && parsed.tips.length > 0 && (
            <div className="tips-section">
              <div className="section-title">💡 Tips</div>
              {parsed.tips.map((tip, i) => (
                <div key={i} className="tip-item">{tip}</div>
              ))}
            </div>
          )}

          {parsed.trend_alert && (
            <div className="trend-alert">
              <div className="section-title">⚡ Tendance Actuelle</div>
              <div>{parsed.trend_alert}</div>
            </div>
          )}

          {parsed.tools_recommended && parsed.tools_recommended.length > 0 && (
            <div className="tools-section">
              <div className="section-title">🛠️ Inventaire</div>
              <div className="tools-grid">
                {parsed.tools_recommended.map((tool, i) => (
                  <div key={i} className="tool-badge">{tool}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ========== SCREENS ==========
  const renderSplashScreen = () => (
    <div className="splash-screen">
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }} />
        ))}
      </div>
      <div className="splash-content">
        <div className="logo-container">
          <div className="logo">EMPIRE COACH</div>
          <div className="tagline">Construis ton empire. Sans limite.</div>
        </div>
        <button className="start-button" onClick={startGame}>
          <span>▶ COMMENCER</span>
          <div className="shine"></div>
        </button>
        <div className="splash-footer">Parcours adaptatif alimenté par l'IA</div>
      </div>
    </div>
  );

  const renderMapScreen = () => {
    const currentRank = getRankFromXP(gameState.xp);
    
    return (
      <div className="map-screen">
        {/* Header */}
        <div className="game-header">
          <div className="player-profile">
            <div className="avatar-container">
              <div className="avatar-ring" style={{ borderColor: currentRank.color }}>
                {renderCircularProgress(currentRank.progress, currentRank.color, 70)}
                <div className="avatar-inner">
                  <span>L</span>
                </div>
              </div>
            </div>
            <div className="player-info">
              <div className="player-rank" style={{ color: currentRank.color }}>
                {gameState.rank}
              </div>
              <div className="xp-bar">
                <div className="xp-fill" style={{ 
                  width: `${currentRank.progress}%`,
                  background: `linear-gradient(90deg, ${currentRank.color}, ${currentRank.color}dd)`
                }}>
                  <div className="xp-shine"></div>
                </div>
              </div>
              <div className="xp-text">
                {gameState.xp} / {currentRank.next === Infinity ? '∞' : currentRank.next} XP
              </div>
            </div>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-icon">{gameState.streak >= 3 ? '🔥' : '🔥'}</span>
              <span className="stat-value">{gameState.streak}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <span className="stat-value">{gameState.totalScore}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">💎</span>
              <span className="stat-value">{gameState.gems}</span>
            </div>
          </div>
          <button className="stats-button" onClick={() => setShowStats(true)}>
            📊 Stats
          </button>
        </div>

        {/* Map */}
        <div className="map-container">
          <div className="map-path">
            {PILLARS.map((pillar, index) => {
              const isUnlocked = gameState.unlockedPillars.includes(pillar.id);
              const progress = gameState.pillarProgress[pillar.id] || 0;
              const isCurrent = progress > 0 && progress < 100;

              return (
                <div key={pillar.id} className="map-node-wrapper">
                  {index > 0 && (
                    <div className={`map-connector ${isUnlocked ? 'unlocked' : 'locked'}`} />
                  )}
                  <div
                    className={`map-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`}
                    onClick={() => isUnlocked && openPillar(pillar.id)}
                    style={{ borderColor: isUnlocked ? pillar.color : '#374151' }}
                  >
                    <div className="node-progress">
                      {renderCircularProgress(progress, pillar.color, 80)}
                    </div>
                    <div className="node-content">
                      <div className="node-emoji">{pillar.emoji}</div>
                      {!isUnlocked && <div className="node-lock">🔒</div>}
                    </div>
                    <div className="node-name">{pillar.name}</div>
                    <div className="node-percent">{progress}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderLessonScreen = () => {
    const pillar = PILLARS[currentPillarId];
    const progress = gameState.pillarProgress[currentPillarId] || 0;

    return (
      <div className="lesson-screen">
        {/* Header */}
        <div className="lesson-header">
          <button className="back-button" onClick={backToMap}>← Map</button>
          <div className="lesson-pillar">
            <span className="lesson-emoji">{pillar.emoji}</span>
            <span className="lesson-name">{pillar.name}</span>
          </div>
          <div className="lesson-progress-bar">
            <div className="lesson-progress-fill" style={{ 
              width: `${progress}%`,
              backgroundColor: pillar.color 
            }} />
          </div>
          <div className="lesson-level">Niveau {progress}%</div>
        </div>

        {/* Messages */}
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <div className="coach-avatar">E</div>
              <div className="welcome-text">
                Prêt à conquérir {pillar.name} ?
              </div>
            </div>
          )}
          {messages.map((msg, i) => renderMessage(msg, i))}
          {isLoading && (
            <div className="loading-indicator">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="input-container">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ta réponse..."
            disabled={isLoading}
          />
          <button 
            className="send-button"
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
          >
            ➤
          </button>
        </div>
      </div>
    );
  };

  const renderStatsPanel = () => (
    <div className="stats-overlay" onClick={() => setShowStats(false)}>
      <div className="stats-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-stats" onClick={() => setShowStats(false)}>✕</button>
        
        <div className="stats-header">
          <div className="stats-avatar" style={{ borderColor: gameState.rankColor }}>L</div>
          <div className="stats-rank" style={{ color: gameState.rankColor }}>
            {gameState.rank}
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-label">XP Total</div>
            <div className="stat-big">{gameState.xp}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Gemmes</div>
            <div className="stat-big">💎 {gameState.gems}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Streak</div>
            <div className="stat-big">🔥 {gameState.streak}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Score</div>
            <div className="stat-big">⭐ {gameState.totalScore}</div>
          </div>
        </div>

        <div className="stats-section">
          <div className="section-title">Progression par Pilier</div>
          {PILLARS.map(pillar => {
            const progress = gameState.pillarProgress[pillar.id] || 0;
            const isUnlocked = gameState.unlockedPillars.includes(pillar.id);
            return (
              <div key={pillar.id} className="pillar-stat">
                <div className="pillar-stat-header">
                  <span>{pillar.emoji} {pillar.name}</span>
                  <span>{progress}%</span>
                </div>
                <div className="pillar-stat-bar">
                  <div 
                    className="pillar-stat-fill" 
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: isUnlocked ? pillar.color : '#374151'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {gameState.profile.strengths.length > 0 && (
          <div className="stats-section">
            <div className="section-title">💪 Forces</div>
            <div className="tags-row">
              {gameState.profile.strengths.map((s, i) => (
                <div key={i} className="tag tag-green">{s}</div>
              ))}
            </div>
          </div>
        )}

        {gameState.profile.weaknesses.length > 0 && (
          <div className="stats-section">
            <div className="section-title">🎯 À Améliorer</div>
            <div className="tags-row">
              {gameState.profile.weaknesses.map((w, i) => (
                <div key={i} className="tag tag-red">{w}</div>
              ))}
            </div>
          </div>
        )}

        {gameState.profile.next_step && (
          <div className="stats-section">
            <div className="section-title">🚀 Prochaine Étape</div>
            <div className="next-step">{gameState.profile.next_step}</div>
          </div>
        )}
      </div>
    </div>
  );

  const renderLevelUpPopup = () => (
    <div className="reward-overlay">
      <div className="confetti">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              backgroundColor: ['#D4AF37', '#10B981', '#3B82F6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)]
            }}
          />
        ))}
      </div>
      <div className="reward-card">
        <div className="reward-icon">👑</div>
        <div className="reward-title">NIVEAU SUPÉRIEUR !</div>
        <div className="reward-subtitle">Tu es maintenant</div>
        <div className="reward-rank" style={{ color: getRankFromXP(gameState.xp).color }}>
          {levelUpData?.rank}
        </div>
        <div className="reward-xp">+{levelUpData?.xp} XP</div>
        <button className="reward-button" onClick={() => setShowLevelUp(false)}>
          CONTINUER →
        </button>
      </div>
    </div>
  );

  const renderRewardPopup = () => (
    <div className="reward-overlay">
      <div className="confetti">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.3}s`,
              backgroundColor: '#D4AF37'
            }}
          />
        ))}
      </div>
      <div className="reward-card">
        <div className="reward-icon">⭐</div>
        <div className="reward-title">QUÊTE RÉUSSIE !</div>
        <div className="reward-xp">+{rewardData?.xp} XP</div>
        {rewardData?.gems > 0 && (
          <div className="reward-gems">+{rewardData.gems} 💎</div>
        )}
        <button className="reward-button" onClick={() => setShowReward(false)}>
          CONTINUER →
        </button>
      </div>
    </div>
  );

  // ========== MAIN RENDER ==========
  return (
    <div className="app">
      {screen === 'splash' && renderSplashScreen()}
      {screen === 'map' && renderMapScreen()}
      {screen === 'lesson' && renderLessonScreen()}
      {showStats && renderStatsPanel()}
      {showLevelUp && renderLevelUpPopup()}
      {showReward && renderRewardPopup()}

      {/* Floating XP */}
      {floatingXP.map(item => (
        <div key={item.id} className="floating-xp">
          +{item.amount} {item.type === 'xp' ? 'XP' : '💎'}
        </div>
      ))}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body, html {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .app {
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #07080C 0%, #0E1018 100%);
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          color: #E5E7EB;
          overflow: hidden;
        }

        /* ========== SPLASH SCREEN ========== */
        .splash-screen {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #D4AF37;
          border-radius: 50%;
          opacity: 0;
          animation: float 4s infinite;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% { 
            transform: translateY(-20vh) scale(1);
          }
        }

        .splash-content {
          z-index: 1;
          text-align: center;
          padding: 20px;
        }

        .logo-container {
          margin-bottom: 60px;
        }

        .logo {
          font-size: 48px;
          font-weight: 900;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 2px;
          animation: glow 2s ease-in-out infinite;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        @keyframes glow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 10px rgba(212, 175, 55, 0.5)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 20px rgba(212, 175, 55, 0.8)); }
        }

        .tagline {
          font-size: 18px;
          color: #9CA3AF;
          margin-top: 12px;
          font-weight: 300;
        }

        .start-button {
          position: relative;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
          color: #000;
          border: none;
          padding: 18px 60px;
          border-radius: 50px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .start-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.6);
        }

        .start-button:active {
          transform: translateY(0);
        }

        .start-button span {
          position: relative;
          z-index: 1;
        }

        .shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shine 2s infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        .splash-footer {
          margin-top: 40px;
          font-size: 14px;
          color: #6B7280;
        }

        /* ========== MAP SCREEN ========== */
        .map-screen {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .game-header {
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(10px);
          padding: 16px 20px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
        }

        .player-profile {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }

        .avatar-container {
          position: relative;
          flex-shrink: 0;
        }

        .avatar-ring {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 3px solid;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-ring svg {
          position: absolute;
        }

        .avatar-inner {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1F2937 0%, #374151 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          color: #D4AF37;
          z-index: 1;
        }

        .player-info {
          flex: 1;
        }

        .player-rank {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .xp-bar {
          width: 100%;
          height: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 4px;
          position: relative;
        }

        .xp-fill {
          height: 100%;
          border-radius: 20px;
          position: relative;
          transition: width 0.5s ease;
        }

        .xp-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 30%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: xpShine 2s infinite;
        }

        @keyframes xpShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .xp-text {
          font-size: 11px;
          color: #9CA3AF;
        }

        .stats-row {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }

        .stat-item {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          padding: 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .stat-icon {
          font-size: 20px;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: #D4AF37;
        }

        .stats-button {
          width: 100%;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
          color: #000;
          border: none;
          padding: 12px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .map-container {
          flex: 1;
          overflow-y: auto;
          padding: 30px 20px;
        }

        .map-path {
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-items: center;
        }

        .map-node-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          animation: nodeAppear 0.5s ease backwards;
        }

        @keyframes nodeAppear {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .map-node-wrapper:nth-child(1) { animation-delay: 0.1s; }
        .map-node-wrapper:nth-child(2) { animation-delay: 0.15s; }
        .map-node-wrapper:nth-child(3) { animation-delay: 0.2s; }
        .map-node-wrapper:nth-child(4) { animation-delay: 0.25s; }
        .map-node-wrapper:nth-child(5) { animation-delay: 0.3s; }
        .map-node-wrapper:nth-child(6) { animation-delay: 0.35s; }
        .map-node-wrapper:nth-child(7) { animation-delay: 0.4s; }
        .map-node-wrapper:nth-child(8) { animation-delay: 0.45s; }
        .map-node-wrapper:nth-child(9) { animation-delay: 0.5s; }
        .map-node-wrapper:nth-child(10) { animation-delay: 0.55s; }
        .map-node-wrapper:nth-child(11) { animation-delay: 0.6s; }
        .map-node-wrapper:nth-child(12) { animation-delay: 0.65s; }

        .map-connector {
          width: 4px;
          height: 30px;
          margin: 10px 0;
        }

        .map-connector.unlocked {
          background: linear-gradient(180deg, #D4AF37 0%, #FFD700 100%);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }

        .map-connector.locked {
          background: rgba(107, 114, 128, 0.3);
        }

        .map-node {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          border: 3px solid;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(10px);
        }

        .map-node.unlocked {
          box-shadow: 0 5px 20px rgba(212, 175, 55, 0.2);
        }

        .map-node.unlocked:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
        }

        .map-node.current {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 5px 20px rgba(212, 175, 55, 0.2);
          }
          50% {
            box-shadow: 0 8px 40px rgba(212, 175, 55, 0.6);
          }
        }

        .map-node.locked {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .node-progress {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .node-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .node-emoji {
          font-size: 32px;
        }

        .node-lock {
          position: absolute;
          font-size: 24px;
        }

        .node-name {
          margin-top: 8px;
          font-size: 11px;
          text-align: center;
          font-weight: 600;
          color: #9CA3AF;
        }

        .node-percent {
          font-size: 10px;
          color: #6B7280;
          margin-top: 2px;
        }

        /* ========== LESSON SCREEN ========== */
        .lesson-screen {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .lesson-header {
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(10px);
          padding: 12px 16px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .back-button {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: #D4AF37;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          align-self: flex-start;
        }

        .lesson-pillar {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 700;
        }

        .lesson-emoji {
          font-size: 24px;
        }

        .lesson-progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
        }

        .lesson-progress-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s ease;
        }

        .lesson-level {
          font-size: 12px;
          color: #9CA3AF;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .welcome-message {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          background: rgba(212, 175, 55, 0.05);
          border-radius: 16px;
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        .coach-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #000;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .welcome-text {
          font-size: 16px;
          color: #D4AF37;
        }

        .coach-message {
          display: flex;
          gap: 12px;
          animation: slideInLeft 0.3s ease;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .coach-card {
          flex: 1;
          background: rgba(17, 24, 39, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.1);
        }

        .quest-banner {
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #000;
        }

        .quest-emoji {
          font-size: 20px;
        }

        .quest-title {
          font-size: 16px;
          font-weight: 700;
          flex: 1;
        }

        .pillar-badge {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.03);
          font-size: 12px;
          color: #9CA3AF;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .quest-content {
          padding: 16px;
          line-height: 1.6;
          color: #E5E7EB;
          white-space: pre-wrap;
        }

        .quest-objectives {
          padding: 16px;
          background: rgba(212, 175, 55, 0.05);
          border-top: 1px solid rgba(212, 175, 55, 0.1);
        }

        .section-title {
          font-size: 14px;
          font-weight: 700;
          color: #D4AF37;
          margin-bottom: 12px;
        }

        .objective-item {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          align-items: flex-start;
        }

        .objective-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }

        .objective-text {
          flex: 1;
          color: #E5E7EB;
          padding-top: 4px;
        }

        .tips-section {
          padding: 16px;
          background: rgba(16, 185, 129, 0.05);
          border-top: 1px solid rgba(16, 185, 129, 0.1);
        }

        .tip-item {
          padding: 10px 12px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 8px;
          margin-bottom: 8px;
          border-left: 3px solid #10B981;
          color: #E5E7EB;
        }

        .trend-alert {
          padding: 16px;
          background: rgba(212, 175, 55, 0.1);
          border-top: 1px solid rgba(212, 175, 55, 0.2);
          animation: alertPulse 2s infinite;
        }

        @keyframes alertPulse {
          0%, 100% {
            border-color: rgba(212, 175, 55, 0.2);
          }
          50% {
            border-color: rgba(212, 175, 55, 0.6);
          }
        }

        .tools-section {
          padding: 16px;
          background: rgba(6, 182, 212, 0.05);
          border-top: 1px solid rgba(6, 182, 212, 0.1);
        }

        .tools-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tool-badge {
          padding: 6px 12px;
          background: rgba(6, 182, 212, 0.15);
          border-radius: 8px;
          font-size: 12px;
          color: #06B6D4;
          border: 1px solid rgba(6, 182, 212, 0.3);
          font-weight: 600;
        }

        .user-message {
          display: flex;
          justify-content: flex-end;
          animation: slideInRight 0.3s ease;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .user-bubble {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: #fff;
          padding: 12px 16px;
          border-radius: 16px;
          max-width: 70%;
          word-wrap: break-word;
        }

        .loading-indicator {
          display: flex;
          gap: 8px;
          padding: 20px;
          justify-content: center;
        }

        .loading-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #D4AF37;
          animation: loadingBounce 1.4s infinite ease-in-out both;
        }

        .loading-dot:nth-child(1) { animation-delay: -0.32s; }
        .loading-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes loadingBounce {
          0%, 80%, 100% { 
            transform: scale(0);
            opacity: 0.5;
          } 
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }

        .input-container {
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(10px);
          padding: 16px;
          border-top: 1px solid rgba(212, 175, 55, 0.1);
          display: flex;
          gap: 12px;
          align-items: flex-end;
        }

        .input-container textarea {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px;
          color: #E5E7EB;
          font-size: 15px;
          font-family: inherit;
          resize: none;
          min-height: 44px;
          max-height: 120px;
        }

        .input-container textarea:focus {
          outline: none;
          border-color: #D4AF37;
        }

        .send-button {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
          border: none;
          color: #000;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .send-button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .send-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ========== STATS PANEL ========== */
        .stats-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: flex-end;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .stats-panel {
          width: 100%;
          max-height: 85vh;
          background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
          border-radius: 24px 24px 0 0;
          overflow-y: auto;
          padding: 24px;
          animation: slideUp 0.3s ease;
          position: relative;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .close-stats {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #E5E7EB;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stats-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 24px;
        }

        .stats-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 4px solid;
          background: linear-gradient(135deg, #1F2937 0%, #374151 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 700;
          color: #D4AF37;
          margin-bottom: 12px;
        }

        .stats-rank {
          font-size: 28px;
          font-weight: 700;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .stat-box {
          background: rgba(255, 255, 255, 0.03);
          padding: 16px;
          border-radius: 16px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-label {
          font-size: 12px;
          color: #9CA3AF;
          margin-bottom: 6px;
        }

        .stat-big {
          font-size: 24px;
          font-weight: 700;
          color: #D4AF37;
        }

        .stats-section {
          margin-bottom: 24px;
        }

        .pillar-stat {
          margin-bottom: 16px;
        }

        .pillar-stat-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 13px;
          color: #E5E7EB;
        }

        .pillar-stat-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
        }

        .pillar-stat-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s ease;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
        }

        .tag-green {
          background: rgba(16, 185, 129, 0.15);
          color: #10B981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .tag-red {
          background: rgba(239, 68, 68, 0.15);
          color: #EF4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .next-step {
          padding: 12px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 12px;
          color: #E5E7EB;
          border-left: 3px solid #D4AF37;
        }

        /* ========== REWARD POPUP ========== */
        .reward-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        .confetti {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confettiFall 3s linear forwards;
        }

        @keyframes confettiFall {
          to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }

        .reward-card {
          background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
          padding: 40px;
          border-radius: 24px;
          text-align: center;
          max-width: 90%;
          width: 350px;
          animation: scaleUp 0.5s ease;
          border: 2px solid #D4AF37;
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.4);
        }

        @keyframes scaleUp {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .reward-icon {
          font-size: 64px;
          margin-bottom: 16px;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .reward-title {
          font-size: 28px;
          font-weight: 900;
          color: #D4AF37;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .reward-subtitle {
          font-size: 14px;
          color: #9CA3AF;
          margin-bottom: 12px;
        }

        .reward-rank {
          font-size: 36px;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .reward-xp {
          font-size: 24px;
          font-weight: 700;
          color: #D4AF37;
          margin-bottom: 8px;
        }

        .reward-gems {
          font-size: 20px;
          font-weight: 700;
          color: #06B6D4;
          margin-bottom: 16px;
        }

        .reward-button {
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
          color: #000;
          border: none;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .reward-button:hover {
          transform: scale(1.05);
        }

        /* ========== FLOATING XP ========== */
        .floating-xp {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          font-weight: 900;
          color: #D4AF37;
          animation: floatUp 2s ease forwards;
          pointer-events: none;
          text-shadow: 0 2px 10px rgba(212, 175, 55, 0.8);
          z-index: 3000;
        }

        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(-100px);
          }
        }

        /* ========== SCROLLBAR ========== */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 375px) {
          .logo {
            font-size: 36px;
          }
          .start-button {
            padding: 16px 50px;
            font-size: 18px;
          }
          .map-node {
            width: 90px;
            height: 90px;
          }
          .node-emoji {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}
