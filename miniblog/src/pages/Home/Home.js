import { useState } from "react";

//CSS
import styles from "./Home.module.css";

//hooks
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

//Components
import PostDetails from "../../components/PostDetails";
import Loading from '../Loading/Loading'

const Home = () => {
  const [query, setQuery] = useState("");
  const {documents: posts, loading} = useFetchDocuments("posts");

  const navigate = useNavigate()
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Ou pesquise por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      <div>
        {loading && <Loading />}
        {!loading && posts && posts.map((post) => (
          <PostDetails key={post.id} post={post} />
        ))}
        {!loading && posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to={"/post/create"} className="btn">
              Criar o primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
