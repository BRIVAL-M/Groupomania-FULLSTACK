<script>



function logout() {//_____________________________________ Logout user
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  this.$router.push("/login");
}

function dateTime (){
 const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  return date + "/" + month + "/" + year + " à " + hours + "h" + minutes; // retirer les minutes et les secondes !
}

function userName() {//_____________________________________ Find the user name from him email
  const email = localStorage.getItem('email');
  const name = email.substring(0, email.lastIndexOf("@"));
  return name;
}

function sendPost(post, name, title, content,imageUrl,like,usersLiked,date) { //_________________________________________ Send a post

const url = 'http://localhost:8080/api/posts';

  console.log(JSON.stringify(post));
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',// mauvais content-type ?
      //'accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify(post, name, title, content,imageUrl,like,usersLiked,date)
})
    .then(response => response.json())
    .then((res) => {

    console.log(post.userId);
   
     
//this.post = res;
     
      
 console.log(res);
    })
    .catch(error => {
        if (error.status !== 200) {
       alert("Oups ! Un problème est survenu. Veuillez vous reconnecter.");
       localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        this.$router.push("/login");
        //console.log(error);
      }
      })
}



function data() { // _____________________________________ Data of user's posts

  return {
    posts: [],
    post: {
      userId: '',
      date: dateTime(),
      name: userName(),
      title: '',
      content: '',
        imageUrl: '',
           likes: 0,
           usersLiked: [],
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
 
      
     this.posts = res.reverse();
      
     

     // this.posts = res;
    })
    .catch(error => {

      if (error.status !== 200) {
       alert("Oups ! Un problème est survenu. Veuillez vous reconnecter.");
       localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        this.$router.push("/login");
        //console.log(error);
      }
      console.log(error);
    });
}


function deletePost(id,userId) {//_____________________________________ Delete a post by id 


const adminId= "62a9f561c580240eba5b2da3"// A mettre dans un .env si c'est bon !!!!!!!!!!!!!!!!!
console.log(adminId);



const currentUserId = localStorage.getItem("userId"); 
if (currentUserId === adminId){
  alert("★★ GOD MODE ACTIVATED ★★");
  
}



if(currentUserId === userId || currentUserId === adminId){//____________________________ Check if the user is the owner of the post !

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
      this.getPosts();
    })
    .catch(error => {
      if (error.status !== 200) {
       alert("Oups ! Un problème est survenu. Veuillez vous reconnecter.");
       localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        this.$router.push("/login");
        //console.log(error);
      }
      console.log(error);
    });
}
else{
  alert("Ce n'est pas sympa de vouloir effacer un post que vous n'avez pas créé !");
  return ;
}
}




// if (confirm("Voulez-vous vraiment supprimer ce post ?")) { // Confirm the deletion of the post
//   const url = 'http://localhost:8080/api/posts/' + id;

//   fetch(url, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + localStorage.getItem("token") 
//     },
// })
//     .then(response => response.json())
//     .then((res) => {
//       console.log(res);
      
//       console.log("id:",id);
//       this.getPosts();// a voir mais ce n'est pas mal
 
//     })
// }
// }

//import Card from "./Card.vue"; // pour le moment je ne peux pas binder les infos de l'utilisateur dans le card 

function editPost(id,userId) {//_____________________________________ Edit a post by id 



const adminId= "62a9f561c580240eba5b2da3" // A mettre dans un .env si c'est bon !!!!!!!!!!!!!!!!!
console.log(adminId);



const currentUserId = localStorage.getItem("userId"); 
if (currentUserId === adminId){
  alert("★★ GOD MODE ACTIVATED ★★");
  
}



if(currentUserId === userId || currentUserId === adminId ){//____________________________ Check if the user is the owner of the post !



  const url = 'http://localhost:8080/api/posts/' + id;
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
 
      this.post = res;
      this.$router.push("/edit/" + id);
    })

  //this.$router.push("/edit/" + id);
    .catch(error => {
        if (error.status !== 200) {
       alert("Oups ! Un problème est survenu. Veuillez vous reconnecter.");//_____ Get  if the token is valid !
       localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        this.$router.push("/login");
        //console.log(error);
      }
    });
 
}
else{
  alert("Vous souhaitez modifier un post qui n'est pas le votre !");
  return ;
}
}







function likePost(id,userId,like,usersLiked) {//_____________________________________ Like a post by id 


const currentUserId = localStorage.getItem("userId"); //_________________________________________________Only one like per user
const userLike = usersLiked.find(user => user === currentUserId);
if (userLike) {
  alert("C'est gentil mais vous avez déjà liké ce post !");
  return ;
}






if(like=1){ // ______________________________ Strange thing !
  this.post.likes=this.post.likes+1; 
}
   

  const url = 'http://localhost:8080/api/posts/' + id +"/like";
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify({
      like: like,
      usersLiked: usersLiked,
      id: id,
      userId: localStorage.getItem("userId")
    })
  })
    .then(response => response.json())
    .then((res) => {
      console.log(res);
       this.getPosts(); 
      //this.$router.go();
    })

  console.log("ID DU POST: ",id);
  console.log("USER ID: ",userId);
  console.log("NEW LIKE: ",like);
  console.log("USER LIKED: ",usersLiked);/// non

}


