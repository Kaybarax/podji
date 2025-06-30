import { create } from 'zustand';

// Define a basic store interface
export interface AppState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Create a store with initial state and actions
export const useAppStore = create<AppState>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}));
