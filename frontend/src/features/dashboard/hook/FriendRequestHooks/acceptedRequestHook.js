import { useMemo, useState } from "react"
import { acceptedRequestApi } from "../../api/dashboardApi"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

export const useAcceptedRequest = () => {

    const unreadCount = useSelector(
        state => state.metaData.unreadCount
    );
    const [acceptedRequest, setAcceptedRequest] = useState([])
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const fetchAcceptedRequest = async () => {
        try {
            setLoading(true);

            const response = await acceptedRequestApi()

            setAcceptedRequest(response)
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchAcceptedRequest();
    }, [])

    const friends = useMemo(() => {

        return acceptedRequest?.map(friend => ({
            ...friend,
            unreadCount: unreadCount?.[friend.id] || 0
        }));

    }, [acceptedRequest, unreadCount]);

    return {
        acceptedRequest: friends,
        loading,
        refetch: fetchAcceptedRequest,
        navigate
    };

}