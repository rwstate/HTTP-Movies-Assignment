import React, { useState } from "react";
import axios from "axios";

const AddMovie = props => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  })

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
      .post(`http://localhost:5000/api/movies/`, movie)
      .then(res => console.log(res, "Success"))
      .catch(err => console.log(err))
    localStorage.setItem("needUpdate", true)
    props.history.push(`/`)
  }

  return(

    <form onSubmit={handleSubmit} className="update-form">
      <input type="text" placeholder="Title" name="title" value={movie.title} onChange={handleChange}/>
      <input type="text" placeholder="Director" name="director" value={movie.director} onChange={handleChange}/>
      <input type="text" placeholder="Metascore" name="metascore" value={movie.metascore} onChange={handleChange}/>
      <p>Please separate star names with a comma</p>
        <input type="text" placeholder="Stars" name="stars" value={movie.stars} onChange={handleChange}/>
      <button>Update</button>
    </form>

  )
}

export default AddMovie;