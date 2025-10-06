import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { gqlRequest } from '../service/graphql/client';
import {
  QUERY_USERS,
  QUERY_USER,
  MUTATION_CREATE_USER,
  MUTATION_UPDATE_USER,
  MUTATION_DELETE_USER,
} from '../service/graphql/queries';
import type {
  UsersQuery,
  UserQuery,
  CreateUserMutation,
  UpdateUserMutation,
  DeleteUserMutation,
  CreateUserInput,
  UpdateUserInput,
} from '../service/graphQLschemas/generated/typed-documents';

// Thunks
export const fetchUsersThunk = createAsyncThunk('users/fetchAll', async () => {
  const data = await gqlRequest<UsersQuery>(QUERY_USERS);
  return data.users;
});

export const fetchUserThunk = createAsyncThunk('users/fetchOne', async (id: string) => {
  const data = await gqlRequest<UserQuery, { id: string }>(QUERY_USER, { id });
  return data.user;
});

export const createUserThunk = createAsyncThunk('users/create', async (input: CreateUserInput) => {
  const data = await gqlRequest<CreateUserMutation, { input: CreateUserInput }>(MUTATION_CREATE_USER, { input });
  return data.createUser;
});

export const updateUserThunk = createAsyncThunk(
  'users/update',
  async (payload: { id: string; input: UpdateUserInput }) => {
    const { id, input } = payload;
    const data = await gqlRequest<UpdateUserMutation, { id: string; input: UpdateUserInput }>(MUTATION_UPDATE_USER, {
      id,
      input,
    });
    return data.updateUser;
  }
);

export const deleteUserThunk = createAsyncThunk('users/delete', async (id: string) => {
  const data = await gqlRequest<DeleteUserMutation, { id: string }>(MUTATION_DELETE_USER, { id });
  return data.deleteUser;
});

// State
type UserEntity = UsersQuery['users'][number];
export interface UsersState {
  list: UserEntity[];
  current: UserQuery['user'];
  loading: boolean;
  error?: string;
}

const initialState: UsersState = {
  list: [],
  current: null,
  loading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchUsers
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state, action: PayloadAction<UsersState['list']>) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchUsersThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // fetchUser
    builder.addCase(fetchUserThunk.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload as UsersState['current'];
    });
    builder.addCase(fetchUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // createUser
    builder.addCase(createUserThunk.fulfilled, (state, action: PayloadAction<CreateUserMutation['createUser']>) => {
      // Create returns partial (no timestamps); create a placeholder extended user
      const base: UserEntity = {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        ...action.payload,
      } as UserEntity;
      state.list.push(base);
    });

    // updateUser
    builder.addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<UpdateUserMutation['updateUser']>) => {
      const idx = state.list.findIndex((u) => u.id === action.payload.id);
      if (idx >= 0) {
        state.list[idx] = { ...state.list[idx], ...action.payload, updatedAt: new Date().toISOString() };
      } else {
        state.list.push({
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
          ...action.payload,
        } as UserEntity);
      }
      if (state.current && state.current.id === action.payload.id) {
        state.current = { ...state.current, ...action.payload, updatedAt: new Date().toISOString() } as UserEntity;
      }
    });

    // deleteUser
    builder.addCase(deleteUserThunk.fulfilled, (state, action: PayloadAction<DeleteUserMutation['deleteUser']>) => {
      state.list = state.list.filter((u) => u.id !== action.payload.id);
      if (state.current && state.current.id === action.payload.id) state.current = null;
    });
  },
});

export default usersSlice.reducer;
