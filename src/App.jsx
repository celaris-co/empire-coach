import { useState, useEffect } from 'react';
import './App.css';

const PILLARS = [
  { id: 0, emoji: '🧠', name: 'Mindset', color: '#8B5CF6' },
  { id: 1, emoji: '📊', name: 'Finance', color: '#10B981' },
  { id: 2, emoji: '🚀', name: 'Entrepreneuriat', color: '#F59E0B' },
  { id: 3, emoji: '📈', name: 'Marketing', color: '#EC4899' },
  { id: 4, emoji: '💰', name: 'Investissement', color: '#D4AF37' },
];

// Lessons avec quiz (pas de chat)
const LESSONS = {
  0: [
    {
      title: "Mental de Gagnant",
      content: "Un entrepreneur qui réussit a 3 traits : résilience, ambition, et discipline. La résilience te permet de rebondir après l'échec. L'ambition te pousse vers le haut. La discipline te fait agir chaque jour.",
      quiz: {
        question: "Quel est le trait le PLUS important pour un entrepreneur ?",
        options: ["Résilience", "Chance", "Intelligence", "Diplômes"],
        correct: 0,
        explanation: "La résilience permet de survivre aux échecs inévitables. Tous les entrepreneurs échouent, seuls les résilients continuent."
      }
    },
    {
      title: "Mindset de Croissance",
      content: "Carol Dweck a découvert 2 mindsets : fixe (je suis comme ça) vs croissance (je peux apprendre). Les entrepreneurs à succès ont un mindset de croissance. Ils voient l'échec comme une leçon, pas une limite.",
      quiz: {
        question: "Tu rates un lancement de produit. Quelle réaction ?",
        options: [
          "J'abandonne, je suis nul",
          "J'analyse ce qui a raté et j'améliore",
          "Je blâme le marché",
          "J'essaie exactement pareil"
        ],
        correct: 1,
        explanation: "Analyser et itérer = mindset de croissance. C'est le processus lean startup."
      }
    }
  ],
  1: [
    {
      title: "Comptabilité de Base",
      content: "Toute entreprise a 3 documents : bilan (patrimoine), compte de résultat (revenus-coûts), trésorerie (cash flow). Le cash flow est roi : tu peux être profitable et mourir sans cash.",
      quiz: {
        question: "Qu'est-ce qui peut tuer une entreprise profitable ?",
        options: ["Pas de cash", "Trop de clients", "Trop de produits", "Équipe trop grande"],
        correct: 0,
        explanation: "Cash is king. Sans trésorerie, même une boîte rentable fait faillite (délais de paiement, investissements...)."
      }
    }
  ],
  2: [
    {
      title: "Valider une Idée",
      content: "Avant de construire, valide ton idée : 1) Problème réel ? 2) Les gens paient ? 3) Marché assez grand ? Méthode : interviews (50+), landing page, pré-ventes.",
      quiz: {
        question: "Meilleure validation d'idée ?",
        options: ["Sondage", "Pré-ventes", "Avis d'amis", "Étude de marché"],
        correct: 1,
        explanation: "Les gens qui paient = vraie validation. Les promesses et avis ne comptent pas."
      }
    }
  ],
  3: [
    {
      title: "Acquisition Client",
      content: "Canal d'acquisition = comment tu trouves des clients. Exemples : SEO, SEA, cold email, bouche-à-oreille, content marketing. Trouve 1 canal qui marche, puis scale.",
      quiz: {
        question: "Stratégie d'acquisition pour une B2B SaaS au début ?",
        options: ["TV", "Cold email + LinkedIn", "Affichage", "Radio"],
        correct: 1,
        explanation: "B2B early stage = outbound ciblé (cold email, LinkedIn). Pas de mass market."
      }
    }
  ],
  4: [
    {
      title: "Investir : Actions vs Immo",
      content: "Actions = liquidité, diversification, rendement 7-10%/an. Immo = levier bancaire, cash flow, tangible, rendement 3-8%/an + plus-value. Avantage actions : passif. Avantage immo : levier.",
      quiz: {
        question: "Tu as 100k€. Quel avantage de l'immo vs actions ?",
        options: [
          "Plus liquide",
          "Levier bancaire (x5)",
          "Moins risqué",
          "Rendement garanti"
        ],
        correct: 1,
        explanation: "L'immo permet le levier : 100k€ → 500k€ d'actif (emprunt 400k). Les actions ne permettent pas ça."
      }
    }
  ]
};

