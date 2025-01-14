import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate()

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
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    //validação dos dados
    if(!title || !image || !body || !tags){
      setFormError("Por favor, preencha todos os campos!")
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    //Redirect Homepage
    navigate("/")
  };

  return (
    <div className={styles.c_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>

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
        <label>
          <span>Imagem do post:</span>
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

        {!response.loading && <button className="btn">Criar Post</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}

        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
