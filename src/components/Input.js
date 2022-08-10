import React, { useState } from "react";
import axios from "axios";

export default function Input() {
  const [newName, setNewName] = useState("");
  const [newComment, setnewComment] = useState("");
  const [isViewable, setIsViewable] = useState(false);

  const handleSubmit = () => {
    const article = { name: newName, text: newComment };
    axios
      .post("http://localhost:8000/api/comments/", article)
      .then(setIsViewable(false))
      .then(window.location.reload(true))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          onClick={() => setIsViewable(!isViewable)}
          className="m-4 p-1 text-gray-700 text-sm font-bold mb-2 border-2 rounded hover:cursor-pointer shadow-md"
          type="submit"
          value={isViewable ? "Collapse Form" : "Leave a Comment"}
        />
      </div>
      {isViewable && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded mt-4 px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl"
        >
          <div className="m-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              id="name"
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              required={true}
            />
          </div>
          <div className="m-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Comment
            </label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              id="comment"
              onChange={(e) => setnewComment(e.target.value)}
              placeholder="Comment"
              required={true}
            />
          </div>
          <div>
            <input
              className="m-4 p-2 text-gray-700 text-sm font-bold mb-2 border-2 rounded hover:cursor-pointer shadow-md"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      )}
    </div>
  );
}
