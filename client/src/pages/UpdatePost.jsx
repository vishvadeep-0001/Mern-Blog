import { FileInput, Select, TextInput, Button, Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const [formData, setFormData] = useState({});
  const [updateError, setUpdateError] = useState();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);

        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setUpdateError(data.message);
          return;
        }
        if (res.ok) {
          setUpdateError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setUpdateError(data.message);
        return;
      }

      if (res.ok) {
        setUpdateError(null);
        navigate(`/dashboard?tab=posts`);
      }
    } catch (error) {
      setUpdateError("Something went wrong !");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            value={formData.title}
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button type="button" size="sm" outline>
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write Something..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" color="purple">
          Update
        </Button>
        {updateError && (
          <Alert className="mt-3" color="failure">
            {updateError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
