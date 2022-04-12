const baseUrl:string = "http://localhost:8080";

export function getPosts() {
  return fetch(baseUrl + "/posts").then(res => res.json())
}

export function addPost(post:any) {
  return fetch(baseUrl + "/posts", {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      value: post
    })
  }).then(data => {
    return data
  })
}

export function updatePost(post:any) {
  return fetch(baseUrl + "/posts/" + post.id, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      value: post
    })
  }).then(data => {
    return data
  })
}

export function deletePost(id:number) {
  return fetch(baseUrl + "/posts/" + id, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json'},
  }).then(data => {
    return data
  })
}