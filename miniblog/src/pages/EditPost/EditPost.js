import styles from "./EditPost.module.css";

//Hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

//Componensts
import Loading from '../Loading/Loading'

const EditPost = () => {
  const { id } = useParams();

  const { document: post, loading } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { updateDocument, response } = useUpdateDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //Validação URL imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("Verifique a URL na imagem, algo deu errado! 🫠");
    }

    //agrupar as tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //validação dos dados
    if (!title || !image || !body || !tags) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return;

    updateDocument(id, {
      title,
      image,
      body,
      tagsArray
    });

    //Redirect Homepage
    navigate("/dashboard");
  };

  return (
    <div className={styles.e_post}>
      {loading && <Loading />}
      {post && (
        <>
          <h2>Editando post {post.title}</h2>
          <p className={styles.e_enunciado}>
            Edite os dados do post como desejar!
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Pense em um título criativo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <span>Imagem do post:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Coloque a URL da imagem que representa seu post"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <p className={styles.text_preview}>Preview da imagem:</p>
            <img src={image} alt={post.title} />
            <label>
              <span>Descrição do post:</span>
              <textarea
                name="body"
                required
                placeholder="Digite o conteúdo do seu post..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </label>
            <label>
              <span>Digite as tags do post</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags do post..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </label>

            {!response.loading && <button className="btn">Editar Post</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}

            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
