import { Action, ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataStatus } from "../../types/redux"

import candidateState from "../../types/candidateState";
import { ICandidate } from "../../types/candidate";


const initialData: candidateState = {
    error: null,
    status: dataStatus.IDLE,
    candidates: []
}

const fetchCandidates = createAsyncThunk('candidates/getList',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3000/api/candidates') 
            if (!response.ok) {
                return thunkAPI.rejectWithValue("Couldn't get candidates Please try again")
            }
            const data = await response.json()
            thunkAPI.fulfillWithValue(data)
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong')
        }
    })



const candidateSlice = createSlice({
    name: 'candidate',
    initialState: initialData,
    reducers: {
       
    },
    extraReducers: (builder: ActionReducerMapBuilder<candidateState>) => { 
        builder.addCase(fetchCandidates.pending, (state) => {
             state.status = dataStatus.LOADING 
             state.error = null
             state.candidates = []
        }).addCase(fetchCandidates.fulfilled, (state, action) => {
            state.candidates = action.payload as unknown as ICandidate[]
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(fetchCandidates.rejected, (state, action) => {
            state.error = action.error as string
            state.candidates = []
            state.status = dataStatus.FAILED
        })
    }
})

export default candidateSlice