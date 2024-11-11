import { Action, ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataStatus } from "../../types/redux"
import { IUser } from "../../types/user";
import userState from "../../types/userState";


const initialData: userState = {
    error: null,
    status: dataStatus.IDLE,
    user: null
}

const fetchLogin = createAsyncThunk('user/login',
    async (user: { username: string, password: string }, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                return thunkAPI.rejectWithValue("Couldn't login Please try again")
            }
            const data = await response.json()
            console.log('token', data.token)
            localStorage.setItem('token', data.token)
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong')
        }
    })

const fetchRegister = createAsyncThunk('user/register',
    async (user: { username: string, password: string, isAdmin: boolean }, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                return thunkAPI.rejectWithValue("Couldn't login Please try again")
            }
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong')
        }

    })

const userSlice = createSlice({
    name: 'user',
    initialState: initialData,
    reducers: {
       updateVoteStatus: (state, action) => {
           if (state.user) {
               state.user.votedFor = action.payload
               state.user.hasVoted = true
           }
       }
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => { 
        builder.addCase(fetchLogin.pending, (state) => {
             state.status = dataStatus.LOADING 
             state.error = null
             state.user = null
        }).addCase(fetchLogin.fulfilled, (state, action) => {
            console.log('login', action.payload)
            state.user = action.payload as unknown as IUser
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(fetchLogin.rejected, (state, action) => {
            state.error = action.error as string
            console.log(state.error)
            state.user = null
            state.status = dataStatus.FAILED
        }).addCase(fetchRegister.fulfilled, (state, action) => {
            state.user = action.payload as unknown as IUser
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(fetchRegister.rejected, (state, action) => {
            state.error = action.error as string
            state.user = null
            state.status = dataStatus.FAILED
        })
    }
})

export const { updateVoteStatus } = userSlice.actions
export { fetchLogin, fetchRegister }
export default userSlice
