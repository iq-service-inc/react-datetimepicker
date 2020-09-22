import querystring from 'querystring'
import fetch from 'isomorphic-fetch'
import { api } from 'Config'

export default function ({
    api = api,
    cmd,
    method = 'GET',
    type = 'json',
    data = {},
    header = {},
    fileList = false,
    cors = true,
}) {

    method = method.toUpperCase()
    type = type.toLowerCase()

    let option = {
        method,
        headers: {
            'Accept': 'application/javascript',
            ...header,
        },
        credentials: cors ? 'include' : 'same-origin'
    },
        dataStr = querystring.stringify(data)

    if (method == 'GET' || method == 'PATCH') {
        cmd += "?" + dataStr
    }
    else if (method == 'DELETE') {
        option.body = dataStr
    }
    else {
        let formData = new FormData()
        if (fileList) {
            formData.append('file', fileList[0], fileList[0].name);
            for (let k in data)
                formData.append(k, data[k])
        }

        option.body = fileList ? formData : dataStr

        if (!fileList)
            option.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    let url = cmd,
        tmp_res = {}

    return fetch(url, option)
        .then(res => {
            let data = res.ok ? (type == 'json' ? res.json() : res.text()) : null;
            tmp_res = {
                ok: res.ok,
                status: res.status,
                statusText: res.statusText,
                type: res.type,
                url: res.url,
                redirected: res.redirected,
                bodyUsed: res.bodyUsed,
                headers: res.headers,
                body: data,
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
                body: null,
                statusText: err,
                status: null,
            }
            return resp
        })
}
