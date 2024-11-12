import { Action, ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataStatus } from "../../types/redux"
import { IUser } from "../../types/user";
import userState from "../../types/userState";


const initialData: userState = {
    error: null,
    status: dataStatus.IDLE,
    user: null,
    isAuthenticated: false

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


// Async thunk for checking auth status
const checkAuth = createAsyncThunk(
    'user/verify',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No token found');
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/verify', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',        
                    'Authorization': token
                 },
            });

            if (!response.ok) {
                localStorage.removeItem('token');
                return rejectWithValue('Invalid token');
            }

            const data = await response.json();
            console.log('token', data.token)
            localStorage.setItem('token', data.token)
            return data.data;
        } catch (error) {
            return rejectWithValue('Auth check failed');
        }
    }
);

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
            state.isAuthenticated = true
            state.status = dataStatus.SUCCESS
        }).addCase(fetchLogin.rejected, (state, action) => {
            state.error = action.error as string
            console.log(state.error)
            state.isAuthenticated = false
            state.user = null
            state.status = dataStatus.FAILED
        }).addCase(fetchRegister.fulfilled, (state) => {
            state.user = null
            state.error = null
            state.status = dataStatus.SUCCESS
        }).addCase(fetchRegister.rejected, (state, action) => {
            state.error = action.error as string
            state.user = null
            state.status = dataStatus.FAILED
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.user = action.payload as unknown as IUser
            state.status = dataStatus.SUCCESS
            state.isAuthenticated = true
            console.log("fulfilled")
        }).addCase(checkAuth.rejected, (state, action) => {
            state.error = action.error as string
            state.user = null
            state.isAuthenticated = false
            state.status = dataStatus.FAILED
            console.log("rejected")
        }).addCase(checkAuth.pending, (state) => {
            state.status = dataStatus.LOADING
            state.error = null
            state.user = null
            console.log("pending")
        })
    }
})

export const { updateVoteStatus } = userSlice.actions
export { fetchLogin, fetchRegister, checkAuth }
export default userSlice
