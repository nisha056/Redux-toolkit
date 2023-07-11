const createSlice = require("@reduxjs/toolkit").createSlice;
const axios = require("axios");
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;
// In async case, there are three factors in state: loading state, users as an array
// and the error
const initialState = {
  loading: false,
  users: [],
  error: "",
};
// it takes two parameters that is action name and the callback function which
// creates the payload
// it generates the pending, fufilled and rejected action types
const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data.map((user) => user.name));
});
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});
module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
