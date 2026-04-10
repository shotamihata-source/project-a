"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "numpad-typer-templates-v1";
const THEME_STORAGE_KEY = "numpad-typer-theme-v1";

const defaultTemplates = {
  0: "お世話になっております。\n",
  1: "ご連絡ありがとうございます。\n",
  2: "下記、ご確認をお願いいたします。\n",
  3: "日程候補は以下の通りです。\n",
  4: "本件、承知いたしました。\n",
  5: "ご不明点があればお知らせください。\n",
  6: "引き続きよろしくお願いいたします。\n",
  7: "本日の議事録を共有します。\n",
  8: "お手数をおかけしますが、よろしくお願いいたします。\n",
  9: "以上、何卒よろしくお願いいたします。\n",
};

export default function NumpadTyper() {
  const [templates, setTemplates] = useState(defaultTemplates);
  const [text, setText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTemplates(JSON.parse(saved));
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    if (theme) setIsDarkMode(theme === "dark");
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key >= "0" && e.key <= "9" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const num = e.key as unknown as keyof typeof templates;
      if (textAreaRef.current) {
        const start = textAreaRef.current.selectionStart;
        const end = textAreaRef.current.selectionEnd;
        const newText = text.substring(0, start) + templates[num] + text.substring(end);
        setText(newText);
        e.preventDefault();
        
        setTimeout(() => {
          if (textAreaRef.current) {
            const newPos = start + templates[num].length;
            textAreaRef.current.setSelectionRange(newPos, newPos);
            textAreaRef.current.focus();
          }
        }, 0);
      }
    }
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen p-4 transition-colors`}>
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Numpad Typer</h1>
          <button onClick={() => {
            const newMode = !isDarkMode;
            setIsDarkMode(newMode);
            localStorage.setItem(THEME_STORAGE_KEY, newMode ? "dark" : "light");
          }} className="p-2 rounded-lg border">
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
        
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="テンキー(0-9)を押すと定型文が入力されます..."
          className={`w-full h-64 p-4 rounded-xl border-2 focus:ring-2 outline-none text-lg ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        />

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(templates).map(([num, val]) => (
            <div key={num} className="flex flex-col space-y-1">
              <label className="text-sm font-semibold">Key {num}</label>
              <input
                type="text"
                value={val}
                onChange={(e) => {
                  const newTmpl = { ...templates, [num]: e.target.value };
                  setTemplates(newTmpl);
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTmpl));
                }}
                className={`p-2 rounded border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}