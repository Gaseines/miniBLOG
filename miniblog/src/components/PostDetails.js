import styles from "./PostDetails.module.css";

import { Link } from "react-router-dom";

const PostDetails = ({ post, dashboard = false }) => {


  return (
    <div className={styles.post_details}>
      {!dashboard && <p className={styles.name}>Criado por <span>{post.createdBy}</span></p>}
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
      <Link to={`/post/${post.id}`} className="btn-link">Ler</Link>
    </div>
  );
};

export default PostDetails;
