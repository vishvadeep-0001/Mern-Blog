import { useEffect, useState } from "react";
import moment from "moment";

const CommentCom = ({ com }) => {
  const [user, setUser] = useState({});

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

  return (
    <div className="flex p-4 border-b border-gray-200 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
          srcset=""
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
        <p className="text-gray-500 pb-2">{com.content}</p>
      </div>
    </div>
  );
};

export default CommentCom;
