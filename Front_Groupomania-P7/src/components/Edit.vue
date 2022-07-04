
<script>

function logout() {//_________________________ Logout user

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    this.$router.push("/login");
}

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
            this.post = res;

            // console.log(res);
            // this.post = res;
        })
        .catch(error => {


            console.log(error);
        });
}



function updatePost(post) {

    const formData = new FormData();
    if (post.imageUrl) {
        formData.append('image', post.imageUrl);
    }
    formData.append('title', post.title);
    formData.append('content', post.content);

    const id = window.location.href.split('/').pop();

    const url = 'http://localhost:8080/api/posts/' + id;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },

        body: formData
    })
        .then(response => response.json())
        .then((res) => {
            console.log(res);
            location.reload();
        })
        .catch(error => {
            console.log(error);
        });
}










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
        logout,


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
            console.log("e: ", e.target.files[0]);
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

        <nav class="navbar navbar-expand-lg navbar-light bg-light mt-3">
            <div class="container-fluid">
                <h1 class="navbar-brand">Groupomania</h1>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">


                            <router-link to="/news" class="btn btn-light  btn-lg mt-1 m-1 like m-lg-3">All posts
                            </router-link>
                            <button class="btn btn-light btn-lg mt-1 m-1 like" @click="logout()">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


        <hr class="mt-4 mb-4 dropdown-divider" />

        <div class="card mb-3 m-auto">
            <div class="card-header">
                <!-- <img src="/img_logo/icon.png" class="rounded-circle m-2" alt="Avatar"> -->
                <h3>Modification du post</h3>

            </div>

            <img v-if="post.imageUrl" :src="post.imageUrl" class="card-img-top mt-3" alt="...">
            <hr class="mt-3 dropdown-divider" />

            <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>



                <p class="card-text">{{ post.content }}</p>

            </div>
        </div>
        <div class="form-floating">
            <!-- <p class="text-center mt-3">Tu vas modifier ton post @{{ this.post.name }} !</p> -->
            <div class="d-flex bg-light">

                <textarea class="form-control m-3" placeholder="Title" required="" v-model="post.title"></textarea>
                <textarea class="form-control m-3 " placeholder="Tape your text" id="floatingTextarea"
                    v-model="post.content"></textarea>


            </div>
        </div>
        <div class="d-flex bg-light mt-3 ">

            <label for="file-input" class="btn btn-light  btn-lg  like">Add Image</label>
            <input id="file-input" type="file" @change="fileSelect" />





            <button class="btn btn-light btn-lg  ms-auto like " @click="updatePost()">Update</button>
            <router-link to="/news" class="btn btn-light  btn-lg  ms-auto like ">All posts</router-link>




        </div>
        <hr class="mt-4 dropdown-divider" />
    </div>

</template>

<style >
.like {
    height: 3rem;
    width: fit-content;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 5px;
    transition: all 0.5s ease !important;
}

.like:hover {
    background-color: #FFD7D7 !important;
    transform: scale(1.1);
}
</style>
