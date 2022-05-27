<script>
export default {
    name: "Card",
}
</script>
<template>
<div class="card mb-3 m-auto">
    <div class="card-header">
        <img src="https://pbs.twimg.com/profile_images/1309520292155404289/dtK6XNGF_400x400.jpg" class="rounded-circle m-2" alt="Avatar">
        
        Posté par Mat </div>
  <img src="https://picsum.photos/200/300" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Super !</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div></template>
<style>
img {
     max-height: 20rem;
    object-fit: cover;
    }
    .card-header img{
        width: 60px ;
        height: 60px ;
    }
/* .card {
    width: 30rem;
    
} */
</style>