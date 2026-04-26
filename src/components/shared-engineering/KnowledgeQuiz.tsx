import { useState } from 'react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

interface Props {
  questions: Question[];
  title?: string;
}

/** 
 * Standardized Multiple Choice Engine.
 * Provides immediate feedback and state management for conceptual validation.
 */
export default function KnowledgeQuiz({ questions, title = 'Check Your Understanding' }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleSelect = (qId: string, index: number) => {
    if (submitted[qId]) return;
    setAnswers(prev => ({ ...prev, [qId]: index }));
  };

  return (
    <section className="my-12 rounded-[32px] border-2 border-border-color bg-blueprint-surface p-8 shadow-xl">
      <h4 className="text-text-main mb-8 font-mono text-xl font-black uppercase tracking-tighter">
        {title}
      </h4>
      <div className="space-y-10">
        {questions.map((q) => (
          <div key={q.id} className="space-y-4">
            <p className="text-text-main font-bold leading-tight">{q.text}</p>
            <div className="grid gap-2">
              {q.options.map((opt, idx) => {
                const isSelected = answers[q.id] === idx;
                const isCorrect = q.correctIndex === idx;
                const showResult = submitted[q.id];

                let btnClass = 'border-border-color bg-blueprint-bg hover:border-color-accent';
                if (isSelected) btnClass = 'border-color-accent bg-color-accent-dim ring-1 ring-color-accent';
                if (showResult && isCorrect) btnClass = 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500';
                if (showResult && isSelected && !isCorrect) btnClass = 'border-rose-500 bg-rose-500/10 ring-1 ring-rose-500';

                return (
                  <button key={idx} onClick={() => handleSelect(q.id, idx)} className={`rounded-xl border-2 p-4 text-left font-medium transition-all ${btnClass}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {!submitted[q.id] && answers[q.id] !== undefined && (
              <button
                onClick={() => setSubmitted(p => ({ ...p, [q.id]: true }))}
                className="bg-color-accent rounded-lg px-4 py-2 font-mono text-[14px] font-bold uppercase text-white"
              >
                Verify Answer
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
