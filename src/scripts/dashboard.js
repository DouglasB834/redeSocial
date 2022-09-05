import { ModalPost } from "./modalDashboard.js"
import { Requests } from "./request.js"


// await fetchTeste.chamarfatch()

class DashboardRender {
    static idUserio = localStorage.getItem("@kenzieRedeSocial:id")
    static verifcarToken() {
        const token = localStorage.getItem("@kenzieRedeSocial:token")

        if (!token) {
            window.location.replace("../../index.html")
            //tira o token e nao deixa armazeinamento 
        }

    }

    static sairDaPage() {
        const sair = document.querySelector(".sair")

        sair.addEventListener("click", () => {

            localStorage.removeItem("@kenzieRedeSocial:token")
            localStorage.removeItem("@kenzieRedeSocial:id")
            window.location.replace("../../index.html")
        })
    }
    static async meuPerfil() {
        const informacao = await Requests.userUuid(this.idUserio)
        const img = document.querySelector("#minhaFoto")
        const nome = document.querySelector(".title")
        const seguidores = document.getElementById("seguidores")
        const jobs = document.querySelector(".jobs")
        console.log(informacao)

        img.src = informacao.image
        nome.innerText = `${informacao.username} `
        jobs.innerText = informacao.work_at
        seguidores.innerText = ` ${informacao.followers.length} seguidores`



    }

    static NewPost() {
        const form__post = document.querySelector(".form__post")
        const form__text = document.querySelector(".form__text")
        const btnPostar = document.querySelector(".btnPostar")

        btnPostar.addEventListener("click", (event) => {
            event.preventDefault()

            const objeto = {
                title: form__post.value,
                description: form__text.value

            }
            form__text.innerText = ""
            form__post.innerText = ""
            // Requests.criarNovoPost(objeto)
            btnPostar.style.background = "--brand-2"
            console.log(objeto)
            // setTimeout(() => {
            // },)
        })

    }
    static changePage() {
        let contador = 1
        const pagina = document.querySelector(".page")
        const btn1 = document.querySelector(".btn1")
        btn1.addEventListener("click", () => contador--)
        const btn2 = document.querySelector(".btn2")
        btn2.addEventListener("click", () => contador++)
        console.log(contador)
        pagina.innerText = contador

    }

}

DashboardRender.changePage()
DashboardRender.meuPerfil()
DashboardRender.NewPost()



//FN Dinamicas
class Postagens {
    static postagens_ul = document.querySelector(".postagens_ul")

    static async listaDePostagens() {
        const postagens_ul = document.querySelector(".postagens_ul")
        const posts = await Requests.listarTodosPosts()

        // console.log(posts)
        posts.forEach(async element => {
            let renderizarPost = await Postagens.renderPostagens(element)
            postagens_ul.append(renderizarPost)

        });



        const ul_sujestoes = document.querySelector(".ul_sujestoes")
        const sujestoes = await Requests.allUsers()

        const minhaInf = await Requests.userUuid(this.idUserio)
        sujestoes.forEach(async element => {
            let appendSugestao = await Postagens.sugestãoSeguir(element)

            ul_sujestoes.append(appendSugestao)
        })
    }

    static async sugestãoSeguir(usuario) {


        const tagLi = document.createElement("li")
        const div_usuarios = document.createElement("div")
        div_usuarios.classList.add("li_div_usuarios")

        const divBoxImg = document.createElement("div")
        const tagImg = document.createElement("img")
        divBoxImg.classList.add("box_img")
        tagImg.classList.add("imgUsers")
        tagImg.src = usuario.image

        divBoxImg.append(tagImg)

        const tagDivInfoUser = document.createElement("div")
        tagDivInfoUser.classList.add("box_content_usuario")

        const tagPNome = document.createElement("p")
        const tagSpanJob = document.createElement("span")
        tagPNome.innerText = usuario.username
        tagSpanJob.innerText = usuario.work_at

        const box_btnSeguir = document.createElement("div")
        box_btnSeguir.classList.add("box_btnSeguir")

        const tagbtnSeguir = document.createElement("button")
        tagbtnSeguir.classList.add("seguir")
        tagbtnSeguir.innerText = "seguir"
        tagbtnSeguir.id = usuario.uuid


        usuario.followers.forEach(element => {
            let id = element.followers_users_id.uuid

            if (id.includes(localStorage.getItem("@kenzieRedeSocial:id"))) {
                tagbtnSeguir.innerText = "seguindo"
                tagbtnSeguir.style.background = "var(--brand-1)"
                tagbtnSeguir.style.color = "var(--whiteFixed)"
                tagbtnSeguir.classList.add("seguindo")
                tagbtnSeguir.id = element.uuid

            }


        })
        let primeiroID = usuario.uuid
        tagbtnSeguir.addEventListener("click", async () => {

            if (tagbtnSeguir.classList.contains("seguindo")) {

                tagbtnSeguir.innerText = "seguir"
                tagbtnSeguir.style.background = "var(--grey3)"
                tagbtnSeguir.style.color = "var(--gre1)"
                tagbtnSeguir.classList.remove("seguindo")
                Requests.unfollow(tagbtnSeguir.id)
                tagbtnSeguir.id = primeiroID
            } else {
                tagbtnSeguir.innerText = "seguindo"
                tagbtnSeguir.style.background = "var(--brand-1)"
                tagbtnSeguir.style.color = "var(--whiteFixed)"
                tagbtnSeguir.classList.add("seguindo")
                const objeto = {
                    following_users_uuid: tagbtnSeguir.id
                }
                const iDDoido = await Requests.followUsuario(objeto)
                tagbtnSeguir.id = iDDoido.data.uuid
            }
        })

        box_btnSeguir.append(tagbtnSeguir)
        tagDivInfoUser.append(tagPNome, tagSpanJob)
        div_usuarios.append(divBoxImg, tagDivInfoUser)

        tagLi.append(div_usuarios, box_btnSeguir)
        return tagLi
    }


