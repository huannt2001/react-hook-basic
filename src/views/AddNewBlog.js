import './Blog.scss';
import { useState } from 'react';
import axios from 'axios';

const AddNewBlog = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmitBtn = async (event) => {
        event.preventDefault();
        if (!title) {
            alert('empty title');
            return;
        }
        if (!content) {
            alert('empty content');
            return;
        }

        let data = {
            title: title,
            body: content,
            userId: 1
        }

        let res = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
        if (res && res.data) {
            let newBlog = res.data;
            props.handleAddNewBlog(newBlog);
        }

        // console.log('>>> check res post data ', res);
        // console.log('>>> check data state: ', title, content);
    }

    return (
        <div className="add-new-container">
            <form onSubmit={handleSubmitBtn}>
                <div className="text-add">Add new blog</div>
                <div className="input-data">
                    <label>Title: </label>
                    <input type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="input-data">
                    <label>Content: </label>
                    <input type="text"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </div>
                {/* <button className="btn-submit" type="submit" onClick={handleSubmitBtn} >
                Submit
            </button> */}
                <button className="btn-submit" type="submit" >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddNewBlog;