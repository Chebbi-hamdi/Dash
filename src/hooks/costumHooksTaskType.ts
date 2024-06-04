import { createSub, createSubSub, createTask, getAllSubSubTask, getAllSubTask, uploadFile } from "../api/routes/taskTypeRoute";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateSubSub = (route: string, path: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            try {
                await createSubSub(route, data);
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
export const useGetAllSubSubTask = (route: string , path: string) => {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            try {
                const response = await getAllSubSubTask(route);
                return response;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    });
}
export const useCreateSub = (route: string, path: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            try {
                await createSub(route, data);
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
export const useCreateTask = (route: string, path: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            try {
                await createTask(route, data);
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

export const useGetAllSubTask = (route: string , path: string) => {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            try {
                const response = await getAllSubTask(route);
                return response;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    });
}




export const useUploadFile = (route: string, path: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: File) => {
            try {
              const response=  await uploadFile(route, data);
              return response.imagePath;
                
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