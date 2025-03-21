/* FruitSpace API v1.3 */

import {useCookies} from "react-cookie";
import {serverGDAtom, userAtom} from "./fiber.model";
import {parseCookies} from "./cockie_parser";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";

const DISCORD_AUTH = "https://discord.com/oauth2/authorize?client_id=1119240313605734410&response_type=code&scope=identify%20guilds%20guilds.join&state="


class api {
    base_url: string = "https://api.fruitspace.ru/v2/"
    authorization: string = ""

    auth: auth
    user: user
    payments: payments
    fetch: ufetch
    servers: servers
    gdps_manage: gdps_manage
    gdps_users: gdps_users
    particles: particles

    constructor() {}

    doForm = async (endpoint: string, method: string = "GET", body = null): Promise<Response|any> => {
        return fetch(this.base_url + endpoint,
            {method: method, body: body, headers: {"Authorization": this.authorization}}
        ).then(r => r.json()).catch(e => ({status: "error", message: e.message, code: "conn"}))
    }

    do = async (endpoint: string, method = "GET", body: Object = null): Promise<Response|any> => {
        return fetch(this.base_url + endpoint,
            {
                method: method,
                body: body ? JSON.stringify(body) : null,
                headers: {"Authorization": this.authorization, "Content-Type": "application/json"}
            }
        ).then(r => r.json()).catch(e => ({status: "error", message: e.message, code: "conn"}))
    }
}

// region API

// @Deprecated
const useLoader = (loader: any) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    useEffect(() => {
        loader().then((resp) => {
            setLoading(false)
            setData(resp)
        })
    })

    return {loading, data}
}

const useFiberAPI = (cookie = "token") => {
    const [cookies, setCookie, delCookie] = useCookies([cookie])
    let sapi = new api();
    sapi.authorization = cookies[cookie]

    let xauth = new auth(sapi);
    xauth.logout = () => delCookie(cookie, {path: '/'})
    xauth.setCookieToken = (token: string) => setCookie(cookie, token,
        {path: "/", expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30)), secure: true})

    sapi.auth = xauth
    sapi.user = new user(sapi)
    sapi.payments = new payments(sapi)
    sapi.fetch = new ufetch(sapi)
    sapi.servers = new servers(sapi)
    sapi.gdps_manage = new gdps_manage(sapi)
    sapi.gdps_users = new gdps_users(sapi)
    sapi.particles = new particles(sapi)
    return sapi
}

const serverFiberAPI = (ctx: any, cookie = "token") => {
    const cookies = ctx ? parseCookies(ctx.req) : {}
    let sapi = new api()
    sapi.authorization = cookies[cookie] || ""

    sapi.auth = new auth(sapi)
    sapi.user = new user(sapi)
    sapi.payments = new payments(sapi)
    sapi.fetch = new ufetch(sapi)
    sapi.servers = new servers(sapi)
    sapi.gdps_manage = new gdps_manage(sapi)
    sapi.gdps_users = new gdps_users(sapi)
    sapi.particles = new particles(sapi)
    return sapi
}
// endregion

// region  Auth API
class auth {
    _api: api
    setCookieToken: (token: string) => void

    constructor(apix: api) {
        this._api = apix
    }

    logout = () => {
    }
    login = async (uname: string, password: string, hcaptcha: string, totp = "") => {
        return await this._api.do("auth/login", "POST", {
            uname: uname,
            password: password,
            hCaptchaToken: hcaptcha,
            totp: totp
        })
    }
    register = async (uname: string, name: string, surname: string, email: string, password: string, hcaptcha: string, lang = "ru") => {
        return await this._api.do("auth/register", "POST", {
            uname: uname,
            name: name,
            surname: surname,
            email: email,
            password: password,
            hCaptchaToken: hcaptcha,
            lang: lang
        })
    }
    recover = async (email: string, hcaptcha: string, lang: string) => {
        return await this._api.do("auth/recover", "POST", {
            email: email,
            hCaptchaToken: hcaptcha,
            lang: lang
        })
    }
    discord = (shallow = false) => {
        window.location.href = DISCORD_AUTH + (
            this._api.authorization && !shallow
                ? this._api.authorization : "")
    }
}

// endregion

// region User API
class user {
    _api: api

    constructor(apix: api) {
        this._api = apix
    }

