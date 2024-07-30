import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
const EditPosts = () => {
  const [title,setTitle]=useState('')
  const [category,setCategory]=useState('Uncategorized')
  const [description,setDesciption]=useState('')
  const [thumbnail,setThumbnai]=useState('')
  const [error,setError]=useState('')
  const navigate=useNavigate()
  const {currentUser}=useContext(UserContext)
  const token=currentUser?.token;

const {id}=useParams();



  ///redirecting to login page if not logged in




  useEffect(()=>{
    if(!token)
      {
        navigate('login')
      }
  },[])

useEffect(()=>{
  const getPost=async()=>{
try {
  const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
  setTitle(response.data.title)
  setDesciption(response.data.description)
} catch (err) {
  console.log(err)
}
  }
  getPost();
  
},[])



  

  const modules={
    toolbar:[
      [{'header':[1,2,3,4,5,6,false]}],
      ['bold','italic','underline','strike','blockquote'],
      [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
      ['link','image'],
      ['clean']
    ],
  }
  const formats=[
    'header','bold','italic','underline','strike','blockquote','List','bullet','indent','link','image'
  ]
  const POST_CATEGORIES=["Event","Workshop","Recruitment","Academic","Competitions",]


const editPost= async (e) =>{
  e.preventDefault();
  const postData =new FormData();
  postData.set('title',title)
  postData.set('category',category)
  postData.set('description',description)
  postData.set('thumbnail',thumbnail)
  try {
    const response= await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,postData,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
    if(response.status==200)
      {
        return navigate('/')
      }
    
  } catch (err) {
    setError(err.response.data.message);
    
  }
}



  return (
   <section className='create-post'>
    <div className='container'>
      <h2>Edit Post</h2>
     {error && <p className='form__error-message'>{error}</p>}
      <form className='form create-post__form' onSubmit={editPost}>
        <input type='text' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} autoFocus/>
        <select name='category' value={category} onChange={e=>setCategory(e.target.value)}>
          {
            POST_CATEGORIES.map(cat=><option key={cat}>{cat}</option>)
          }
        
        </select>
        <ReactQuill modules={modules} formats={formats} value={description} onChange={setDesciption}/>
          <input type='file' onChange={e=>setThumbnai(e.target.files[0])} accept='png,jpg,jpeg'/>
          <button type='submit' className='btn primary'>Update</button>
      </form>
    </div>
   </section>
  )
}

export default EditPosts
