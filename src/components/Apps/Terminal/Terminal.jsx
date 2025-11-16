import React, { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Sparkles, X, Zap } from "lucide-react";
import useStore from "../../../store/windowStore";
import { createCommandHandlers } from "../../../apps/Terminal/core/commands";
import { historyManager } from "../../../apps/Terminal/core/history";
import { getAutocompleteSuggestions } from "../../../apps/Terminal/core/autocomplete";
import {
  getTheme,
  loadThemePreference,
  saveThemePreference,
  themes,
} from "../../../apps/Terminal/core/themes";

const uid = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(36).slice(2, 10)}`;
};

const PROMPT_USER = "bill";
const PROMPT_HOST = "LinuxOnWeb";

const normalizeHomePath = (path) => {
  if (!path) return "~";
  return path.replace(/^\/home\/bill/, "~") || "~";
};

const createSession = (index) => ({
  id: uid(),
  title: `tty-${index + 1}`,
  cwd: "/home/bill",
  input: "",
  log: [
    {
      id: uid(),
      type: "system",
      text: "LinuxOnWeb Terminal v2.0 · Linux playground ready. Type `help` to explore.",
    },
  ],
});

const MATRIX_CHARS = "01▮▯░▒▓";
const generateMatrixStream = () => {
  const rows = 18;
  const cols = 42;
  const lines = [];
  for (let r = 0; r < rows; r += 1) {
    let line = "";
    for (let c = 0; c < cols; c += 1) {
      line += MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
    }
    lines.push(line);
  }
  return lines.join("\n");
};

const MatrixOverlay = ({ active, stream, accent }) => {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <pre className="text-xs font-mono leading-snug" style={{ color: accent }}>
        {stream}
      </pre>
    </div>
  );
};

const Terminal = () => {
  const openWindow = useStore((state) => state.openWindow);

  const sessionCounterRef = useRef(1);
  const initialSession = useMemo(() => createSession(0), []);
  const [sessions, setSessions] = useState(() => [initialSession]);
  const [activeSessionId, setActiveSessionId] = useState(() => initialSession.id);
  const sessionsRef = useRef(sessions);

  useEffect(() => {
    sessionsRef.current = sessions;
  }, [sessions]);

  const [themeName, setThemeName] = useState(() => loadThemePreference());
  const theme = useMemo(() => getTheme(themeName), [themeName]);

  const [autocomplete, setAutocomplete] = useState({
    suggestions: [],
    token: "",
    tokenStart: 0,
    context: "command",
  });

  const [matrixActive, setMatrixActive] = useState(false);
  const [matrixStream, setMatrixStream] = useState(generateMatrixStream());
  const matrixTimerRef = useRef(null);
  const audioCtxRef = useRef(null);

  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [isCaretAtEnd, setIsCaretAtEnd] = useState(true);

  const activeSession = sessions.find((session) => session.id === activeSessionId) || sessions[0];

  useEffect(() => {
    if (activeSession) {
      setAutocomplete(getAutocompleteSuggestions(activeSession.input, activeSession.cwd));
    } else {
      setAutocomplete({ suggestions: [], token: "", tokenStart: 0, context: "command" });
    }
  }, [activeSession]);


  useEffect(() => {
    if (!outputRef.current) return;
    outputRef.current.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [activeSession?.log]);

  useEffect(() => {
    if (!matrixActive) return undefined;
    const interval = setInterval(() => setMatrixStream(generateMatrixStream()), 120);
    return () => clearInterval(interval);
  }, [matrixActive]);

  useEffect(() => () => {
    if (matrixTimerRef.current) {
      clearTimeout(matrixTimerRef.current);
    }
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const getSuggestionTail = (suggestion, inputValue = "") => {
    if (!suggestion) return "";
    const tokenValue = autocomplete.token || "";
    if (!tokenValue) {
      return inputValue.endsWith(" ") ? suggestion.value : "";
    }
    if (!suggestion.value.startsWith(tokenValue)) return "";
    const remainder = suggestion.value.slice(tokenValue.length);
    return remainder.length ? remainder : "";
  };

  const updateSessionState = (sessionId, transform) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== sessionId) return session;
        return transform(session);
      })
    );
  };

  const appendLog = (sessionId, entry) => {
    const safeText = entry.text ?? "";
    updateSessionState(sessionId, (session) => ({
      ...session,
      log: [...session.log, { id: uid(), ...entry, text: String(safeText) }],
    }));
  };

  const setSessionInput = (sessionId, value) => {
    updateSessionState(sessionId, (session) => ({
      ...session,
      input: value,
    }));
  };

  const setSessionCwd = (sessionId, path) => {
    updateSessionState(sessionId, (session) => ({
      ...session,
      cwd: path,
    }));
  };

  const clearSessionLog = (sessionId) => {
    updateSessionState(sessionId, (session) => ({
      ...session,
      log: [],
    }));
  };

  const getSessionById = (sessionId) =>
    sessionsRef.current.find((session) => session.id === sessionId);

  const handleThemeChange = (name) => {
    setThemeName(name);
    saveThemePreference(name);
  };

  const cycleTheme = () => {
    const keys = Object.keys(themes);
    const index = keys.indexOf(themeName);
    const next = keys[(index + 1) % keys.length];
    handleThemeChange(next);
  };

  const triggerMatrix = () => {
    setMatrixActive(true);
    if (matrixTimerRef.current) {
      clearTimeout(matrixTimerRef.current);
    }
    matrixTimerRef.current = setTimeout(() => setMatrixActive(false), 4500);
  };

  const playAudioCue = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 620;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (error) {
      console.warn("Audio playback failed", error);
    }
  };

  const requestPassword = () => {
    if (typeof window === "undefined") return Promise.resolve("");
    const result = window.prompt("Enter sudo password for bill:");
    return Promise.resolve(result || "");
  };

  const updateAutocompleteForInput = (value, cwd) => {
    const next = getAutocompleteSuggestions(value, cwd);
    setAutocomplete(next);
  };

  const handleInputChange = (value) => {
    if (!activeSession) return;
    setSessionInput(activeSession.id, value);
    updateAutocompleteForInput(value, activeSession.cwd);
    historyManager.resetCursor();
    setIsCaretAtEnd(true);
  };

  const applySuggestion = (choice) => {
    if (!choice || !activeSession) return;
    const inputValue = activeSession.input;
    const replaceStart = Math.max(0, autocomplete.tokenStart);
    const replaceEnd = replaceStart + (autocomplete.token?.length || 0);
    const prefix = inputValue.slice(0, replaceStart);
    const suffix = inputValue.slice(replaceEnd);
    const shouldAddSpace = autocomplete.context === "command" || choice.type === "file";
    const insertion = `${choice.value}${shouldAddSpace ? " " : ""}`;
  const nextValue = `${prefix}${insertion}${suffix}`;
  setSessionInput(activeSession.id, nextValue);
  updateAutocompleteForInput(nextValue, activeSession.cwd);
    setIsCaretAtEnd(true);
    requestAnimationFrame(() => focusInput());
  };

  const formatPrompt = (session) => {
    if (!session) return `$`;
    const path = normalizeHomePath(session.cwd);
    return `${PROMPT_USER}@${PROMPT_HOST}:${path}$`;
  };

  const runCommand = async (sessionId, rawInput) => {
    const text = rawInput.trim();
    if (!text) return;
    const session = getSessionById(sessionId);
    appendLog(sessionId, { type: "input", text: `${formatPrompt(session)} ${text}` });

    const handler = createCommandHandlers({
      getCwd: () => getSessionById(sessionId)?.cwd || "/home/bill",
      setCwd: (nextPath) => setSessionCwd(sessionId, nextPath),
      print: (message) => {
        const safe = typeof message === "string" ? message : String(message ?? "");
        appendLog(sessionId, { type: "output", text: safe });
      },
      setTheme: handleThemeChange,
      promptPassword: requestPassword,
      openMatrix: triggerMatrix,
      playAudio: playAudioCue,
      openFileManager: () => openWindow("file-manager"),
    });

    historyManager.add(text);
    historyManager.resetCursor();

    const result = await handler.run(text);
    if (result === "__clear__") {
      clearSessionLog(sessionId);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!activeSession) return;
    await runCommand(activeSession.id, activeSession.input);
    setSessionInput(activeSession.id, "");
    setAutocomplete({ suggestions: [], token: "", tokenStart: 0, context: "command" });
    focusInput();
  };

  const handleKeyDown = (event) => {
    if (!activeSession) return;
  const bestSuggestion = autocomplete.suggestions[0];
  const suggestionTail = getSuggestionTail(bestSuggestion, event.currentTarget.value);
    const caretAtEnd = event.currentTarget.selectionStart === event.currentTarget.value.length &&
      event.currentTarget.selectionEnd === event.currentTarget.value.length;
    setIsCaretAtEnd(caretAtEnd);

    if (event.key === "Tab") {
      if (autocomplete.suggestions.length) {
        event.preventDefault();
        applySuggestion(autocomplete.suggestions[0]);
      }
      return;
    }

    if (event.key === "ArrowRight" && caretAtEnd && suggestionTail) {
      event.preventDefault();
      applySuggestion(bestSuggestion);
      return;
    }

    if (!event.ctrlKey && !event.metaKey && !event.altKey) {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const previous = historyManager.navigate("up");
        setSessionInput(activeSession.id, previous);
        updateAutocompleteForInput(previous, activeSession.cwd);
        setIsCaretAtEnd(true);
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next = historyManager.navigate("down");
        setSessionInput(activeSession.id, next);
        updateAutocompleteForInput(next, activeSession.cwd);
        setIsCaretAtEnd(true);
        return;
      }
    }

    if (event.ctrlKey && !event.shiftKey && !event.altKey) {
      const key = event.key.toLowerCase();
      if (key === "l") {
        event.preventDefault();
        clearSessionLog(activeSession.id);
      } else if (key === "t") {
        event.preventDefault();
        handleAddSession();
      } else if (key === "w") {
        event.preventDefault();
        handleCloseSession(activeSession.id);
      }
    }
  };

  const handleAddSession = () => {
    sessionCounterRef.current += 1;
    const newSession = createSession(sessionCounterRef.current - 1);
    setSessions((prev) => [...prev, newSession]);
    setActiveSessionId(newSession.id);
    requestAnimationFrame(() => focusInput());
  };

  const handleCloseSession = (sessionId) => {
    if (sessionsRef.current.length === 1) {
      appendLog(sessionId, {
        type: "system",
        text: "Cannot close the last tab.",
      });
      return;
    }
    setSessions((prev) => {
      const filtered = prev.filter((session) => session.id !== sessionId);
      if (sessionId === activeSessionId && filtered.length) {
        setActiveSessionId(filtered[filtered.length - 1].id);
      }
      return filtered;
    });
  };

  const renderLog = () => {
    if (!activeSession) return null;
    return activeSession.log.map((entry) => {
      const color =
        entry.type === "input"
          ? theme.prompt
          : entry.type === "system"
          ? theme.muted
          : entry.type === "error"
          ? "#f87171"
          : theme.text;
      return (
        <div
          key={entry.id}
          className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words"
          style={{ color }}
        >
          {entry.text}
        </div>
      );
    });
  };

  return (
    <div
      className="h-full w-full overflow-hidden"
      style={{ background: theme.background }}
      onClick={focusInput}
    >
      <div className="relative flex h-full flex-col gap-4 p-4 text-white">
        <div className="flex flex-wrap items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
          <div className="flex items-center gap-2 overflow-x-auto">
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <div
                  key={session.id}
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveSessionId(session.id);
                    focusInput();
                  }}
                  className={`group flex items-center gap-2 rounded-2xl border px-3 py-1.5 text-sm transition ${
                    isActive
                      ? "border-white/40 bg-white/15 text-white"
                      : "border-white/5 text-white/60 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span>{session.title}</span>
                  <button
                    type="button"
                    className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCloseSession(session.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-2xl border border-dashed border-white/30 text-white/80 transition hover:border-white hover:text-white"
              onClick={(event) => {
                event.stopPropagation();
                handleAddSession();
              }}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/70">
            <span className="hidden items-center gap-1 sm:flex">
              <Sparkles className="h-4 w-4 text-amber-300" />
              {themes[themeName]?.name || themeName}
            </span>
            <button
              type="button"
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-wide text-white/80"
              onClick={(event) => {
                event.stopPropagation();
                cycleTheme();
              }}
            >
              Cycle theme
              <Zap className="h-3.5 w-3.5 text-amber-200" />
            </button>
          </div>
        </div>

        <div
          className="relative flex-1 rounded-3xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-2xl"
          onClick={(event) => {
            event.stopPropagation();
            focusInput();
          }}
        >
          <MatrixOverlay active={matrixActive} stream={matrixStream} accent={theme.accent} />
          <div ref={outputRef} className="flex h-full flex-col space-y-2 overflow-auto px-6 pt-6 pb-32">
            {renderLog()}
          </div>

          <form
            onSubmit={handleSubmit}
            className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-black/50 px-6 py-4 backdrop-blur-lg"
          >
            <div className="flex items-center gap-3 font-mono text-sm">
              <span style={{ color: theme.prompt }}>{formatPrompt(activeSession)}</span>
              <div className="relative flex-1">
                {(() => {
                  const inputValue = activeSession?.input || "";
                  const bestSuggestion = autocomplete.suggestions[0];
                  const suggestionTail = isCaretAtEnd
                    ? getSuggestionTail(bestSuggestion, inputValue)
                    : "";
                  if (!suggestionTail) return null;
                  return (
                    <div className="pointer-events-none absolute inset-0 flex items-center whitespace-pre text-white/30">
                      <span className="opacity-0">{inputValue}</span>
                      <span>{suggestionTail}</span>
                    </div>
                  );
                })()}
                <input
                  ref={inputRef}
                  type="text"
                  value={activeSession?.input || ""}
                  onChange={(event) => handleInputChange(event.target.value)}
                  onKeyDown={handleKeyDown}
                  onSelect={(event) => {
                    const target = event.currentTarget;
                    setIsCaretAtEnd(
                      target.selectionStart === target.value.length &&
                        target.selectionEnd === target.value.length
                    );
                  }}
                  className="relative z-10 w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
                  spellCheck={false}
                  autoComplete="off"
                  style={{ caretColor: theme.cursor }}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wide text-white/50">
          <span>cwd: {normalizeHomePath(activeSession?.cwd || "/")}</span>
          <span>tabs: {sessions.length}</span>
          <span>shortcuts: Ctrl+T new · Ctrl+W close · Ctrl+L clear</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
