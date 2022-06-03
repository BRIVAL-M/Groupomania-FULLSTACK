


<script>
import useVuelidate from '@vuelidate/core';
import { required,email,helpers} from '@vuelidate/validators'; // Contient les règles de validation ,maxLength,minValue,maxValue, 

// const pwdForce = (value) => {// ne fonctionne pas ! 


// RegExp(/[\w\W]{8,}/).test(value) &&
// RegExp(/[0-9]+/).test(value) &&
// RegExp(/[A-Z]+/).test(value) &&
// RegExp(/[*^!$&;]/).test(value) 
// };

// const beSafe = helpers.withMessage('Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial (ex: !, @, #, etc.)', pwdForce); // ajouté les chars spéciaux

////////////////////////////////////////////




  function checkForm(email,password) { 
   

    
   
     const url = 'http://localhost:8080/api/auth/login';
     console.log(url);
    
        console.log({email, password});//---------------------------------A delete !
        fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         // 'Authorization': 'Bearer ' + localStorage.getItem('TOKEN :') 
        },
        body: JSON.stringify({email, password})
      })
      .then(response => response.json())
       .then((res) => {
        
         ///////////////////////////////////////////////////////////recupérer le token
          console.log(res);
          localStorage.setItem('TOKEN :', res.token);
          localStorage.setItem('userId', res.userId);
          
          

        ////////////////////////////////////// Pour retrouver les messages d'erreur du backend
      console.log(res);
      
      // const fail = JSON.stringify(res.errors)
      // console.log(fail);

      const findMsg = res.errors.find(function(element) {
        return element.msg
      });
      console.log(findMsg);
       /////////////////////////////////////////////
      
      
    })
      //.then(data => {
  
     

      
       // console.log(data); // les vérifications du form back sont là....
 
  

       
      
       
       // this.$router.push("/news");
    ///  })
      .catch(error => {
      
        console.log(error);
        
      });
}
 

import "bootstrap/dist/css/bootstrap.min.css";
import "/App.css";
export default {
  name: "Login", 
  validations:{
    email: {
      required, email
    },
    password: {
      required,
 
       //beSafe // ne fonctionne pas ! 
      
    },
  },
  data,
  methods:{
    submit(){
       console.log("success", this.v$);
      this.v$.$validate()
    //   if(!checkEmail(email)){
    //   alert("Email incorrect");
    //   return 
    // }
      if(this.v$.$errors.length===0) {
        console.log("success", this.v$);
        checkForm(this.email,this.password);
        this.$router.push("/news");
      }
      //checkForm(this.email,this.password);
    },
     // checkForm,
      
  }
};

function data(){
  
  return {
    email: "",
        password: "",
      
        v$: useVuelidate(),
        
  }
}





   



</script>

<template>

 <div class="container-fluid">
            <div class="row no-gutter">
               
                <div class="col-md-6 d-none d-md-flex bg-image"></div>


                
                <div class="col-md-6 bg-light">
                    <div class="login d-flex align-items-center py-5">

                       
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-10 col-xl-7 mx-auto">
                                    <h3 class="display-4 text-center">Groupomania</h3>
                                    <p class="text-muted mb-4 text-center">Restez connecté à l'entreprise même durant vos congés !</p>
                                    <form>
                                        <div class="mb-3">
                                            <input id="inputEmail" type="email" placeholder="Email address" 
                                            required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" 
                                            v-model="email"/>
                                            <small  v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</small>

                                        </div>
                                        <div class="mb-3">
                                            <input  id="inputPassword" type="password" placeholder="Password" 
                                            required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-danger" 
                                            v-model="password"/>
                                            <small  v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</small>
                                                                               
                                            
                                          
                                          
                                           
                                            
                                        </div>
                                        <!-- <div class="form-check">
                                            <input id="customCheck1" type="checkbox" checked class="form-check-input" />
                                            <label for="customCheck1" class="form-check-label">Remember password</label>
                                        </div> -->
                                        <div class="d-grid gap-2 mt-2">                                                                  <!--Virer le prevent apres !-->
                                        <button type="submit" class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm" @click.prevent="submit">Login</button><!---Attention au prevent-->
                                        <!-- <p class="mt- mb-3 text-muted" >Value:{{email}}</p>
                                         <p class="mt- mb-3 text-muted" >Value:{{password}}</p> -->
                                    
                                       
                                        </div>
                                        
                                        <div class="text-center d-flex justify-content-between mt-4"><p>Vous n'avez pas de compte ? <router-link to = "/signup">SIGN IN</router-link></p></div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

</template>  

<style>

</style>