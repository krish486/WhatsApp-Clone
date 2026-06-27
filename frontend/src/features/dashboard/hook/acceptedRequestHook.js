import { useState } from "react"
import { acceptedRequestApi } from "../api/dashboardApi"
import { useEffect } from "react"

export const useAcceptedRequest = () => {
    const [acceptedRequest, setAcceptedRequest] = useState([])
    const [loading, setLoading] = useState(false)

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

    return {
        acceptedRequest,
        loading,
        refetch: fetchAcceptedRequest,
    }
}