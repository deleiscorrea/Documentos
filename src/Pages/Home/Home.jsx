import React, { useState } from 'react'
import './Home.css'

const Home = () => {
  const [error, setError] = useState("")

  const handleFileChange = (e) => {
    if (e.target.files.length > 4) {
      setError("Solo podés seleccionar hasta 4 archivos")
      e.target.value = ""
    } else {
      setError("")
    }
  }

  return (
    <main>
      <h1>Subir documentos</h1>
      <span>Cargá hasta 4 archivos</span>
      <form action="http://localhost:8000/upload" method="post" encType="multipart/form-data">
        <input 
          type="file" 
          name="archivos" 
          multiple 
          onChange={handleFileChange}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Enviar</button>
      </form>
    </main>
  )
}

export default Home

/*
import React, { useState } from 'react'
import './Home.css'

const Home = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleFileChange = (e) => {
    if (e.target.files.length > 4) {
      setError("Solo podés seleccionar hasta 4 archivos")
      e.target.value = ""
    } else {
      setError("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // evita recargar la página
    const formData = new FormData(e.target)

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.detail)
        setSuccess("")
      } else {
        setSuccess(`Archivos subidos correctamente. Formato: ${data.formato}`)
        setError("")
      }
    } catch (err) {
      setError("Error al subir los archivos")
      setSuccess("")
    }
  }

  return (
    <main>
      <h1>Subir documentos</h1>
      <span>Cargá hasta 4 archivos</span>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input 
          type="file" 
          name="archivos" 
          multiple 
          onChange={handleFileChange}
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Enviar</button>
      </form>
    </main>
  )
}

export default Home
*/