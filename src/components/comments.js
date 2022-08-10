import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Comments() {
  const [response, setResponse] = useState([]);
  const [isViewable, setIsViewable] = useState(true);
  const [commentId, setCommentid] = useState("");

  const [newName, setNewName] = useState("");
  const [newComment, setnewComment] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:8000/api/comments/")
      .then((response) => response.data)
      .then((data) => {
        setResponse(data);
      });
  };

  const deletePost = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/comments/${id}`)
      .then(getData)
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const updatePost = async (id) => {
    const article = { name: newName, text: newComment };
    await axios
      .put(`http://localhost:8000/api/comments/${id}`, article)
      .then(setIsViewable(true))
      .then(getData)
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="grid justify-items-center mt-4">
      <div className="justify-items-stretch space-y-4">
        {response.map((comment) => {
          const list = (
            <div
              key={comment.id}
              className="block p-6 max-w-xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              {isViewable || commentId !== comment.id ? (
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {comment.name}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {comment.text}
                  </p>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      color="white"
                      onClick={() => deletePost(comment.id)}
                      className="mt-4 hover:cursor-pointer mr-4"
                    />
                    <FontAwesomeIcon
                      icon={faEdit}
                      color="white"
                      onClick={() =>
                        setCommentid(comment.id) & setIsViewable(!isViewable)
                      }
                      className="mt-4 hover:cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid space-y-2">
                  <input
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={comment.name}
                    className="w-100% p-1"
                    value={newName}
                  ></input>
                  <textarea
                    onChange={(e) => setnewComment(e.target.value)}
                    placeholder={comment.text}
                    rows="2"
                    className="w-100% p-1"
                    value={newComment}
                  ></textarea>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      color="white"
                      onClick={() => deletePost(comment.id)}
                      className="mt-4 hover:cursor-pointer mr-4"
                    />
                    <FontAwesomeIcon
                      icon={faEdit}
                      color="white"
                      onClick={() =>
                        setCommentid(comment.id) & setIsViewable(!isViewable)
                      }
                      className="mt-4 hover:cursor-pointer"
                    />
                    <input
                      onClick={() => updatePost(comment.id)}
                      className="m-4 p-1 text-white text-sm font-bold mb-2 border-2 rounded hover:cursor-pointer shadow-md"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </div>
              )}
            </div>
          );
          return list;
        })}
      </div>
    </div>
  );
}
