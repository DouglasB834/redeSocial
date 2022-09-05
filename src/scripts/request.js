import { instance } from "./axios.js";
import { Toast } from "./tost.js";

export class Requests {

    //fazer o login
    static async login(data) {
        const loginUser = await instance
            .post("users/login/", data)
            .then(res => {
                localStorage.setItem("@kenzieRedeSocial:token", res.data.token)
                localStorage.setItem("@kenzieRedeSocial:id", res.data.user_uuid)
                Toast.create("Login realizado com sucesso", "#0be881")

                setTimeout(() => {
                    window.location.replace("src/pages/dashboard.html")
                }, 1000)
            })
            .catch(error => {
                Toast.create("Email ou password invalido", "#FF3F34")
            })
        return loginUser

    }

    // fazer o cadastro
    static async singup(data) {

        const newRegister = await instance
            .post("users/", data)
            .then(async res => {
                console.log(res.data)
                console.log(data)
                Toast.create("Cadastrado com sucesso!!")

                // setTimeout(()=>{


                // }, 1000)

                const newData = {
                    email: res.data.email,
                    password: data.password
                }
                await this.login(newData)


            })
            .catch(error => {
                Toast.create("Cadastro invalido", "#4263EB;")
            })
        // return newRegister
    }

    //para listar todos os POSTS
    static async listarTodosPosts(page) {
        const posts = await instance
            .get(`posts/?limit=10&offset=${page}/`)
            .then(res => res.data.results)
            .catch(error => {
                console.log(error)
            })

        return posts
    }


    // pesquisar todos os usuarios na page
    static async allUsers(users = 1) {
        const usuarios = await instance
            .get(`users/?page=${users}`)
            .then(res => res.data.results)
            .catch(error => {
                Toast.create("nao vai listar", "red;")
            })
        return usuarios
    }


    //um usuario só
    static async userUuid(userId) {
        const buscarID = await instance
            .get(`users/${userId}/`)
            .then(res => res.data)
            .catch(error => {
                console.log(error)
            })
        return buscarID
    }


    //seguir usuario
    static async followUsuario(data) {

        const seguirUsuario = await instance
            .post("users/follow/", data)
            .then(res => {
                Toast.create("Seguindo", "gray")
                return res
            })
            .catch(error => {
                Toast.create(error, "gray")
            })

        return seguirUsuario
    }

    //parar de seguir usuario         "50f42dfd-c1d3-4757-85ae-c6fe584f3c7d"
    static async unfollow(id) {
        const seguirUsuario = await instance
            .delete(`users/unfollow/${id}/`)
            .then(res => {
                Toast.create("Unfllow", "gray")
            })
            .catch(error => {
                Toast.create(error.response.data.following_users_uuid + " delete", "red")
            })
    }

    //criar novo post
    static async criarNovoPost(body) {
        const NovoPost = await instance
            .post("posts/", body)
            .then(res => {
                Toast.create(`Postado com sucesso `, "gray")
            })
            .catch(error => {
                Toast.create("Informação do poste incompleta", "#4263EB;")
            })
        return NovoPost
    }


    // dar like
    static async liked(id) {
        const clickLike = await instance
            .post(`likes/`, id)
            .then(res => {
                Toast.create("Liked")
            })
            .catch(error => Toast.create(error, "red"))
        return clickLike
    }

    //tirar like
    static async noliked(id) {
        const desLiked = await instance
        .delete(`/likes/${id}/`)
            .then(res => {
                Toast.create("desliked")
            })
            .catch(error => {
                Toast.create(error, red)
            })

        return desLiked
    }



}