    sso = async () => {
        return await this._api.do("user", "GET")
    }
    useUser = () => {
        return useAtom(userAtom)
    }
    getNotifications = async () => {
        return await this._api.do("user/notifications", "GET")
    }
    updateName = async (name: string, surname: string) => {
        return await this._api.do("user", "PATCH", {
            name: name,
            surname: surname
        })
    }
    updatePassword = async (password: string, new_password: string) => {
        return await this._api.do("user", "PATCH", {
            password: password,
            new_password: new_password
        })
    }
    updateTOTP = async (totp: string) => {
        return await this._api.do("user", "PATCH", {
            totp: totp
        })
    }
    resetAvatar = async () => {
        let datax = new FormData()
        datax.append("reset", "reset")
        return await this._api.doForm("user/avatar", "POST", datax)
    }
    updateAvatar = async (avatar_file: Blob|any) => {
        let datax = new FormData()
        datax.append("profile_pic", avatar_file)
        return await this._api.doForm("user/avatar", "POST", datax)
    }
    listSessions = async () => {
        return await this._api.do("user/sessions", "GET")
    }
    resetSessions = async () => {
        return await this._api.do("user/sessions", "DELETE")
    }
}

// endregion

// region Payments API
class payments {
    _api: api

    constructor(apix: api) {
        this._api = apix
    }

    new = async (amount: number, merchant: string) => {
        return await this._api.do("payments", "POST", {amount: amount, merchant: merchant})
    }
    get = async () => {
        return await this._api.do("payments", "GET")
    }
}

//endregion

// region Fetch API
class ufetch {
    _api: api

    constructor(apix: api) {
        this._api = apix
    }

    stats = async () => {
        return await this._api.do("fetch/stats", "GET")
    }

    gdpsTariffs = async () => {
        return await this._api.do("fetch/gd/tariffs", "GET")
    }
    gdpsTop = async (page = 0) => {
        return await this._api.do(`fetch/gd/top?offset=${page}`, "GET")
    }
    gdpsGet = async (srvid: string) => {
        return await this._api.do(`fetch/gd/info/${srvid}`, "GET")
    }

    minecraftGetCores = async () => {
        return await this._api.do("fetch/mc/cores", "GET")
    }

    minecraftGetRegions = async () => {
        return await this._api.do("fetch/mc/regions", "GET")
    }

    minecraftGetPricing = async (region_id: number) => {
        return await this._api.do(`fetch/mc/pricing/${region_id}`, "GET")
    }



    minecraftFetchVersions = async () => {
        let v = await fetch('https://launchermeta.mojang.com/mc/game/version_manifest.json').then(r=>r.json())
        let vers=[]
        v.versions.forEach(e=>{
            e.id.match(/^\d\.\d+[.]*\d$/g)&&vers.push(e.id)
        })
        return vers
    }
}


// endregion

// region Servers API
class servers {
    _api: api

    constructor(apix: api) {
        this._api = apix
    }

    list = async () => {
        return await this._api.do("servers", "GET")
    }
    createGDPS = async (name, tariff, duration, promocode, srvid = "") => {
        return await this._api.do("servers/gd", "POST", {
            name: name, tariff: tariff, duration: duration, promocode: promocode, srvid: srvid
        })
    }

    createMC = async (name, tariff, core, version, add_storage, promocode, dedic_port=false, srvid="", duration="mo") => {
        return await this._api.do("servers/mc", "POST", {
            name: name, tariff: tariff, core: core, version: version, add_storage: add_storage, promocode: promocode,
            dedicated_port: dedic_port, srvid: srvid, duration: duration
        })
    }
    useGDPS = () => {
        return useAtom(serverGDAtom)
    }
}
//endregion

// region GDPS Manage API
class gdps_manage {
    _api: api

    constructor(apix: api) {
        this._api = apix
    }

