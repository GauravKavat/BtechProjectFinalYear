"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { HelpCircle, Clock, Zap, RotateCcw, Award, Sparkles } from "lucide-react";
import { playBubblePop, playSuccessChime, playFailureBuzz } from "./AudioSynthesizer";

// Types & Data
interface GamificationHubProps {
  onEarnBadge: (badgeId: string) => void;
  triggerConfetti: () => void;
  badges: string[];
  points: number;
  onAddPoints: (pts: number) => void;
}

// 1. FLIPCARDS DATA
interface FlipcardData {
  id: number;
  front: string;
  back: string;
  category: string;
  icon: string;
}

const FLIPCARDS: FlipcardData[] = [
  {
    id: 1,
    front: "Phytoplankton Power",
    back: "Microscopic marine plants produce about 50% of the Earth's oxygen! They are the lungs of our planet.",
    category: "Climate",
    icon: "🌱",
  },
  {
    id: 2,
    front: "Ocean Heat Trap",
    back: "Water absorbs heat incredibly well. The ocean absorbs over 90% of the greenhouse heat trapped on Earth.",
    category: "Climate",
    icon: "🌡️",
  },
  {
    id: 3,
    front: "Great Pacific Garbage Patch",
    back: "A giant swirling collection of marine trash in the Pacific Ocean. It is estimated to be twice the size of Texas!",
    category: "Pollution",
    icon: "🗑️",
  },
  {
    id: 4,
    front: "Ghost Nets",
    back: "Discarded fishing nets float in currents for decades, accidentally trapping turtles, dolphins, and fish. This is called 'ghost fishing'.",
    category: "Overfishing",
    icon: "🕸️",
  },
  {
    id: 5,
    front: "Coral Nurseries",
    back: "Coral reefs support 25% of all marine life, even though they cover less than 1% of the ocean floor. They are the rainforests of the sea!",
    category: "Ecosystems",
    icon: "🪸",
  },
  {
    id: 6,
    front: "Marine Protected Areas (MPAs)",
    back: "These are underwater national parks where fishing is restricted. They allow fish populations to recover and spill over into other areas.",
    category: "Solutions",
    icon: "🛡️",
  },
];

