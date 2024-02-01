import { api } from "../config"

const httpMethods = {
  GET: "GET",
  POST: "POST"
}

async function makeApiRequest({ uri, method, body } = requestConfig) {
  return fetch(
    uri,
    {
      method: method,
      headers: { "Content-Type": "application/json" },
      body
    }
  )
}

export async function getAnimation(id) {
  const response = await makeApiRequest({ uri: `${api.baseUrl}/${id}`, method: httpMethods.GET })
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