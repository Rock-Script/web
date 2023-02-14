import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../../slices/SnackbarSlice";
import AlertSeverities from "../../constants/AlertSeverities";
import { getMicroservices } from "../../slices/ConfigSlice";

const setupInteceptors = (dispatch) => {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Do something with response data
        const data = response.data;
        if (data.status === 200 || data.status === 201) {
            dispatch(show({
                message: data.message,
                severity: AlertSeverities.SUCCESS
            }));
        }
        return response;
    }, function (error) {
        // Do something with response error
        if (error?.response?.data?.message) {
            dispatch(show({
                message: error?.response?.data?.message,
                severity: AlertSeverities.ERROR
            }))
        }
        return Promise.reject(error);
    });
}


function Axios(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        setupInteceptors(dispatch);
        dispatch(getMicroservices());
    }, [dispatch]);
    return <>
        {props.children}
    </>
}

export default Axios;