export default {
  name: "News", data,
  methods: {
    sendPost() {
      this.post.userId = localStorage.getItem("userId"),
      this.post.date = dateTime(),
        this.post.name = userName(),
        this.post.title = this.title,
        this.post.content = this.content,
        this.post.imageUrl = this.imageUrl,
        this.post.likes = 0,/// s !!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.post.usersLiked = [],
        sendPost(this.post)
   
     
    },
    fileSelect(e) {
      console.log(e.target.files[0]);
    this.imageUrl = URL.createObjectURL(e.target.files[0]);

   this.imageName = e.target.files[0].name;
    console.log(this.imageName);
     console.log(this.imageUrl);



    
    },
    //likePost,
    likePost,
    dateTime,
   
    getPosts,
   
    
    logout,

    deletePost,

    editPost
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
              <button class="btn btn-secondary btn-lg mt-1 m-1" @click="getPosts(this.post, name, title, content,usersLiked,date)">All
                posts</button>
              <button class="btn btn-secondary btn-lg mt-1 m-1" @click="logout()">Logout</button>
            </li>
           </ul>
        </div>
      </div>
    </nav>
    <div class="form-floating">
      <p class="text-center mt-3">Quoi de neuf @{{ this.post.name }} ?</p>
      <div class="d-flex bg-light">

        <textarea class="form-control" placeholder="Title"  v-model="title"></textarea>
        <!-- <label for="floatingTextarea">Title</label> -->
        <textarea class="form-control " placeholder="Tape your text" id="floatingTextarea"  v-model="content"></textarea>
        <!-- <label for="floatingTextarea">Comments</label> -->

      </div>
    </div>
    <div class="d-flex  mt-1">
      <label for="file-input" class="btn btn-light  btn-lg mt-1">Add Image</label>
      <input id="file-input" type="file" @change="fileSelect"/>
   
      


      <!-- <img class="img-fluid" v-if ="fileSelect" :src="imageUrl" alt="image" width="100" height="100"> -->
      <!-- <img class="img-fluid" v-if ="fileSelect" :src="imageUrl" alt="image" width="100" height="100"> -->
      
     
      <!-- <button type="button" class="btn btn-danger btn-lg mt-1 ms-auto" @click="sendPost(this.post,title,content),getPosts(this.post,title,content)">Send</button> -->
      <button type="button" class="btn btn-danger btn-lg mt-1 ms-auto"
        @click="sendPost(this.post, name, title, content, imageUrl, like, usersLiked,date),
         getPosts(this.post, name, title, content, imageUrl, like, usersLiked,date) ">Send</button>

    </div>
    <hr class="mt-4 dropdown-divider" />
  

    <li v-for="post in posts">
 
      <div class="card mb-3 m-auto">
        <div class="card-header">
          <img src="/img_logo/icon.png" class="rounded-circle m-2" alt="Avatar">

          Posté par @{{ post.name }} &#128172 {{post.date}}
          
        </div>
      
        <img v-if="post.imageUrl" :src="post.imageUrl" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.content }}</p>
          

          <div class="d-flex bg-light">
       
           
      <div class = "like" >
        
      
  <div  id = "heart" @click=" likePost(post._id,post.userId,post.likes,post.usersLiked)" >
    
    <div id = "left" class = "segments"></div>
    <div id = "right" class = "segments"></div>
  </div>
  <div id = "like-count">{{ post.likes }}</div>
</div>
            <button  id="edit" type="button" class="btn btn-light btn-lg  ms-auto like" @click="editPost(post._id,post.userId)">Edit</button>
           

           
           






            <button id="delete" type="button" class="btn btn-danger btn-lg mt-1 ms-auto like"
              @click="deletePost(post._id,post.userId)">Delete</button>
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
max-height: 30rem; 
  object-fit: cover;

}

.like{
  height:5rem;
  width: fit-content;
  box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.1);
  display:flex;
  align-items:center;
  border-radius: 5px;
  padding: 5px;


}
.segments{
  height:30px;
  width:20px;
  border-radius: 100px 100px 0px 0px;
  background-color: #f47b7b;
 
  
}


#heart{
  height:20%;
  display: flex;
  align-items:center;
  justify-content: center;
  border-right: solid 1px rgba(0,0,0,0.2);
  padding:10px;
}
#heart > #left{
  transform:rotate(-45deg) translate(40%) ;
  margin-top:10px;

}
#heart > #right{
  transform:rotate(45deg) translate(-40%) ;
  margin-top:10px
}
#like-count{
  margin:0px 10px;
  font-size:30px;
  font-family: monospace;
}
</style>