// 2. QUIZ DATA
interface QuestionData {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuestionData[] = [
  {
    id: 1,
    question: "What percentage of Earth's oxygen is produced by the oceans?",
    options: ["10%", "30%", "50%", "85%"],
    answerIndex: 2,
    explanation: "Phytoplankton floating on the ocean surface release oxygen through photosynthesis, producing half of the oxygen we breathe!",
  },
  {
    id: 2,
    question: "How much of the greenhouse heat trapped on Earth is absorbed by the ocean?",
    options: ["Over 90%", "Around 50%", "Roughly 25%", "Less than 10%"],
    answerIndex: 0,
    explanation: "Because water has a high heat capacity, the ocean absorbs over 90% of the excess heat trapped by greenhouse gases, acts as a planetary thermostat.",
  },
  {
    id: 3,
    question: "What is the term for small plastic fragments measuring less than 5 millimeters?",
    options: ["Nanoplasts", "Miniplastics", "Microplastics", "Biodegradable fragments"],
    answerIndex: 2,
    explanation: "Plastics break down into tiny pieces smaller than 5mm called microplastics. Fish and birds mistakenly eat them.",
  },
  {
    id: 4,
    question: "How many tons of plastic are estimated to enter the oceans each year?",
    options: ["1 million tons", "8 million tons", "15 million tons", "50 million tons"],
    answerIndex: 1,
    explanation: "Every year, approximately 8 million metric tons of plastic leak into our oceans. That is the weight of about 57,000 blue whales!",
  },
  {
    id: 5,
    question: "What percentage of global wild fish stocks are currently overfished?",
    options: ["10%", "20%", "34%", "65%"],
    answerIndex: 2,
    explanation: "The UN reports that 34% of wild fish stocks are overfished, meaning we catch them faster than their populations can naturally recover.",
  },
  {
    id: 6,
    question: "What is 'bycatch' in the fishing industry?",
    options: [
      "Catching fish using hooks instead of nets",
      "The accidental capture of non-target animals like turtles and dolphins",
      "Fish that escape from commercial fishing nets",
      "Catching fish during the winter season",
    ],
    answerIndex: 1,
    explanation: "Bycatch is the accidental capture of non-target marine animals like sharks, dolphins, and sea turtles in large industrial nets.",
  },
];

// 3. MEMORY GAME ANIMALS
const MEMORY_ITEMS = [
  { id: 1, name: "Sea Turtle", emoji: "🐢" },
  { id: 2, name: "Dolphin", emoji: "🐬" },
  { id: 3, name: "Octopus", emoji: "🐙" },
  { id: 4, name: "Clownfish", emoji: "🐠" },
  { id: 5, name: "Whale", emoji: "🐳" },
  { id: 6, name: "Starfish", emoji: "🌟" },
  { id: 7, name: "Jellyfish", emoji: "🪼" },
  { id: 8, name: "Crab", emoji: "🦀" },
];

export default function GamificationHub({
  onEarnBadge,
  triggerConfetti,
  badges,
  points,
  onAddPoints,
}: GamificationHubProps) {
  const [activeTab, setActiveTab] = useState<"flipcards" | "quiz" | "memory">("flipcards");

  // Tab change handler
  const handleTabChange = (tab: "flipcards" | "quiz" | "memory") => {
    playBubblePop();
    setActiveTab(tab);
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8">
      {/* Game navigation */}
      <div className="flex justify-center gap-2 mb-8 bg-theme-primary-light/60 p-2 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => handleTabChange("flipcards")}
          className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm transition-all ${
            activeTab === "flipcards"
              ? "bg-theme-primary text-white shadow-md"
              : "text-theme-primary-dark hover:bg-theme-primary-light/80"
          }`}
        >
          💡 Flipcards
        </button>
        <button
          onClick={() => handleTabChange("quiz")}
          className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm transition-all ${
            activeTab === "quiz"
              ? "bg-theme-primary text-white shadow-md"
              : "text-theme-primary-dark hover:bg-theme-primary-light/80"
          }`}
        >
          ⏱️ Timed Quiz
        </button>
        <button
          onClick={() => handleTabChange("memory")}
          className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm transition-all ${
            activeTab === "memory"
              ? "bg-theme-primary text-white shadow-md"
              : "text-theme-primary-dark hover:bg-theme-primary-light/80"
          }`}
        >
          🧠 Memory Match
        </button>
      </div>

      {/* Active game content wrapper */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl border-2 border-theme-primary/10 p-6 md:p-8 min-h-[450px] shadow-lg flex flex-col justify-between">
        {activeTab === "flipcards" && <FlipcardGame />}
        {activeTab === "quiz" && (
          <QuizGame
            onEarnBadge={onEarnBadge}
            triggerConfetti={triggerConfetti}
            badges={badges}
            onAddPoints={onAddPoints}
          />
        )}
        {activeTab === "memory" && (
          <MemoryGame
            onEarnBadge={onEarnBadge}
            triggerConfetti={triggerConfetti}
            badges={badges}
            onAddPoints={onAddPoints}
          />
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SUB-GAME 1: FLIPCARDS
// -------------------------------------------------------------
function FlipcardGame() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleCardClick = (id: number) => {
    playBubblePop();
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center max-w-lg mx-auto">
        <h3 className="text-2xl font-black text-slate-800 mb-1">Ocean Active Recall Cards</h3>
        <p className="text-sm text-slate-500 font-bold">
          Click the cards to flip them and test your knowledge. Can you guess the explanation on the back?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FLIPCARDS.map((card) => {
          const isFlipped = flippedCards.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="perspective-1000 h-[220px] cursor-pointer group"
            >
              <div
                className={`relative w-full h-full transform-style-3d transition-transform duration-500 rounded-2xl border-2 ${
                  isFlipped ? "rotate-y-180 border-theme-primary" : "border-slate-200"
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden w-full h-full bg-white rounded-2xl p-6 flex flex-col justify-between items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-theme-primary-light flex items-center justify-center text-2xl">
                    {card.icon}
                  </div>
                  <h4 className="text-lg font-black text-slate-800 px-2 line-clamp-3">{card.front}</h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    {card.category}
                  </span>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-theme-primary-light/95 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] uppercase font-black tracking-widest text-theme-primary mb-3 bg-theme-primary-light px-3 py-1 rounded-full">
                    Explanation
                  </span>
                  <p className="text-sm font-extrabold text-slate-700 leading-relaxed max-w-xs">
                    {card.back}
                  </p>
                  <p className="text-[10px] text-theme-primary font-bold mt-4 animate-pulse">
                    Click to flip back
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SUB-GAME 2: TIMED QUIZ
// -------------------------------------------------------------
interface QuizGameProps {
  onEarnBadge: (badgeId: string) => void;
  triggerConfetti: () => void;
  badges: string[];
  onAddPoints: (pts: number) => void;
}

function QuizGame({ onEarnBadge, triggerConfetti, badges, onAddPoints }: QuizGameProps) {
  const [gameState, setGameState] = useState<"idle" | "playing" | "summary">("idle");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [penaltyActive, setPenaltyActive] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startQuiz = () => {
    playBubblePop();
    setScore(0);
    setCurrentIdx(0);
    setSelectedIdx(null);
    setAnsweredCorrectly(null);
    setTimeLeft(60);
    setGameState("playing");
  };

  const endQuiz = useCallback(() => {
    setGameState("summary");
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Check if score is decent to award Trivia Champ Badge
    if (score >= 40) {
      setTimeout(() => {
        onEarnBadge("trivia-champ");
      }, 0);
    }
    setTimeout(() => {
      triggerConfetti();
    }, 0);
  }, [score, onEarnBadge, triggerConfetti]);

  // Quiz timer logic
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) return 0;
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Watch timeLeft to safely end quiz
  useEffect(() => {
    if (gameState === "playing" && timeLeft <= 0) {
      endQuiz();
    }
  }, [timeLeft, gameState, endQuiz]);

  const handleOptionClick = (optionIdx: number) => {
    if (selectedIdx !== null) return; // already answered
    setSelectedIdx(optionIdx);

    const question = QUIZ_QUESTIONS[currentIdx];
    if (optionIdx === question.answerIndex) {
      playSuccessChime();
      setAnsweredCorrectly(true);
      setScore((s) => s + 10);
      onAddPoints(10);
    } else {
      playFailureBuzz();
      setAnsweredCorrectly(false);
      
      // Flash penalty red and subtract 10s
      setPenaltyActive(true);
      setTimeout(() => setPenaltyActive(false), 800);
      setTimeLeft((prev) => Math.max(0, prev - 10));
    }
  };

  const handleNextClick = () => {
    playBubblePop();
    setSelectedIdx(null);
    setAnsweredCorrectly(null);
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((idx) => idx + 1);
    } else {
      endQuiz();
    }
  };

