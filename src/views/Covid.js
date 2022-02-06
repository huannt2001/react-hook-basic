import useFetch from "../customize/fetch";
import moment from "moment";


const Covid = () => {

    const today = moment().startOf('day').toISOString(true);
    const priorDate = moment().startOf('day').subtract(31, 'days').toISOString(true);
    // console.log('>>>check today: ', priorDate);

    const { data: dataCovid, isLoading, isError }
        // = useFetch(`https://api.covid19api.com/country/vietnam?from=2021-12-23T00%3A00%3A00Z&to=2022-01-23T00%3A00%3A00Z`)
        = useFetch(`https://api.covid19api.com/country/vietnam?from=${priorDate}&to=${today}`, true)

    return (
        <div className="covid-container">
            <h2 className="covid-title">Covid tracking in Viet Nam</h2>
            <table>
                {/* {console.log('>>> check data covid: ', dataCovid)} */}
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Confirmed</th>
                        <th>Active</th>
                        <th>Deaths</th>
                        <th>Recovered</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Không có lỗi && Không loading && có dataCovid thì vào case này */}
                    {!isError && !isLoading && dataCovid && dataCovid.length > 0 &&
                        dataCovid.map(item => {
                            return (
                                <tr key={item.ID}>
                                    <td>{item.Date}</td>
                                    <td>{item.Confirmed}</td>
                                    <td>{item.Active}</td>
                                    <td>{item.Deaths}</td>
                                    <td>{item.Recovered}</td>
                                </tr>
                            )
                        })
                    }

                    {/* Đang loading thì vào case này */}
                    {isLoading &&
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center' }}>Loading...</td>
                        </tr>
                    }

                    {/* Có lỗi thì vào case này */}
                    {isError &&
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center' }}>Something wrong...</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Covid;