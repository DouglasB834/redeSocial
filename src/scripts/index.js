import { CriarModal } from "./modal.js"
import { Requests } from "./request.js"

export class Index{

    static indexRender(){
        const token = localStorage.getItem("@kenzieRedeSocial:token")
        if(token){
          
            window.location.replace("/src/pages/dashboard.html")
            //tira o token e nao deixa armazeinamento 
        }
    }
    static darkEvent(){
        // const darkMode = document.querySelector(".darkMode")
        // const html = document.querySelector(".darkMode")

        // darkMode.addEventListener("click", ()=>{
        //     html.classList.toggle("dark-molde")
        // })

    }

    static Showlogin(){
        const btnLogin = document.querySelector(".btnLogin")

        btnLogin.addEventListener("click", ()=>{
            const novoModal = CriarModal.loginForm()
            CriarModal.template(novoModal)               
            Index.getLogin() 
            

        })
    }
    static fecharModal(){
        const btnClose = document.querySelector(".closeModal")
        btnClose.addEventListener("click", ()=>{
            const modal = document.querySelector(".container__modal")
            modal.classList.add(".modal-disappear")
            setTimeout(()=>{
                modal.remove()
            },1000)
        })
    }
    static ShowSingup(){
        const btnLogin = document.querySelector(".btnSingup")

        btnLogin.addEventListener("click", ()=>{
            const novoModal = CriarModal.singupForm()
            CriarModal.template(novoModal)   
            Index.getSingup()       

        })
    }
    static getLogin(){
        const inputlogin = document.querySelector(".email")
        const inputlPass = document.querySelector(".password")
        const btnLogin   = document.querySelector(".logar")
        
        btnLogin.addEventListener("click", async (event)=>{
            event.preventDefault()            
            const data = {
                email:inputlogin.value,
                password: inputlPass.value
            }
          
           const teste = await Requests.login(data)
        })      

    }

    static  getSingup(){
      
        const btnCadastra = document.querySelector(".register")
        const nomeUser   = document.querySelector(".nomeUser")
        const email      = document.querySelector(".email")
        const password   = document.querySelector(".password")
        const UserJob    = document.querySelector(".UserJob")
        const UserImg    = document.querySelector(".UserImg")

       

        btnCadastra.addEventListener("click", async (event)=> {
            event.preventDefault()

        const data = {
            username:   nomeUser.value, 
            email:      email.value, 
            password:   password.value, 
            work_at:    UserJob.value, 
            image:      UserImg.value
        }
      
        await Requests.singup(data)
      })

    }

}

// Index.darkEvent()
Index.indexRender()
Index.Showlogin()
Index.ShowSingup()

// const token = localStorage.getItem("@kenzieRedeSocial:token");
// console.log(token)