    delete = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}`, "DELETE")
    }
    get = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}`, "GET")
    }
    dbreset = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}/dbreset`, "GET")
    }
    updateChests = async (srvid, chests) => {
        return await this._api.do(`servers/gd/${srvid}/chests`, "POST", chests)
    }
    getLogs = async (srvid, type, page = 0) => {
        return await this._api.do(`servers/gd/${srvid}/logs`, "POST", {type: type, page: page})
    }
    getMusic = async (srvid, mode, query = "", page = 0) => {
        return await this._api.do(`servers/gd/${srvid}/music`, "POST", {mode: mode, page: page, query: query})
    }
    addMusic = async (srvid, type, url) => {
        return await this._api.do(`servers/gd/${srvid}/music`, "PUT", {type: type, url: url})
    }
    updateLogo = async (srvid, avatar_file) => {
        let datax = new FormData()
        datax.append("profile_pic", avatar_file)
        return await this._api.doForm(`servers/gd/${srvid}/icon`, "POST", datax)
    }
    updateSettings = async (srvid, settings) => {
        return await this._api.do(`servers/gd/${srvid}/settings`, "POST", settings)
    }
    buildlabPush = async (srvid, blab) => {
        return await this._api.do(`servers/gd/${srvid}/buildlab`, "POST", blab)
    }
    fetchBuildStatus = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}/buildlab/status`, "GET")
    }
    moduleDiscord = async (srvid, enable, module) => {
        return await this._api.do(`servers/gd/${srvid}/modules/discord`, "PUT", {...module, enable: enable})
    }
    getRoles = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}/roles`, "GET")
    }
    setRole = async (srvid, role) => {
        return await this._api.do(`servers/gd/${srvid}/roles`, "POST", role)
    }
    searchUsers = async (srvid, keyword) => {
        return await this._api.do(`servers/gd/${srvid}/get/users?user=${encodeURI(keyword)}`, "GET")
    }
    getUserList = async (srvid, page=0) => {
        return await this._api.do(`servers/gd/${srvid}/get/lusers?page=${page}`, "GET")
    }

    searchLevels = async (srvid, keyword) => {
        return await this._api.do(`servers/gd/${srvid}/get/levels?lvl=${encodeURI(keyword)}`, "GET")
    }

    getLevelPacks = async (srvid, isgau=false) => {
        return await this._api.do(`servers/gd/${srvid}/levelpacks?gau=${isgau?"true":"false"}`, "GET")
    }

    editLevelpack = async (srvid, id, data) => {
        return await this._api.do(`servers/gd/${srvid}/levelpack`, "POST", data)
    }

    deleteLevelpack = async (srvid, id) => {
        return await this._api.do(`servers/gd/${srvid}/levelpack/${id}`, "DELETE")
    }

    createLevelpack = async (srvid, data) => {
        return await this._api.do(`servers/gd/${srvid}/levelpack`, "POST", data)
    }

    upgrade22 = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}/upgrade22`, "GET")
    }
}

// endregion

// region GDPS Users API
class gdps_users {
    _api: api

    constructor(apix: api) {
        this._api = apix
    }

    login = async (srvid, uname, password, fcaptcha) => {
        return await this._api.do(`servers/gd/${srvid}/u/login`, "POST", {
            uname: uname,
            password: password,
            fCaptchaToken: fcaptcha,
            hCaptchaToken: ""
        })
    }
    get = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}/u`, "GET")
    }
    forgotPassword = async (srvid, email, fcaptcha) => {
        return await this._api.do(`servers/gd/${srvid}/u/recover`, "POST", {
            fCaptchaToken: fcaptcha, email: email, hCaptchaToken: ""
        })
    }
    updateUsername = async (srvid, uname) => {
        return await this._api.do(`servers/gd/${srvid}/u`, "PUT", {uname: uname, password: "", email: ""})
    }
    updateEmail = async (srvid, email) => {
        return await this._api.do(`servers/gd/${srvid}/u`, "PUT", {uname: "", password: "", email: email})
    }
    updatePassword = async (srvid, password) => {
        return await this._api.do(`servers/gd/${srvid}/u`, "PUT", {uname: "", password: password, email: ""})
    }
    getMusic = async (srvid, mode, query = "", page = 0) => {
        return await this._api.do(`servers/gd/${srvid}/u/music`, "POST", {mode: mode, page: page, query: query})
    }
    addMusic = async (srvid, type, url) => {
        console.log(this._api.authorization)
        return await this._api.do(`servers/gd/${srvid}/u/music`, "PUT", {type: type, url: url})
    }
}
//endregion

// region Particle API
class particles {
    _api: api

    constructor(apix: api) {
        this._api = apix
    }

    search = async (data) => {
        return await this._api.do("particle/search", "POST", data)
    }

    get_particle = async (author, name) => {
        return await this._api.do(`particle/v/${author}/${name}`, "GET")
    }

    get_user = async (reg=false) => {
        return await this._api.do(`particle/user?reg=${reg?"true":"false"}`, "GET")
    }
}
// endregion

export default useFiberAPI
export {serverFiberAPI, useLoader}

export type {api}