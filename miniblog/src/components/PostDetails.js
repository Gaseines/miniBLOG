import styles from "./PostDetails.module.css";

import { Link } from "react-router-dom";

const PostDetails = ({ post }) => {

  console.log("apareceu")

  return (
    <div className={styles.post_details}>
      <p className={styles.name}>Criado por <span>{post.createdBy}</span></p>
      <img src={post.image} alt={post.title} />
      <h3>{post.title}</h3>
      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`}>Ler Mais...</Link>
    </div>
  );
};

export default PostDetails;