    static async renderPostagens(post) {
        const { author } = post

        const tagLi = document.createElement("li")
        const tagDivInfoUsuario = document.createElement("div")

        tagDivInfoUsuario.classList.add("li_div_usuarios")

        const tagBoxImg = document.createElement("div")
        const tagImg = document.createElement("img")
        tagBoxImg.classList.add("box_imgDiv__postagem")
        tagImg.classList.add("imgUsers")
        tagImg.src = author.image
        tagBoxImg.appendChild(tagImg)


        const tagNomeEJob = document.createElement("div")
        const tagh3Nome = document.createElement("h3")
        const tagPtrablho = document.createElement("p")
        tagNomeEJob.classList.add("posts__Info__usuario")

        tagh3Nome.innerText = author.username
        tagPtrablho.innerText = author.work_at
        tagNomeEJob.append(tagh3Nome, tagPtrablho)

        tagDivInfoUsuario.append(tagBoxImg, tagNomeEJob)


        const tagInfoPost = document.createElement("div")
        const tagH2 = document.createElement("h2")
        const tagP = document.createElement("p")
        tagInfoPost.classList.add("informacao__do__post")

        tagH2.innerText = post.title
        tagP.innerText = post.description
        tagInfoPost.append(tagH2, tagP)

        const tagBoxCurtidasEBtn = document.createElement("div")
        const btnAbrirPost = document.createElement("button")
        const tagDivCurtidas = document.createElement("div")
        const tagI = document.createElement("i")
        const tagSpan = document.createElement("span")
        tagBoxCurtidasEBtn.classList.add("box_brnAbrirPost")


        btnAbrirPost.classList.add("btnAbrirPost")
        btnAbrirPost.innerText = "Abrir Post"
        btnAbrirPost.id = post.uuid

        tagDivCurtidas.classList.add("box__curtidas")
        tagI.innerHTML = `<i class="fa-solid fa-heart"></i>`
        tagI.classList.add("linked")
        tagSpan.innerText = `${post.likes.length}`
        tagI.id = post.uuid

        console.log(post)
    
        post.likes.forEach(ids => {
            let id = ids.user.uuid
           

            if (id.includes(localStorage.getItem("@kenzieRedeSocial:id"))) {
                console.log("cheguei ")
                tagI.style.color = "red"
                tagI.classList.add("liked")

            }

        })

        tagI.addEventListener("click", () => {
          

            if (tagI.classList.contains("liked")) {
                const like =  post.likes.filter(ids =>{
                    let id = ids.user.uuid
                    return id.includes(localStorage.getItem("@kenzieRedeSocial:id"))
                })

                tagI.classList.remove("liked")
                tagI.style.color = "var(--grey3)"
                Requests.noliked(like[0].uuid)
                console.log("nao curtindo ")
                tagSpan.innerText = `${post.likes.length -1}`
             
               

            } else {
                console.log("curtindo ")
                tagI.style.color = "red"
                const id = {
                    post_uuid: tagI.id
                }
                tagI.classList.add("liked")
                Requests.liked(id)
                tagSpan.innerText = `${post.likes.length+1}`
            }
            Requests.listarTodosPosts()

        })

        // ABRIR POSTE
        btnAbrirPost.addEventListener("click", () => {
            if (btnAbrirPost.id == post.uuid) {
                const newModal = ModalPost.criarModalClick(post)

                ModalPost.chamarModal(newModal)
            }
        })


        tagDivCurtidas.append(tagI, tagSpan)
        tagBoxCurtidasEBtn.append(btnAbrirPost, tagDivCurtidas)

        tagLi.append(tagDivInfoUsuario, tagInfoPost, tagBoxCurtidasEBtn);
        return tagLi

    }


}

DashboardRender.sairDaPage()
Postagens.listaDePostagens()


