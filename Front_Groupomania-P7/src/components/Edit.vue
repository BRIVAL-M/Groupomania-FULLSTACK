

<script>

function userName() {//_____________________________________ Find the user name from him email
    const email = localStorage.getItem('email');
    const name = email.substring(0, email.lastIndexOf("@"));
    return name;
}




function getPostById() {

    const id = window.location.href.split('/').pop(); // Get the id from the url


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
        })
        .catch(error => {
            console.log(error);
        });
}

function updatePost(post, name, title, content, imageUrl, like, usersLiked) {
    const id = window.location.href.split('/').pop();
    const url = 'http://localhost:8080/api/posts/' + id;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        // body: JSON.stringify(this.post)
        body: JSON.stringify(post, name, title, content, imageUrl, like, usersLiked)
    })
        .then(response => response.json())
        .then((res) => {
            console.log(res);
            this.post = res;
            //this.$router.push("/news");

        })
        .catch(error => {
            console.log(error);
        });
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
            likes: 0,
            usersLiked: [],
        },

    }
}





export default {
    name: "Edit", data,

    methods: {
        getPostById,

        updatePost() {
            this.post.userId = localStorage.getItem("userId"),
                this.post.name = userName(),
                this.post.title = this.title,
                this.post.content = this.content,
                this.post.imageUrl = this.imageUrl,
                this.post.like = 0,
                this.post.usersLiked = [],
                updatePost(this.post)
        },
        fileSelect(e) {
            console.log(e.target.files[0]);
            this.imageUrl = URL.createObjectURL(e.target.files[0]);


            this.imageName = e.target.files[0].name; // a revoir pour afficher   le nom de l'image peut etre
            console.log(this.imageName);
            console.log(this.imageUrl);
        },
    },
    mounted() {
        this.getPostById();
    },
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

                <textarea class="form-control" placeholder="Title" required="" v-model="title"></textarea>
                <textarea class="form-control " placeholder="Tape your text" id="floatingTextarea"
                    v-model="content"></textarea>


            </div>
        </div>
        <div class="d-flex  mt-1">

            <label for="file-input" class="btn btn-light  btn-lg mt-1 like">Add Image</label>
            <input id="file-input" type="file" @change="fileSelect" />

            <button class="btn btn-primary btn-lg mt-1 like"
                @click="updatePost(this.post, name, title, content, imageUrl, like, usersLiked)">Update</button>
            <router-link to="/news" class="btn btn-light  btn-lg mt-1 like">Cancel</router-link>
            <router-link to="/news" class="btn btn-light  btn-lg mt-1 like">All posts</router-link>

            <!-- <button type="button" class="btn btn-danger btn-lg mt-1 ms-auto like"
        @click="sendPost(this.post, name, title, content,imageUrl,like,usersLiked), getPosts(this.post, name, title, content,imageUrl,like,usersLiked)">Send</button> -->
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
