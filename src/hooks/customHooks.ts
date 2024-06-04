import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { create, getAll, getById, update, del, getAllUsers ,getByToken, getAllAdmins } from "../api/routes/route";


export const useGetAll = (route: string,currentPage: number, itemsPerPage:number , path: string) => {
    return useQuery({
        queryKey: [path,currentPage,itemsPerPage],
        queryFn: () => getAll(route,currentPage, itemsPerPage)
    });
}

export const useGetAllUsers = (route: string, path: string) => {
    return useQuery({
        queryKey: [path],
        queryFn: () => getAllUsers(route)
    });
}
export const useGetAllAdmins = (route: string, path: string) => {
    return useQuery({
        queryKey: [path],
        queryFn: () => getAllAdmins(route)
    });
}

export const useGetById = (route: string, id: string, path: string) => {
    return useQuery({
        queryKey: [path, id],
        queryFn: () => getById(route, id)
    });
};
export const useGetUserbyToken = (route: string, path:string) => {
    return useQuery({
        queryKey: [path],
        queryFn: () => getByToken(route)
    });
}


export const useCreate = (route: string, path: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            try {
                await create(route, data);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path]
            });

        },
        onError: (error) => {
            console.error(error.message);
        }

    });
};



export const useDelete = (route: string, path: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            try {
                await del(route, id);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path]
            });

        },
        onError: (error) => {
            console.error(error.message);
        }
    });
};


export const useUpdate = (route: string, path: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (params: { data: any, id: any }) => {
            const { data, id } = params;
            try {
                await update(route, id, data);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path]
            });

        },
        onError: (error) => {
            console.error(error.message);
        }
    });
};




