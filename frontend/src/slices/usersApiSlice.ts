import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";
const LEAD_URL = "/api/saveauth"
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "GET",
      }),
    }),
    getList: builder.mutation({
      query: (page) => ({
        url: `${LEAD_URL}/${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetListMutation } = usersApiSlice;
