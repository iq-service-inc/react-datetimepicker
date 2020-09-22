import querystring from 'querystring'
import fetch from 'isomorphic-fetch'
import { api } from 'Config'

export default function ({
    api = api,
    cmd,
    method = 'GET',
    type = 'json',
    qs = {},
    body = {},
    header = {},
    fileList = false,
    cors = true,
}) {
    method = method.toUpperCase()
    type = type.toLowerCase()

    let option = {
        method,
        headers: {
            'Accept': '*',
            ...header,
        },
        credentials: cors ? 'include' : 'same-origin',
        mode: cors ? 'cors' : 'same-origin'
    }

    if (!isEmpty(qs)) {
        cmd += "?" + querystring.stringify(objectfilter(qs))
    }

    if (method != 'GET') {
        if (fileList) {
            let formData = new FormData()
            formData.append(fileList[0] instanceof File ? 'file' : 'blob', fileList[0], fileList[0].name);
            for (let k in body) {
                formData.append(k, body[k])
            }

            option.body = formData
        } else {
            option.headers['Content-Type'] = 'application/json'
            option.body = JSON.stringify(objectfilter(body))
        }
    }

    /* remove dulplicated slash in path */
    let cleanapi = api.slice(-1) == '/' ? api.slice(0, -1) : api,
        cleancmd = cmd.slice(0, 1) == '/' ? cmd.slice(1) : cmd

    let url = `${cleanapi}/${cleancmd}`,
        tmp_res = {}

    return fetch(url, option)
        .then(res => {
            // let data = res.ok ? (type == 'json' ? res.json() : res.text()) : null;
            let data = type == 'json' ? res.json() : res.text();
            let headers = {}
            for (var pair of res.headers.entries()) {
                headers[pair[0]] = pair[1]
            }
            tmp_res = {
                ok: res.ok,
                status: res.status,
                statusText: res.statusText,
                type: res.type,
                url: res.url,
                redirected: res.redirected,
                bodyUsed: res.bodyUsed,
                headers,
                body: data || {},
            }
            return data
        })
        .then(body => {
            return {
                ...tmp_res,
                body,
            }
        })
        .catch(err => {
            let resp = {
                ok: false,
                url: url,
                body: {
                    message: "ReqCatchError"
                },
                statusText: err,
                status: 500,
            }
            return resp
        })
}



function objectfilter(obj) {
    const whitelist = ["string", "number", "boolean"]
    let ret = {}
    for (let key in obj) {
        switch (true) {
            case whitelist.includes(typeof obj[key]):
                ret[key] = obj[key]
                break

            case Array.isArray(obj[key]):
                let arr = arrayfilter(obj[key])
                ret[key] = arr
                break

            case typeof obj[key] === "object" && isEmpty(obj[key]) === false:
                ret[key] = objectfilter(obj[key])
            default:
        }
    }

    return ret
}

function arrayfilter(arr) {
    const arrwhitelist = ["string", "number", "boolean", "object"]
    return arr.filter(item => arrwhitelist.includes(typeof item)).map(d => {
        if (Array.isArray(d)) return arrayfilter(d)
        if (typeof d === "object")
            return objectfilter(d)
        return d
    })
}

function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}