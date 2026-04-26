import type { Locale } from '../domain/types';

export interface GlossaryDefinition {
  term: string;
  definition: string;
}

/** 
 * Central Technical Registry.
 * Note: Keys must be lowercase for the Auto-Linker regex match.
 */
export const GLOSSARY: Record<string, Record<Locale, GlossaryDefinition>> = {
  'dfa': {
    en: { term: 'DFA', definition: 'Deterministic Finite Automaton: A theoretical model of computation used to recognize regular languages.' },
    es: { term: 'DFA', definition: 'Autómata Finito Determinista: Un modelo teórico de computación utilizado para reconocer lenguajes regulares.' }
  },
  'normalization': {
    en: { term: 'Normalization', definition: 'The process of adjusting values measured on different scales to a notionally common scale.' },
    es: { term: 'Normalización', definition: 'El proceso de ajustar valores medidos en diferentes escalas a una escala común.' }
  },
  'latency': {
    en: { term: 'Latency', definition: 'The time delay between a cause and the effect of some physical change in the system.' },
    es: { term: 'Latencia', definition: 'El retraso de tiempo entre una causa y el efecto de algún cambio físico en el sistema.' }
  },
  'solid': {
    en: { term: 'SOLID', definition: 'Design principles intended to make software designs more understandable, flexible, and maintainable.' },
    es: { term: 'SOLID', definition: 'Principios de diseño destinados a hacer que los diseños de software sean más comprensibles, flexibles y mantenibles.' }
  }
};
