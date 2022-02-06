import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from "moment";

const useFetch = (url, isCovidData) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // đang loading = true, không loading = false
    const [isError, setIsError] = useState(false);
    // có lỗi = true, không có lỗi = false

    // componetDidMount
    useEffect(() => {

        const ourRequest = axios.CancelToken.source();

        async function fetchData() {
            try {
                let res = await axios.get(url, {
                    cancelToken: ourRequest.token,
                })
                let data = res && res.data ? res.data : [];
                if (data && data.length > 0 && isCovidData) {
                    data.map(item => {
                        item.Date = moment(item.Date).format('DD/MM/YYYY')
                        return item;
                    })
                    data = data.reverse();
                }
                setData(data)
                setIsLoading(false);
                setIsError(false);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled:', err.message);
                } else {
                    setIsError(true);
                    setIsLoading(false);
                }
            }
        }

        setTimeout(() => {
            fetchData();
        }, 3000)

        return () => {
            ourRequest.cancel('Operation canceled by the user.')
        }
    }, [url])

    return {
        data, isLoading, isError
    }
}

export default useFetch;