  const question = QUIZ_QUESTIONS[currentIdx];
  const progressPercent = (timeLeft / 60) * 100;

  return (
    <div className="flex flex-col flex-1 justify-between gap-6">
      {gameState === "idle" && (
        <div className="flex flex-col items-center text-center max-w-md mx-auto my-auto gap-6 py-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-3xl animate-bounce shadow-md">
            ⏱️
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Ocean Challenge Quiz</h3>
            <p className="text-sm text-slate-500 font-bold leading-relaxed">
              Test your knowledge against the clock! You have 60 seconds. Correct answers grant 10 points. Wrong answers penalize you by -10 seconds!
            </p>
          </div>
          <button
            onClick={startQuiz}
            className="px-8 py-4 bg-theme-primary text-white font-extrabold rounded-2xl hover:bg-theme-primary-hover active:scale-95 transition-all shadow-md flex items-center gap-2"
          >
            <Zap className="w-5 h-5 fill-amber-300 text-amber-300" />
            <span>Launch Challenge</span>
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="flex flex-col flex-1 justify-between gap-6">
          {/* Top Panel: Timer bar and Score */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm font-black text-slate-700">
              <div className="flex items-center gap-1.5 text-theme-primary">
                <Clock className="w-4 h-4" />
                <span>Timer: {timeLeft}s</span>
              </div>
              <div className="bg-slate-100 px-3 py-1 rounded-full text-slate-800">
                Score: {score} pts
              </div>
            </div>

            {/* Progress bar container */}
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className={`h-full transition-all duration-1000 ${
                  penaltyActive
                    ? "bg-rose-500"
                    : timeLeft < 20
                    ? "bg-rose-400"
                    : "bg-theme-primary"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Display */}
          <div className="flex-1 flex flex-col justify-center gap-6 my-4">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <h4 className="text-lg md:text-xl font-extrabold text-slate-800 leading-snug">
              {question.question}
            </h4>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((opt, idx) => {
                let btnStyle = "border-slate-200 bg-white hover:border-theme-primary/50 hover:bg-theme-primary-light/30";
                let animClass = "";
                
                const isCorrect = idx === question.answerIndex;
                const isSelected = idx === selectedIdx;
                let icon = String.fromCharCode(65 + idx);
                let iconBg = "bg-slate-100 text-slate-500";
                
                if (selectedIdx !== null) {
                  if (isCorrect) {
                    btnStyle = "border-emerald-400 bg-emerald-50 text-emerald-800 font-black shadow-xs shadow-emerald-100/50";
                    icon = "✓";
                    iconBg = "bg-emerald-500 text-white font-bold";
                    if (isSelected) {
                      animClass = "animate-pop-success";
                    }
                  } else if (isSelected) {
                    btnStyle = "border-rose-400 bg-rose-50 text-rose-800 font-black shadow-xs shadow-rose-100/50";
                    animClass = "animate-shake";
                    icon = "✗";
                    iconBg = "bg-rose-500 text-white font-bold";
                  } else {
                    btnStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                    iconBg = "bg-slate-100 text-slate-300 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedIdx !== null}
                    onClick={() => handleOptionClick(idx)}
                    className={`p-4 rounded-2xl border-2 text-left text-sm font-semibold transition-all flex items-center gap-3 select-none ${btnStyle} ${animClass}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${iconBg}`}>
                      {icon}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation / Next Controls */}
          <div className="min-h-[80px] flex items-center justify-between border-t border-slate-100 pt-4 gap-4">
            <div className="flex-1">
              {selectedIdx !== null && (
                <div className="text-xs text-slate-600 font-medium animate-in fade-in slide-in-from-bottom-2">
                  <strong className={answeredCorrectly ? "text-green-600" : "text-rose-600"}>
                    {answeredCorrectly ? "Correct! " : "Oops! "}
                  </strong>
                  {question.explanation}
                </div>
              )}
            </div>
            
            {selectedIdx !== null && (
              <button
                onClick={handleNextClick}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-xl text-sm transition-all"
              >
                {currentIdx < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "Complete Quiz"}
              </button>
            )}
          </div>
        </div>
      )}

      {gameState === "summary" && (
        <div className="flex flex-col items-center text-center max-w-md mx-auto my-auto gap-6 py-6 animate-in zoom-in-95 duration-200">
          <Award className="w-16 h-16 text-yellow-500 stroke-[2] fill-yellow-100" />
          
          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-1">Challenge Completed!</h3>
            <p className="text-sm font-semibold text-slate-500 mb-4">
              Great effort, Ocean Guardian!
            </p>
            <div className="bg-theme-primary-light border border-theme-primary/15 rounded-2xl p-6 flex flex-col gap-2">
              <p className="text-xs text-theme-primary font-bold uppercase tracking-wider">Your Quiz Score</p>
              <h4 className="text-4xl font-black text-theme-primary-dark">{score} <span className="text-lg font-bold">/ 60 pts</span></h4>
              <p className="text-xs text-theme-primary font-bold mt-2">
                {score >= 40 
                  ? "🎉 Incredible! You earned the 'Trivia Champ' Badge!" 
                  : "Try again to score 40+ and earn your Badge!"}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={startQuiz}
              className="px-6 py-3 border-2 border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-extrabold rounded-xl text-sm transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// SUB-GAME 3: MEMORY MATCH
// -------------------------------------------------------------
interface MemoryCard {
  uniqueId: number;
  id: number;
  name: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onEarnBadge: (badgeId: string) => void;
  triggerConfetti: () => void;
  badges: string[];
  onAddPoints: (pts: number) => void;
}

function MemoryGame({ onEarnBadge, triggerConfetti, badges, onAddPoints }: MemoryGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "complete">("idle");
  const [mismatchedCards, setMismatchedCards] = useState<number[]>([]);
  const [recentlyMatched, setRecentlyMatched] = useState<number[]>([]);

  const setupGame = () => {
    playBubblePop();
    setMoves(0);
    setMatches(0);
    setSelectedCards([]);
    setMismatchedCards([]);
    setRecentlyMatched([]);

    // Double the animal array to create pairs
    const doubleItems = [...MEMORY_ITEMS, ...MEMORY_ITEMS].map((item, idx) => ({
      uniqueId: idx,
      id: item.id,
      name: item.name,
      emoji: item.emoji,
      isFlipped: false,
      isMatched: false,
    }));

    // Fisher-Yates Shuffle
    for (let i = doubleItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubleItems[i], doubleItems[j]] = [doubleItems[j], doubleItems[i]];
    }

    setCards(doubleItems);
    setGameState("playing");
  };

  const handleCardClick = (uniqueId: number) => {
    // Prevent clicking if two cards are already flipped checking for match
    if (selectedCards.length >= 2) return;

    const clickedCard = cards.find((c) => c.uniqueId === uniqueId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    playBubblePop();
    
    // Flip card
    setCards((prev) =>
      prev.map((c) => (c.uniqueId === uniqueId ? { ...c, isFlipped: true } : c))
    );

    const nextSelection = [...selectedCards, uniqueId];
    setSelectedCards(nextSelection);

    if (nextSelection.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = nextSelection;
      const card1 = cards.find((c) => c.uniqueId === firstId)!;
      const card2 = cards.find((c) => c.uniqueId === secondId)!;

      if (card1.id === card2.id) {
        // MATCH FOUND
        setRecentlyMatched([firstId, secondId]);
        setTimeout(() => {
          playSuccessChime();
          setCards((prev) =>
            prev.map((c) =>
              c.uniqueId === firstId || c.uniqueId === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatches((m) => m + 1);
          setSelectedCards([]);
          setTimeout(() => {
            setRecentlyMatched([]);
          }, 800);
        }, 400);
      } else {
        // NO MATCH
        setMismatchedCards([firstId, secondId]);
        setTimeout(() => {
          playFailureBuzz();
        }, 150);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uniqueId === firstId || c.uniqueId === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setMismatchedCards([]);
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const handleGameComplete = useCallback(() => {
    setGameState("complete");
    setTimeout(() => {
      onEarnBadge("memory-master");
      onAddPoints(30);
      triggerConfetti();
    }, 0);
  }, [onEarnBadge, onAddPoints, triggerConfetti]);

  useEffect(() => {
    if (matches === MEMORY_ITEMS.length && gameState === "playing") {
      handleGameComplete();
    }
  }, [matches, gameState, handleGameComplete]);

  return (
    <div className="flex flex-col flex-1 justify-between gap-6">
      {gameState === "idle" && (
        <div className="flex flex-col items-center text-center max-w-md mx-auto my-auto gap-6 py-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center text-3xl animate-bounce shadow-md">
            🧠
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Marine Memory Match</h3>
            <p className="text-sm text-slate-500 font-bold leading-relaxed">
              Match pairs of beautiful marine animals under as few moves as possible! Completing it awards 30 points and the 'Memory Master' Badge.
            </p>
          </div>
          <button
            onClick={setupGame}
            className="px-8 py-4 bg-theme-primary text-white font-extrabold rounded-2xl hover:bg-theme-primary-hover active:scale-95 transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Play Memory Match</span>
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="flex flex-col flex-1 justify-between gap-5 select-none">
          {/* Top Panel: Moves and Match count */}
          <div className="flex items-center justify-between text-sm font-black text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-theme-primary">Moves: {moves}</span>
            <span>Matched: {matches} / {MEMORY_ITEMS.length}</span>
            <button
              onClick={setupGame}
              className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          {/* Cards Grid */}
          <div className="memory-grid max-w-md mx-auto w-full">
            {cards.map((card) => {
              const showFace = card.isFlipped || card.isMatched;
              const isMismatched = mismatchedCards.includes(card.uniqueId);
              const isRecentlyMatched = recentlyMatched.includes(card.uniqueId);
              
              return (
                <div
                  key={card.uniqueId}
                  onClick={() => handleCardClick(card.uniqueId)}
                  className={`perspective-1000 aspect-square cursor-pointer transition-transform ${
                    isMismatched ? "animate-shake" : ""
                  } ${isRecentlyMatched ? "animate-pop-success" : ""}`}
                >
                  <div
                    className={`relative w-full h-full transform-style-3d transition-transform duration-300 rounded-xl border-2 ${
                      showFace 
                        ? card.isMatched 
                          ? "border-emerald-400 bg-emerald-50/90 shadow-xs" 
                          : isMismatched
                            ? "border-rose-400 bg-rose-50"
                            : "border-theme-primary bg-theme-primary-light" 
                        : "border-slate-200 bg-slate-100 hover:border-slate-300"
                    } ${showFace ? "rotate-y-180" : ""}`}
                  >
                    {/* Card Back */}
                    <div className="absolute inset-0 backface-hidden flex items-center justify-center bg-theme-primary-light rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center shadow-xs transition-transform hover:scale-110">
                        <span className="text-xl">🌊</span>
                      </div>
                    </div>

                    {/* Card Front */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-2 rounded-xl">
                      {card.isMatched && (
                        <span className="absolute top-1 right-1 text-[8px] bg-emerald-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                          ✓
                        </span>
                      )}
                      <span className="text-3xl md:text-4xl mb-0.5">{card.emoji}</span>
                      <span className="text-[9px] font-black text-slate-600 uppercase text-center hidden md:block">
                        {card.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {gameState === "complete" && (
        <div className="flex flex-col items-center text-center max-w-md mx-auto my-auto gap-6 py-6 animate-in zoom-in-95 duration-200">
          <div className="relative">
            <Award className="w-16 h-16 text-yellow-500 stroke-[2] fill-yellow-100" />
            <Sparkles className="w-6 h-6 text-amber-500 absolute -top-1 -right-1 fill-amber-300 animate-pulse" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-1">Memory Game Complete!</h3>
            <p className="text-sm font-semibold text-slate-500 mb-4">
              Excellent concentration, Ocean Guardian!
            </p>
            <div className="bg-theme-primary-light border border-theme-primary/15 rounded-2xl p-6 flex flex-col gap-2">
              <p className="text-xs text-theme-primary font-bold uppercase tracking-wider">Your Performance</p>
              <h4 className="text-3xl font-black text-theme-primary-dark">{moves} moves</h4>
              <p className="text-xs text-theme-primary font-bold mt-2">
                🏆 You unlocked the 'Memory Master' Badge +30 points!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={setupGame}
              className="px-6 py-3 border-2 border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-extrabold rounded-xl text-sm transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
