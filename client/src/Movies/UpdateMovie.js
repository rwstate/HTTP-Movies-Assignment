import React, {useState, useEffect} from "react"
import axios from "axios"

const UpdateMovie = props => {
  const [movie, setMovie] = useState({
    id: props.match.params.id,
    title: "",
    director: "",
    metascore: "",
    stars: []
  })

  console.log(movie)

  useEffect(() => {
    console.log(movie)
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setMovie(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  if (movie === "") {
    return <h3>Loading</h3>
  }

  const handleChange = e => {
    if (e.target.name === "stars") {
      setMovie({...movie, [e.target.name]: e.target.value.split(",")})
      console.log(movie.stars)
    } else {
      setMovie({...movie, [e.target.name]: e.target.value})
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then(res => console.log(res, "Success"))
      .catch(err => console.log(err))
    localStorage.setItem("needUpdate", true)
    props.history.push(`/movies/${props.match.params.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <input type="text" name="title" value={movie.title} onChange={handleChange}/>
      <input type="text" name="director" value={movie.director} onChange={handleChange}/>
      <input type="text" name="metascore" value={movie.metascore} onChange={handleChange}/>
      <p>Please separate star names with a comma</p>
        <input type="text" name="stars" value={movie.stars} onChange={handleChange}/>
      <button>Update</button>
    </form>
  )
}

export default UpdateMovie;