import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Item = {
   id: number;
   title: string;
};

export const api = createApi({
   reducerPath: 'itemsApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
   tagTypes: ['Items'],
   endpoints: (builder) => ({
      getItems: builder.query<Item[], void>({
         query: () => 'items',
         providesTags: ['Items'],
      }),

      getItem: builder.query<Item, number>({
         query: (id) => `items/${id}`,
         providesTags: (result, error, id) => [{ type: 'Items', id }],
      }),

      createItem: builder.mutation<Item, Partial<Item>>({
         query: (body) => ({
            url: 'items',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Items'],
      }),

      updateItem: builder.mutation<Item, Item>({
         query: ({ id, ...patch }) => ({
            url: `items/${id}`,
            method: 'PUT',
            body: patch,
         }),
         invalidatesTags: (result, error, { id }) => [{ type: 'Items', id }, 'Items'],
      }),

      deleteItem: builder.mutation<{ success: boolean }, number>({
         query: (id) => ({
            url: `items/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Items'],
      }),
   }),
});

export const {
   useGetItemsQuery,
   useGetItemQuery,
   useCreateItemMutation,
   useUpdateItemMutation,
   useDeleteItemMutation,
} = api;
