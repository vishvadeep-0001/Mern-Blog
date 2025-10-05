import { Link } from "react-router-dom";

function PostCard({ item }) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 transition-all h-[300px] rounded-lg sm:w-[330px] overflow-hidden">
      <Link to={`/post/${item.slug}`}>
        <img
          src={item.image}
          alt="post cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="flex flex-col gap-2 p-3">
        <p className="text-lg font-semibold">{item.title}</p>
        <span className="italic text-sm">{item.category}</span>
        <Link
          to={`/post/${item.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
