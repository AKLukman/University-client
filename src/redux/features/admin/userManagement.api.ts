import { TQueryParams, TResponseRedux } from "../../../types/global";
import { TStudent } from "../../../types/userManagemet.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudents: builder.mutation({
      query: (data) => ({
        url: "/users/create-student/",
        method: "POST",
        body: data,
      }),
    }),
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});
export const { useAddStudentsMutation, useGetAllStudentsQuery } =
  userManagementApi;
