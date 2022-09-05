
export class ModalPost{
    
    static chamarModal(modal) {   
            
        const body = document.querySelector("body") 
        const section = document.createElement("section")

        section.classList.add("container__modal")

        section.append(modal)
        body.append(section)
      
       
    }

    static criarModalClick(post){
        console.log(post)  
        const DivMain           = document.createElement("div")
        const tagDivLi          = document.createElement("div")
        const divBoxImg         = document.createElement("div")
        const tagImg            = document.createElement("img")
        const tagDivInfoUsuario = document.createElement("div")
        const tagH3info         = document.createElement("h3")
        const tagPInfo          = document.createElement("p")
        const tagFechaModal     =  document.createElement("span")

        
        DivMain.classList.add("modal") 
        tagDivLi.classList.add("li_div_usuarios")
        divBoxImg.classList.add("box_imgDiv__postagem")
        tagDivInfoUsuario.classList.add("posts__Info__usuario")
        tagH3info.classList.add("nome_usuario_h3")
        tagPInfo.classList.add("trabalho")
        tagFechaModal.classList.add("fechaModal")
        tagImg.classList.add(".imgUsers")

        tagImg.src          = post.author.image
        tagImg.alt          = post.author.useranme
        tagH3info.innerText = post.author.useranme
        tagPInfo.innerText  = post.author.work_at

        tagFechaModal.innerText = "x"

     

        
        divBoxImg.append(tagImg)
        tagDivInfoUsuario.append(tagH3info, tagPInfo) 
        tagDivLi.append(divBoxImg,tagDivInfoUsuario, tagFechaModal)

        tagFechaModal.addEventListener("click", ()=>{
            const modal = document.querySelector(".container__modal")
            modal.classList.add("modal-disappear")
            setTimeout(()=>{
                modal.remove()
            },1000)
        })
 
        //  append Poster
        const tagDivPoster      = document.createElement("div")
        const tagh2Post         = document.createElement("h2")
        const tagPPost          = document.createElement("p")
        
        tagDivPoster.classList.add("informacao__do__post")
        tagh2Post.classList.add("tituloPost")
        tagPPost.classList.add("textPost")

        tagh2Post.innerText     = post.title
        tagPPost.innerText      = post.description



        
        tagDivPoster.append(tagh2Post, tagPPost)
        DivMain.append(tagDivLi, tagDivPoster)

        return DivMain

    }

}