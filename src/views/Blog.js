import useFetch from "../customize/fetch";
import './Blog.scss';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import { useState, useEffect } from 'react';
import AddNewBlog from './AddNewBlog';

const Blog = () => {

    const [show, setShow] = useState(false);
    const [newData, setNewData] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const { data: dataBlogs, isLoading, isError }
        = useFetch(`https://jsonplaceholder.typicode.com/posts`, false)


    useEffect(() => {
        if (dataBlogs && dataBlogs.length > 0) {
            let newDataSimple = dataBlogs.slice(0, 9);
            setNewData(newDataSimple);
            // console.log('>>> check data Blog: ', newDataBlogs);
        }
    }, [dataBlogs])

    const handleAddNewBlog = (blog) => {
        let data = newData;
        data.unshift(blog);

        setNewData(data);
        setShow(false);
        console.log('>>> check handle add new blog ', newData);
    }

    const deletePost = (id) => {
        let data = newData;
        data = data.filter(item => item.id !== id)
        setNewData(data);
    }

    return (
        <>
            <Button variant="primary" className="my-3" onClick={handleShow}>
                Add new blog
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddNewBlog handleAddNewBlog={handleAddNewBlog} />
                </Modal.Body>
            </Modal>


            <div className="blogs-container">
                {!isError && !isLoading && newData && newData.length > 0 &&
                    newData.map(item => {
                        return (
                            <div className="single-blog" key={item.id}>
                                <div className='delete-blog' onClick={() => deletePost(item.id)}>X</div>
                                <h5>Title: {item.title}</h5>
                                <p>{item.body}</p>
                                <button className="btn-detail">
                                    <Link to={`/blog/${item.id}`}>
                                        View detail
                                    </Link>
                                </button>
                            </div>
                        )
                    })
                }

                {isLoading &&
                    <div>Loading data...</div>
                }
            </div>
        </>
    )

}

export default Blog;
