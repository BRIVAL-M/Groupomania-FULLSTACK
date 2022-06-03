<script>
function logout(){
  localStorage.removeItem("TOKEN :");
  localStorage.removeItem("userId");
  this.$router.push("/login");
}

// function reload(){
//   window.location.reload(); //  en attendant...
  
 
// }


function sendPost(post,title,content) {
 

  
 
  const url = 'http://localhost:8080/api/posts';
 // console.log(url);
 console.log(JSON.stringify(post));
 // console.log(localStorage.getItem("TOKEN :"))


  //console.log({description: post.description});
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("TOKEN :") 
    },
    body: JSON.stringify(post,title,content) 
   
  
  })
  .then(response => response.json())
  .then((res) => {
  // reload();

    
    console.log(res);
   })

}

function data () {
  
return {
      posts: [],
        post: {
          userId: '',
          // name:  '',
            title: '',
            content: '',
          //  imageUrl: '',
        //      likes: 0,
     //      usersLiked: [],
       }
        }
   }



function getPosts(){
  const url = 'http://localhost:8080/api/posts';
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + localStorage.getItem("TOKEN :") 
    },
    
  })
  .then(response => response.json())
  .then((res) => {
    console.log(res);
   
    this.posts = res;
 })
}

import Card from "./Card.vue";
import Card1 from "./Card.vue";
export default{
    name :"News",data,
     methods :{
      sendPost(){
        this.post.userId = localStorage.getItem("userId"),
        this.post.title = this.title,
        this.post.content = this.content,
        sendPost(this.post)},
        getPosts,//{
        // this.post.userId = localStorage.getItem("userId"),
        // this.post.title = this.title,
        // this.post.content = this.content,
        //   getPosts(this.post)
        // },

      
     
         
        
      // sendPost
        logout,
       
      
  

    },
    components :{
    Card,
  
},
   

}
</script>
<template>
<div class="container-sm">

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <p class="navbar-brand">Groupomania</p>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
          <button class="btn btn-secondary btn-lg mt-1 ms-auto " @click="logout()">Logout</button>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li> -->
      </ul>
    </div>
  </div>
</nav>
<div class="form-floating">
 
   <textarea class="form-control " placeholder="Leave a comment here"  v-model="title"></textarea>
  <!-- <label for="floatingTextarea">Title</label> -->
  <textarea class="form-control " placeholder="Leave a comment here" id="floatingTextarea" v-model="content"></textarea>
  <!-- <label for="floatingTextarea">Comments</label> -->
 
</div>
<div class="d-flex bg-light">
    <label for="file-input" class="btn btn-secondary btn-lg mt-1">Add Image</label>
<input id="file-input" type="file"/>
<button type="button" class="btn btn-danger btn-lg mt-1 ms-auto" @click="sendPost(this.post,title,content),getPosts(this.post,title,content)">Send</button>
</div>
<hr class="mt-4 dropdown-divider"/>
<!-- <Card></Card> -->

<li v-for="post in posts">
<!-- <Card :post="post"></Card> -->
<!-- <Card :name="post.user" :title="post.title" :content="post.content" ></Card></li> -->
<Card :card-title="post.title" :p="post.content" ></Card></li>
<!--bind post title and content in Card-->





</div>

</template>
<style>
input {
    display: none;
}

li {
  list-style: none;
}
body{
  background-color: #FFD7D7 !important;

}
</style>