import styles from "./Search.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import PostDetails from "../../components/PostDetails";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search}>
      <h1>Busca por <span>#{search}</span></h1>
      {posts && posts == 0 && (
        <>
          <p>Nenhum post foi encontrado pela sua busca...</p>
          <Link to={"/"} className="btn btn-dark">Voltar a home</Link>
        </>
      )}
      {posts && posts.map((post) => (
        <PostDetails key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Search;
