export async function getAnimation(id) {

}

export async function getAnimationList() {

}

export async function saveAnimation(animationRequestPayload) {
  const response = await fetch("http://localhost:8080/rest/animations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(animationRequestPayload)
  })
  const content = await response.text()
  return content
}