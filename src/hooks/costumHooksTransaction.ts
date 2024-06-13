import { useQuery , useMutation ,useQueryClient } from "@tanstack/react-query";
import { getAll, getTransaction, updateTransaction } from "../api/routes/transactionsRoute";

export const useGetAll = (route: string,currentPage: number, itemsPerPage:number , path: string) => {
    return useQuery({
        queryKey: [path,currentPage,itemsPerPage],
        queryFn: () => getAll(route,currentPage, itemsPerPage)
    });
}


export const useGetTransaction = (route: string, id: string, path: string) => {
    return useQuery({
        queryKey: [path, id],
        queryFn: () => getTransaction(route, id)
    });
}

export const useUpdate = (route: string, path: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (params: { data: any, id: any }) => {
            const { data, id } = params;
            try {
                await updateTransaction(route, id, data);
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