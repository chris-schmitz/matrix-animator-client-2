import {api} from "../config"

const httpMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

async function makeApiRequest({uri, method, body} = requestConfig) {
    return fetch(
        uri,
        {
            method: method,
            headers: {"Content-Type": "application/json"},
            body
        }
    )
}

export async function getAnimation(id) {
    const response = await makeApiRequest({uri: `${api.baseUrl}/${id}`, method: httpMethods.GET})
    return response.json()
}

export async function getAnimationList() {
    const response = await makeApiRequest({
        uri: api.baseUrl,
        method: httpMethods.GET
    })
    return response.json()
}

export async function saveAnimation(animationRequestPayload) {
    const response = await makeApiRequest({
        uri: api.baseUrl,
        method: httpMethods.POST,
        body: JSON.stringify(animationRequestPayload)
    })
    return await response.text()
}

export async function updateAnimation(animationRequestPayload) {
    const response = await makeApiRequest({
        uri: api.baseUrl + `/${animationRequestPayload.id}`,
        method: httpMethods.PUT,
        body: JSON.stringify(animationRequestPayload)
    })
    return await response.text()
}

export async function deleteAnimation(animationId) {
    const response = await makeApiRequest({
        uri: api.baseUrl + `/${animationId}`,
        method: httpMethods.DELETE
    })
    if (response.status.toString()[0] !== "2") {
        throw new Error("There was an error when trying to delete the animation")
    }
}
