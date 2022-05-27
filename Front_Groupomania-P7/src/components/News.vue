<script>
import Card from "./Card.vue";
export default{
    name :"News",
    components:{
        Card
    }
}
</script>
<template>
<div class="container-sm">
<h1>FaceWISH </h1>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Groupomania</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="form-floating">
  <textarea class="form-control " placeholder="Leave a comment here" id="floatingTextarea"></textarea>
  <label for="floatingTextarea">Comments</label>
 
</div>
<div class="d-flex bg-light">
    <label for="file-input" class="btn btn-secondary btn-lg mt-1">Add Image</label>
<input id="file-input" type="file"/>
<button type="button" class="btn btn-danger btn-lg mt-1 ms-auto">Send</button>
</div>
<hr class="mt-4 dropdown-divider"/>
<Card></Card>
<Card></Card>
<Card></Card>
<Card></Card>
</div>

</template>
<style>
input {
    display: none;
}</style>