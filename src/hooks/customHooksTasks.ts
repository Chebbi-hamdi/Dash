import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { create, getAll,assignTask, getById, deleteById} from "../api/routes/taskRoute";

export const useGetAllTasks = (route: string,currentPage: number, itemsPerPage:number , path: string) => {
    return useQuery({
        queryKey: [path,currentPage,itemsPerPage],
        queryFn: () => getAll(route,currentPage, itemsPerPage)
    });
}

export const useGetTaskById = (route: string, id: string, path: string) => {
    return useQuery({
        queryKey: [path, id],
        queryFn: () => getById(route, id)
    });
};



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

export const useAssign = (route: string, path: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            try {
                await assignTask(route, data);
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
}
export const useDelete = (route: string, path: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            try {
                await deleteById(route, id);
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
}
