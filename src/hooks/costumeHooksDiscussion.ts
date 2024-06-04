import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, getDiscussion, getParticipants } from "../api/routes/discussionRoute";


export const useGetAll = (route: string, path: string) => {
    return useQuery({
        queryKey: [path],
        queryFn: () => getAll(route)
    });
}


export const useGetDiscussion = (route: string, id: string, path: string) => {
    return useQuery({
        queryKey: [path, id],
        queryFn: () => getDiscussion(route, id)
    });
}

export const useGetParticipants = (route: string, id: string, path: string) => {
    return useQuery({
        queryKey: [path, id],
        queryFn: () => getParticipants(route, id)
    });
};
