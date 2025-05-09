// store/reducer/progressSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  readMaterials: number[];
  answeredQuiz: number[];
  score: number; 
}

const initialState: ProgressState = {
  readMaterials: [],
  answeredQuiz: [],
  score: 0, 
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    markMaterialRead(state, action: PayloadAction<number>) {
      if (!state.readMaterials.includes(action.payload)) {
        state.readMaterials.push(action.payload);
      }
    },
    markQuizAnswered(state, action: PayloadAction<number>) {
      if (!state.answeredQuiz.includes(action.payload)) {
        state.answeredQuiz.push(action.payload);
      }
    },
    incrementMaterial(state) {
      state.readMaterials.push(state.readMaterials.length + 1);
    },
    incrementQuiz(state) {
      state.answeredQuiz.push(state.answeredQuiz.length + 1);
    },
    addScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
    resetProgress(state) {
      state.readMaterials = [];
      state.answeredQuiz = [];
      state.score = 0;
    }
  }
});

export const {
  markMaterialRead,
  markQuizAnswered,
  incrementMaterial,
  incrementQuiz,
  addScore,
  resetProgress
} = progressSlice.actions;

export default progressSlice.reducer;
