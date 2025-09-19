import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUserPosts(data.posts);
        }
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return <div className="max-w-lg mx-auto w-full">Dashboard</div>;
};

export default DashPosts;
