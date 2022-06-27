
<script>

function getPostById() {

const id = window.location.href.split('/').pop(); // Get the id from the url

const url = 'http://localhost:8080/api/posts/' + id;
    fetch(url, {
        method: 'GET',
        headers: {
           // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
           // 'Accept': 'multipart/form-data'
        },
    })
        .then(response => response.json())
        .then((res) => {
            console.log(res);
            this.post = res;
         })
      .catch(error => {
        console.log(error);
      });
}



function updatePost(post) {

const formData = new FormData();
 if(post.imageUrl){
  formData.append('image', post.imageUrl);
 }
//formData.append('userId', post.userId);
  formData.append('title', post.title);
  formData.append('content', post.content);




const id = window.location.href.split('/').pop();

    const url = 'http://localhost:8080/api/posts/' + id;
    fetch(url, {
        method: 'PUT',
        headers: {
           // 'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        
   //    body: JSON.stringify(post,title, content, imageUrl)
        body: formData
    })
        .then(response => response.json())
        .then((res) => {
            console.log(res);
             location.reload();/// en attendant de voir comment faire pour afficher la nouvelle image sans recharger la page
             })
        .catch(error => {
            console.log(error);
            
    //     if (error.status !== 200) {
    //    alert("Oups ! Un problème est survenu. Veuillez vous reconnecter.");
    //    localStorage.removeItem("token");
    //     localStorage.removeItem("userId");
    //     localStorage.removeItem("email");
    //     this.$router.push("/login");
    //     //console.log(error);
    //     }
         });
    }

    


// function rmImg(){
   

// }





function data() { // _____________________________________ Data of user's posts

    return {
        posts: [],
        post: {
          //  userId: "",
//  name: userName(),
            title: '',
            content: '',
            imageUrl: '',
           // likes: 0,
          // usersLiked: [],
        },
 }
}





export default {
    name: "Edit", data,

    methods: {
        getPostById,
        //rmImg,

        updatePost() {
         
                 this.post.userId = this.userId,            
                this.post.title = this.post.title,
                this.post.content = this.post.content,
                this.post.imageUrl = this.imageUrl,
             //  this.post.likes = 0,
             //  this.post.usersLiked = [],
                updatePost(this.post)
              
                
        },
        fileSelect(e) {
            console.log("e: ",e.target.files[0]);
      this.imageUrl = e.target.files[0];
           
        },
    },
    mounted() {

        this.getPostById();

    
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


                            <router-link to="/news" class="btn btn-light  btn-lg mt-1 m-1 like">All posts</router-link>
                            <button class="btn btn-secondary btn-lg mt-1 m-1 like" @click="logout()">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <hr class="mt-4 dropdown-divider" />

        <div class="card mb-3 m-auto">
            <div class="card-header">
                <img src="/img_logo/icon.png" class="rounded-circle m-2" alt="Avatar">
            </div>

            <img v-if="post.imageUrl" :src="post.imageUrl" class="card-img-top" alt="...">
            
            <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                
 

                <p class="card-text">{{ post.content }}</p>
               
            </div>
        </div>
        <div class="form-floating">
            <p class="text-center mt-3">Tu vas modifier ton post @{{ this.post.name }} !</p>
            <div class="d-flex bg-light">

                <textarea class="form-control" placeholder="Title" required="" v-model="post.title"></textarea>
                <textarea class="form-control " placeholder="Tape your text" id="floatingTextarea"
                    v-model="post.content"></textarea>


            </div>
        </div>
        <div class="d-flex  mt-1">

            <label for="file-input" class="btn btn-light  btn-lg mt-1 ">Add Image</label>
            <input id="file-input" type="file" @change="fileSelect"/>

           
                
          
           
                  <button class="btn btn-primary btn-lg mt-1 "
                @click="updatePost()">Update</button> 
                <router-link to="/news" class="btn btn-light  btn-lg mt-1 " >All posts</router-link>
       
                

           
        </div>
    </div>

</template>

<style scoped>
.like {
    /* height:5rem;
  width: fit-content; */
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 5px;


}

.like:hover {
    background-color: #f47b7b;
    cursor: pointer;
}
</style>