function App() {
  const [screen, setScreen] = useState('splash');
  const [xp, setXP] = useState(() => parseInt(localStorage.getItem('xp') || '0'));
  const [unlockedPillars, setUnlockedPillars] = useState(() => 
    JSON.parse(localStorage.getItem('unlocked') || '[0]')
  );
  const [currentPillar, setCurrentPillar] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    localStorage.setItem('xp', xp);
    localStorage.setItem('unlocked', JSON.stringify(unlockedPillars));
  }, [xp, unlockedPillars]);

  const getRank = () => {
    if (xp >= 5000) return { name: 'Empereur', color: '#D4AF37' };
    if (xp >= 2000) return { name: 'Magnat', color: '#EF4444' };
    if (xp >= 500) return { name: 'Stratège', color: '#F59E0B' };
    if (xp >= 100) return { name: 'Marchand', color: '#3B82F6' };
    return { name: 'Apprenti', color: '#6B7280' };
  };

  const validateAnswer = (idx) => {
    setSelectedAnswer(idx);
    setShowExplanation(true);
    const lesson = LESSONS[currentPillar][currentLesson];
    if (idx === lesson.quiz.correct) {
      setXP(xp + 100);
      setTimeout(() => {
        if (currentLesson < LESSONS[currentPillar].length - 1) {
          setCurrentLesson(currentLesson + 1);
          setShowQuiz(false);
          setShowExplanation(false);
          setSelectedAnswer(null);
        } else {
          // Pillar terminé
          if (!unlockedPillars.includes(currentPillar + 1) && currentPillar + 1 < PILLARS.length) {
            setUnlockedPillars([...unlockedPillars, currentPillar + 1]);
          }
          setXP(xp + 500); // Bonus pilier
          setScreen('map');
          setCurrentPillar(null);
          setCurrentLesson(0);
          setShowQuiz(false);
          setShowExplanation(false);
          setSelectedAnswer(null);
        }
      }, 3000);
    } else {
      setXP(Math.max(0, xp - 20));
      setTimeout(() => {
        setShowExplanation(false);
        setSelectedAnswer(null);
      }, 3000);
    }
  };

  if (screen === 'splash') {
    return (
      <div className="splash">
        <div className="logo">EMPIRE COACH</div>
        <div className="tagline">Construis ton empire. Sans limite.</div>
        <button className="btn-start" onClick={() => setScreen('map')}>
          ▶ COMMENCER
        </button>
      </div>
    );
  }

  if (screen === 'map') {
    const rank = getRank();
    return (
      <div className="map">
        <div className="header">
          <div className="rank" style={{ color: rank.color }}>{rank.name}</div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${(xp % 500) / 5}%` }}></div>
          </div>
          <div className="xp-text">{xp} XP</div>
        </div>
        <div className="pillars">
          {PILLARS.map(p => (
            <div
              key={p.id}
              className={`pillar ${unlockedPillars.includes(p.id) ? 'unlocked' : 'locked'}`}
              onClick={() => {
                if (unlockedPillars.includes(p.id) && LESSONS[p.id]) {
                  setCurrentPillar(p.id);
                  setCurrentLesson(0);
                  setScreen('lesson');
                }
              }}
              style={{ borderColor: p.color }}
            >
              <div className="pillar-emoji">{p.emoji}</div>
              <div className="pillar-name">{p.name}</div>
              {!unlockedPillars.includes(p.id) && <div className="lock">🔒</div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (screen === 'lesson' && currentPillar !== null) {
    const pillar = PILLARS[currentPillar];
    const lesson = LESSONS[currentPillar][currentLesson];

    if (showQuiz) {
      return (
        <div className="quiz">
          <button className="back" onClick={() => {setScreen('map'); setShowQuiz(false);}}>← Map</button>
          <div className="quiz-header">
            <div className="quiz-emoji">{pillar.emoji}</div>
            <div className="quiz-title">{lesson.title}</div>
          </div>
          <div className="quiz-question">{lesson.quiz.question}</div>
          <div className="quiz-options">
            {lesson.quiz.options.map((opt, i) => (
              <button
                key={i}
                className={`option ${selectedAnswer === i ? (i === lesson.quiz.correct ? 'correct' : 'wrong') : ''}`}
                onClick={() => !selectedAnswer && validateAnswer(i)}
                disabled={selectedAnswer !== null}
              >
                {opt}
              </button>
            ))}
          </div>
          {showExplanation && (
            <div className={`explanation ${selectedAnswer === lesson.quiz.correct ? 'success' : 'error'}`}>
              {selectedAnswer === lesson.quiz.correct ? '✅ Bravo !' : '❌ Raté'}
              <div>{lesson.quiz.explanation}</div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="lesson">
        <button className="back" onClick={() => setScreen('map')}>← Map</button>
        <div className="lesson-header">
          <div className="lesson-emoji">{pillar.emoji}</div>
          <div className="lesson-title">{lesson.title}</div>
        </div>
        <div className="lesson-content">{lesson.content}</div>
        <button className="btn-quiz" onClick={() => setShowQuiz(true)}>
          Exercice →
        </button>
      </div>
    );
  }

  return null;
}

export default App;
