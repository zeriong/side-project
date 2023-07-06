import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {store} from "./index";

export const setSliderIndex = (i: number) => {
    store.dispatch(contentSlice.actions.SET_SLIDER_INDEX(i));
}

interface InitState { sliderIndex: number }
const initState: InitState = { sliderIndex: 0 }

export const contentSlice = createSlice({
    name: 'content',
    initialState: initState,
    reducers: {
        SET_SLIDER_INDEX: (state: InitState, action: PayloadAction<number>) => {
            state.sliderIndex = action.payload;
        }
    }
});

// export const {  } = contentSlice.actions;