import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

//Components
import Loading from "../Loading/Loading";

//Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const nameUser = user.displayName;

  const { deleteDocument } = useDeleteDocument("posts");

  //Posts do usuario
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);


  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>
      {loading && <Loading />}
      {posts && posts.length === 0 ? (
        <div className={styles.no_posts}>
          <p>Olá {nameUser}! Você ainda não tem posts, crie um agora mesmo!!</p>
          <Link to={"/post/create"} className="btn">
            Criar Post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.title_posts_true}>
            <h3>
              Esses são seus posts <span>{nameUser}</span>
            </h3>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.posts}>

                <div className={styles.post_header}>
                  <h3>{post.title}</h3>
                  <table className={styles.t_actions}>
                    <tr>
                      <td>
                        <Link
                          to={`/post/${post.id}`}
                          className="btn-outline btn-view"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                          >
                            <path
                              d="M2 8C2 8 6.47715 3 12 3C17.5228 3 22 8 22 8"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M21.544 13.045C21.848 13.4713 22 13.6845 22 14C22 14.3155 21.848 14.5287 21.544 14.955C20.1779 16.8706 16.6892 21 12 21C7.31078 21 3.8221 16.8706 2.45604 14.955C2.15201 14.5287 2 14.3155 2 14C2 13.6845 2.15201 13.4713 2.45604 13.045C3.8221 11.1294 7.31078 7 12 7C16.6892 7 20.1779 11.1294 21.544 13.045Z"
                              stroke="currentColor"
                              stroke-width="1.5"
                            />
                            <path
                              d="M15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14Z"
                              stroke="currentColor"
                              stroke-width="1.5"
                            />
                          </svg>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/post/edit/${post.id}`}
                          className="btn-outline btn-edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                          >
                            <path
                              d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11 20H17"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteDocument(post.id)}
                          className="btn-outline btn-delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                          >
                            <path
                              d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M9.5 16.5L9.5 10.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M14.5 16.5L14.5 10.5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
                <img
                  className={styles.post_img}
                  src={post.image}
                  alt={post.title}
                />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
