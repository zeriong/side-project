import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {store} from "./index";

export const resetSliderIndex = () => {
    store.dispatch(contentSlice.actions.RESET_SLIDER_INDEX());
}
export const setSliderIndex = (i: number) => {
    store.dispatch(contentSlice.actions.SET_SLIDER_INDEX(i));
}

interface InitState {
    sliderIndex: number;
    isLoading: boolean;
}

const initState: InitState = {
    sliderIndex: 0,
    isLoading: true,
}

export const contentSlice = createSlice({
    name: 'content',
    initialState: initState,
    reducers: {
        SET_SLIDER_INDEX: (state: InitState, action: PayloadAction<number>) => {
            state.sliderIndex = action.payload;
        },
        RESET_SLIDER_INDEX: (state: InitState) => {
            state.sliderIndex = 0;
        },
    }
})

export const { SET_SLIDER_INDEX } = contentSlice.actions;