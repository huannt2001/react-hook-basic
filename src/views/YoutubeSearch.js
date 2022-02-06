import './Blog.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from "moment";

const YoutubeSearch = () => {

    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState('')

    useEffect(() => {

    }, [])

    const handleSearchYoutube = async () => {
        let res = await axios({
            method: "GET",
            url: 'https://www.googleapis.com/youtube/v3/search',
            params: {
                part: 'snippet',
                maxResults: 20,
                key: 'AIzaSyBuH0c5EMuulvVx4Vtd7AODXtkBqmfYl88',
                type: 'video',
                q: query
            }
        })

        if (res && res.data && res.data.items) {
            let raw = res.data.items;
            let result = [];
            if (raw && raw.length > 0) {
                raw.map(item => {
                    let object = {};
                    object.id = item.id.videoId;
                    object.title = item.snippet.title;
                    object.createdAt = item.snippet.publishedAt;
                    object.author = item.snippet.channelTitle;
                    object.description = item.snippet.description;

                    result.push(object);
                    return result;
                })
            }

            setVideos(result);
        }

        // console.log('>>>check response youtube ', res);
    }

    return (
        <div className="youtube-search-container">
            <div className="yt-search">
                <input type="text" className="input-search" placeholder='Search'
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button type="button" className="btn btn-primary"
                    onClick={handleSearchYoutube}>
                    Search
                </button>
            </div>

            {videos && videos.length > 0 &&
                videos.map(item => {
                    return (
                        <div className="yt-result" key={item.id}>
                            <div className="left">
                                <iframe className="yt-iframe"
                                    src={`https://www.youtube.com/embed/${item.id}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            </div>
                            <div className="right">
                                <div className="title">
                                    {item.title}
                                </div>
                                <div className="create-at">
                                    Create At: {moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss A')}
                                </div>
                                <div className="author">
                                    Author: {item.author}
                                </div>
                                <div className="description">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default YoutubeSearch;
// {
//     "kind": "youtube#searchListResponse",
//     "etag": "FH6eg8Axh3MbUPOFoJPp1iN9IZE",
//     "nextPageToken": "CAUQAA",
//     "regionCode": "VN",
//     "pageInfo": {
//       "totalResults": 101,
//       "resultsPerPage": 5
//     },
//     "items": [
//       {
//         "kind": "youtube#searchResult",
//         "etag": "OeCeKbwdr-bSNRbl9kSUJci8gW8",
//         "id": {
//           "kind": "youtube#video",
//           "videoId": "ReVDBaqBXLQ"
//         },
//         "snippet": {
//           "publishedAt": "2021-10-23T11:00:12Z",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA",
//           "title": "#14.1 UseEffect Dependencies - Kỹ Thuật Nâng Cao | React Season 2 Với Hook Cho Beginner Từ A đến Z",
//           "description": "useEffect chạy mỗi lần component React re-render (render lại dữ liệu), vì vậy chúng ta sẽ cần phải có cách tối ưu hóa useEffect, ...",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/ReVDBaqBXLQ/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/ReVDBaqBXLQ/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/ReVDBaqBXLQ/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Hỏi Dân IT",
//           "liveBroadcastContent": "none",
//           "publishTime": "2021-10-23T11:00:12Z"
//         }
//       },
//       {
//         "kind": "youtube#searchResult",
//         "etag": "M53G3FJBZOdAs6Y93kvVVA_cbsQ",
//         "id": {
//           "kind": "youtube#video",
//           "videoId": "8G_qBhOVbN8"
//         },
//         "snippet": {
//           "publishedAt": "2022-01-31T11:30:14Z",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA",
//           "title": "End Game 2021 - Mang Tiền Về Cho Mẹ 2022 | Nhìn Lại 2021 Với Hỏi Dân IT",
//           "description": "Tạm Biệt 2021 - Chúc Mọi Người Năm 2022 Nhiều Sức Khỏe & May Mắn   .... Chính thức lên sóng Udemy (Sale of 50% chào ...",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/8G_qBhOVbN8/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/8G_qBhOVbN8/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/8G_qBhOVbN8/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Hỏi Dân IT",
//           "liveBroadcastContent": "none",
//           "publishTime": "2022-01-31T11:30:14Z"
//         }
//       },
//       {
//         "kind": "youtube#searchResult",
//         "etag": "OAZhq1Optj8GwNpXkE0LqFmkjtc",
//         "id": {
//           "kind": "youtube#video",
//           "videoId": "Y9gTouaZJ5s"
//         },
//         "snippet": {
//           "publishedAt": "2021-10-15T11:00:12Z",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA",
//           "title": "#4 Render &quot;Dữ Liệu của Biến&quot; với React Hook | React Season 2 Với Hook Cho Beginner Từ A đến Z",
//           "description": "Dynamic Values in Templates là cách chúng ta có thể sử dụng linh động các giá trị của biến số trong template - thành phần HTML ...",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/Y9gTouaZJ5s/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/Y9gTouaZJ5s/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/Y9gTouaZJ5s/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Hỏi Dân IT",
//           "liveBroadcastContent": "none",
//           "publishTime": "2021-10-15T11:00:12Z"
//         }
//       },
//       {
//         "kind": "youtube#searchResult",
//         "etag": "MVmwZKIGeZUJXTv5odS3ADRjsAE",
//         "id": {
//           "kind": "youtube#video",
//           "videoId": "FtdGRi0nCjs"
//         },
//         "snippet": {
//           "publishedAt": "2021-10-13T13:00:12Z",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA",
//           "title": "#2 Viết &quot;Hello World&quot; Với React Hook | React Season 2 Với Hook Cho Beginner Từ A đến Z",
//           "description": "Chương trình đầu tiên, và không thể thiếu đối với bất cứ một chương trình nào đấy chính là \"Xin chào thế giới\" - Hello world.",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/FtdGRi0nCjs/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/FtdGRi0nCjs/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/FtdGRi0nCjs/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Hỏi Dân IT",
//           "liveBroadcastContent": "none",
//           "publishTime": "2021-10-13T13:00:12Z"
//         }
//       },
//       {
//         "kind": "youtube#searchResult",
//         "etag": "DM33I6cwc0cccOvSYfZf3zA9n-Y",
//         "id": {
//           "kind": "youtube#video",
//           "videoId": "lZ0BGsDtuo4"
//         },
//         "snippet": {
//           "publishedAt": "2021-10-14T11:00:12Z",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA",
//           "title": "#3 Components &amp; Templates với React Hook | React Season 2 Với Hook Cho Beginner Từ A đến Z",
//           "description": "Components chính là những viên gạch, hay còn có thể coi là hòn đá tảng để xây dựng nên bố cục của một website với React.",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/lZ0BGsDtuo4/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/lZ0BGsDtuo4/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/lZ0BGsDtuo4/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Hỏi Dân IT",
//           "liveBroadcastContent": "none",
//           "publishTime": "2021-10-14T11:00:12Z"
//         }
//       }
//     ]
//   }