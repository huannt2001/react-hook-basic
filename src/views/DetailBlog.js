import { useParams, useHistory } from "react-router-dom";
import './Blog.scss';
import useFetch from "../customize/fetch";

const DetailBlog = () => {
    let { id } = useParams();
    let history = useHistory();
    // console.log('>>> check use history ', history);

    const { data: dataBlogDetail, isLoading, isError }
        = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`, false)

    const handleBackData = () => {
        history.push('/blog')
    }

    return (
        <>
            <div className="blog-detail">
                {dataBlogDetail &&
                    <>
                        <div>Blog id: {id}</div>
                        {isLoading ? 'Loading data....' : <>
                            <div className="blog-title">Title: {dataBlogDetail.title}</div>
                            <div className="blog-content">Body: {dataBlogDetail.body}</div>
                        </>
                        }
                    </>
                }
            </div>
            <button onClick={() => handleBackData()}>Back</button>
        </>
    )
}

export default DetailBlog;