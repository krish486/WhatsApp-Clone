import { useState } from "react"
import { acceptedRequestApi } from "../../api/dashboardApi"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export const useAcceptedRequest = () => {
    const [acceptedRequest, setAcceptedRequest] = useState([])
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const fetchAcceptedRequest = async () => {
        try {
            setLoading(true);
            const response = await acceptedRequestApi()
            console.log("this is response--", response)
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
        navigate
    }
}