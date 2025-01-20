import styles from "./Post.module.css";

//hooke
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

//Components
import Loading from "../Loading/Loading";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  console.log(post);

  return (
    <div className={styles.post}>
      {loading && <Loading />}
      {post && (
        <>
          <h1>{post.title}</h1>
          <div className={styles.criador}><p>Criado por <span>{post.createdBy}</span></p></div>
          <img src={post.image} alt={post.title} />
          <p className={styles.body}>{post.body}</p>
          <h3>Este post trata de:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <>
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
