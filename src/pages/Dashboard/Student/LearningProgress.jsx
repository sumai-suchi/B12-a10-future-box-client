import { useState, useRef, useEffect } from "react";
import { 
  CpuChipIcon, 
  PaperAirplaneIcon, 
  SparklesIcon, 
  UserIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";

const LearningProgress = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I am your AI Study Assistant. Based on your recent profile overview, you are making progress across your active courses! Is there a complex topic you want simplified, or would you like to plan a custom study path?",
      time: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  // Mock data for archived chats history
  const chatHistory = [
    { id: "h1", title: "React Context Architecture", date: "Yesterday" },
    { id: "h2", title: "Database Normalization Help", date: "June 10, 2026" },
    { id: "h3", title: "UI/UX Layout Systems", date: "June 08, 2026" },
  ];

  // Auto-scroll chat window to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 const handleSendMessage = async (e) => {
  e.preventDefault();

  if (!inputValue.trim()) return;

  const userMessage = {
    id: Date.now(),
    sender: "user",
    text: inputValue,
    time: "Just now",
  };

  setMessages((prev) => [...prev, userMessage]);

  const currentInput = inputValue;
  setInputValue("");

  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: currentInput,
      }),
    });

    const data = await res.json();

    const aiMessage = {
      id: Date.now() + 1,
      sender: "ai",
      text: data.reply || "Sorry, I couldn't generate a response.",
      time: "Just now",
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: "ai",
        text: "Server error. Please try again.",
        time: "Just now",
      },
    ]);
  }
};

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-1">
      
      {/* Header Description */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <SparklesIcon className="w-6 h-6 text-indigo-600 animate-pulse" />
          AI Mentor Hub
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Consult with your dedicated 24/7 learning supervisor to clear bottlenecks across your active syllabus tracks.
        </p>
      </div>

      {/* Main Framework Grid Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ================= LEFT SIDE: SMART AI CHAT INTERFACE (8 Columns) ================= */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-[560px] overflow-hidden order-1">
          
          {/* Chat Header Canvas */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-indigo-200">
                <CpuChipIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  Future-Box AI Guide
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-[11px] text-slate-400">Personalized educational co-pilot</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              Beta v1.2
            </span>
          </div>

          {/* Chat Bubble Layout Engine */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon Config */}
                <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold shadow-xs ${
                  msg.sender === "user" ? "bg-slate-200 text-slate-700" : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                }`}>
                  {msg.sender === "user" ? <UserIcon className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4" />}
                </div>

                {/* Core Message Container */}
                <div className="space-y-1">
                  <div className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-sm shadow-indigo-100" 
                      : "bg-white border border-slate-200/80 text-slate-700 rounded-tl-none shadow-xs"
                  }`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                  <p className={`text-[10px] text-slate-400 font-medium ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Interactive Quick Preset Tags */}
          <div className="px-4 py-2 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar bg-white">
            {[
              "Simplify state optimization concepts",
              "Draft a quick summary on architectural models",
              "Help me plan my weekly study targets"
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setInputValue(preset)}
                className="text-[11px] font-medium text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-100 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Chat Form Submission Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask your AI mentor anything regarding your dashboard tracks..."
              className="flex-1 bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 px-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-sm shadow-indigo-200 shrink-0"
            >
              <PaperAirplaneIcon className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* ================= RIGHT SIDE: HISTORY & GUIDE UTILITIES (4 Columns) ================= */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between order-2">
          
          {/* Chat History Component Module */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 flex-1 flex flex-col min-h-[240px]">
            <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <ChatBubbleLeftRightIcon className="w-4 h-4 text-indigo-600" />
              Recent Discussions
            </h3>
            
            <div className="space-y-2 flex-1 overflow-y-auto max-h-[180px] pr-1 custom-scrollbar">
              {chatHistory.map((item) => (
                <div 
                  key={item.id} 
                  className="p-2.5 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/20 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <BookOpenIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                    <span className="text-xs text-slate-600 font-medium truncate group-hover:text-slate-900">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap pl-2">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines / How-to Onboarding Box */}
          <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white border border-slate-800 rounded-2xl p-5 shadow-md space-y-4 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-amber-400">
              <QuestionMarkCircleIcon className="w-5 h-5" />
              <h4 className="text-sm font-bold tracking-tight">How to Use the Assistant</h4>
            </div>
            
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex gap-2.5 items-start">
                <LightBulbIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white font-medium">Be Topic Specific:</strong> Drop complicated parameters or syntax queries directly to receive custom-tailored code breakdowns.
                </p>
              </div>
              <div className="flex gap-2.5 items-start border-t border-white/10 pt-3.5">
                <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white font-medium">Use Action Prompts:</strong> Utilize the baseline pill links above the text submission line for instant diagnostic summaries.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LearningProgress;