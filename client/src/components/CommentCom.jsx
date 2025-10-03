import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

const CommentCom = ({ com, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(com.content);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${com.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [com]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(com.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${com._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(com, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 border-b border-gray-200 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs ">
            {moment(com.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2 "
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                color="purple"
                type="button"
                size="sm"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                color="red"
                type="button"
                size="sm"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{com.content}</p>
            <div className="flex items-center pt-2 text-xs max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(com._id)}
                className={`text-gray-400 hover:text-blue-500
              ${
                currentUser &&
                com.likes.includes(currentUser._id) &&
                "!text-blue-500"
              }
              `}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {com.numberOfLikes > 0 &&
                  com.numberOfLikes +
                    " " +
                    (com.numberOfLikes === 1 ? "Like" : "Likes")}
              </p>
              {currentUser &&
                (currentUser._id === currentUser.userId ||
                  currentUser.isAdmin) && (
                  <>
                    <button
                      className="text-gray-400 hover:text-blue-500"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>

                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => onDelete(com._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentCom;
