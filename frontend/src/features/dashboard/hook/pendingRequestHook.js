import { useEffect, useState } from "react";
import { pendingRequestApi } from "../api/dashboardApi";

export const usePendingRequest = () => {

    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPendingRequests = async () => {
        try {

            setLoading(true);

            const response = await pendingRequestApi();

            setPendingRequests(response);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    return {
        pendingRequests,
        loading,
        refetch: fetchPendingRequests
    };
};