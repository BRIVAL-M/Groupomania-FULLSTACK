<script>

function logout() {//_____________________________________ Logout user
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  this.$router.push("/login");
}





function userName() {//_____________________________________ Find the user name from him email
  const email = localStorage.getItem('email');
  const name = email.substring(0, email.lastIndexOf("@"));
  return name;
}


function sendPost(post, name, title, content,imageUrl) { //_________________________________________ Send a post

  if (title == "" || content == "") {
    return;
  }
  const url = 'http://localhost:8080/api/posts';

  console.log(JSON.stringify(post));

fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //'accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify(post, name, title, content,imageUrl)
})
    .then(response => response.json())
    .then((res) => {
      
 console.log(res);
    })
    .catch(error => console.error('Error:', error));
}


function data() { // _____________________________________ Data of user's posts

  return {
    posts: [],
    post: {
      userId: '',

      name: userName(),
      title: '',
      content: '',
        imageUrl: '',
      //      likes: 0,
      //      usersLiked: [],
    },

  }
}

function getPosts() {//_____________________________________ Get all posts 
  const url = 'http://localhost:8080/api/posts';
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
  })
    .then(response => response.json())
    .then((res) => {
      console.log(res);
      this.posts = res;
    })
}


function deletePost(id) {//_____________________________________ Delete a post by id 

 console.log(id)
  const url = 'http://localhost:8080/api/posts/' + id;

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },

  })
    .then(response => response.json())
    .then((res) => {
      console.log(res);
      this.posts = res;
      this.getPosts();// a voir mais ce n'est pas mal
    })
}
//import Card from "./Card.vue"; // pour le moment je ne peux pas binder les infos de l'utilisateur dans le card 
function newEdit() {
  console.log("newEdit");
}

export default {
  name: "News", data,
  methods: {
    sendPost() {
      this.post.userId = localStorage.getItem("userId"),
        this.post.name = userName(),
        this.post.title = this.title,
        this.post.content = this.content,
        this.post.imageUrl = this.imageUrl,
        sendPost(this.post)
      // this.$router.go()// Pour reset les inputs du form fait bug les images...
     
    },
    fileSelect(e) {
      console.log(e.target.files[0]);
    this.imageUrl = URL.createObjectURL(e.target.files[0]);
   this.imageName = e.target.files[0].name;
    console.log(this.imageName);
     console.log(this.imageUrl);
    
    },
    
   
    getPosts,
    logout,
    deletePost,

    newEdit
  },
  components: {
    // Card,
  },
  mounted() { // mounted() est appelé une fois que le composant est chargé
  this.getPosts();
  }
}

</script>
<template>
  <div class="container-sm">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <p class="navbar-brand">Groupomania</p>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
              <button class="btn btn-secondary btn-lg mt-1 m-1" @click="getPosts(this.post, name, title, content)">All
                posts</button>
              <button class="btn btn-secondary btn-lg mt-1 m-1" @click="logout()">Logout</button>
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
      <p class="text-center mt-3">Quoi de neuf @{{ this.post.name }} ?</p>
      <div class="d-flex bg-light">

        <textarea class="form-control " placeholder="Title" required="" v-model="title"></textarea>
        <!-- <label for="floatingTextarea">Title</label> -->
        <textarea class="form-control " placeholder="Tape your text" id="floatingTextarea" v-model="content"></textarea>
        <!-- <label for="floatingTextarea">Comments</label> -->

      </div>
    </div>
    <div class="d-flex  mt-1">
      <label for="file-input" class="btn btn-secondary btn-lg mt-1">Add Image</label>
      <input id="file-input" type="file" @change="fileSelect"/>
    
      

      <!-- <img class="img-fluid" v-if ="fileSelect" :src="imageUrl" alt="image" width="100" height="100"> -->
      <!-- <img class="img-fluid" v-if ="fileSelect" :src="imageUrl" alt="image" width="100" height="100"> -->
      
      
      <!-- <button type="button" class="btn btn-danger btn-lg mt-1 ms-auto" @click="sendPost(this.post,title,content),getPosts(this.post,title,content)">Send</button> -->
      <button type="button" class="btn btn-danger btn-lg mt-1 ms-auto"
        @click="sendPost(this.post, name, title, content,imageUrl), getPosts(this.post, name, title, content,imageUrl)">Send</button>
    </div>
    <hr class="mt-4 dropdown-divider" />
    <!-- <Card></Card> -->

    <li v-for="post in posts">
      <!-- <div class="card">
  <div class="card-body">
    <p class="card-text">{{post.name}}</p>
    <h5 class="card-title">{{post.title}}</h5>
    <p class="card-text">{{post.content}}</p>
    <p class="card-text"><small class="text-muted">{{post.name}}</small></p>
  </div>
</div> -->
      <div class="card mb-3 m-auto">
        <div class="card-header">
          <img src="/img_logo/icon.png" class="rounded-circle m-2" alt="Avatar">

          Posté par @{{ post.name }}
        </div>
     
        <img v-if="post.imageUrl" :src="post.imageUrl" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.content }}</p>
          <p class="card-text"><small class="text-muted">Last updated : upcoming option</small></p>

          <div class="d-flex bg-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
              class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
              <path
                d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
            </svg>
            <button type="button" class="btn btn-secondary btn-lg  ms-auto" @click="newEdit()">Edit</button>




            <button type="button" class="btn btn-danger btn-lg mt-1 ms-auto"
              @click="deletePost(post._id)">Delete</button>
          </div>
        </div>
      </div>

      <!-- <div class="form-floating">
     
      <div class="d-flex bg-light">

        <textarea class="form-control " placeholder="Title" required="" v-model="title"></textarea>
        
        <textarea class="form-control " placeholder="Tape your text" id="floatingTextarea" v-model="content"></textarea>
      

      </div>
    </div>
    <div class="d-flex  mt-1">
      <label for="file-input" class="btn btn-secondary btn-lg mt-1">Add Image</label>
      <input id="file-input" type="file" />
      
      <button type="button" class="btn btn-danger btn-lg mt-1 ms-auto"
        @click="sendPost(this.post, name, title, content), getPosts(this.post, name, title, content)">Send</button>
    </div> -->
    </li>

    <!--bind post title and content in Card-->







  </div>

</template>
<style>
input {
  display: none;
}

p {
  font-size: 1.5rem;
  font-family: "lato";
}

li {
  list-style: none;
}

body {
  background-color: #FFD7D7 !important;
  


}

.card-header img {
  width: 60px;
  height: 60px;
}

img {
  max-height: 20rem;
  object-fit: cover;
}
</style>