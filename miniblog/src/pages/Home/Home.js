import { useState } from 'react'

//hooks
import {useNavigate, Link} from 'react-router-dom'

//CSS
import styles from './Home.module.css'

const Home = () => {
  const [query, setQuery] = useState("")
  const [posts] = useState([])

  const handleSubmit = (e) =>{
    e.preventDefault()
  }

  return (
    <div className={styles.home}>
      <h1>Veja nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder='Ou pesquise por tags...' onChange={(e) => setQuery(e.target.value)}/>
        <button className='btn btn-dark'>Pesquisar</button>
      </form>

      <div>
        <h1>Posts...</h1>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to={"/post/create"} className='btn'>Criar o primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
