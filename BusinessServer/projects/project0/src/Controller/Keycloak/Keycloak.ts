import axios from "axios"
import qs from "qs"
import { opt, baseConfig } from "./Options"
import http from "http"

function nativeRequest(options: any, postData: any) {
  var req = http.request(options, function (res) {
    var chunks: any = []

    res.on("data", function (chunk) {
      console.log(chunk)
      chunks.push(chunk)
    })

    res.on("end", function (chunk: any) {
      var body = Buffer.concat(chunks)
      console.log(body.toString())
      return body.toString()
    })

    res.on("error", function (error) {
      console.error(error)
    })
  })
  req.write(postData)
  var x = req.end()
  return x
}

async function axiosRequest(config: object): Promise<any> {
  try {
    return { status: 1, data: (await axios(config)).data }
  } catch (e) {
    return { status: -1, data: e }
  }
}

export async function requestClientToken(email: string, pw: string) {
  var config = JSON.parse(JSON.stringify(baseConfig))
  config.method = "post"
  config.url += "/realms/master/protocol/openid-connect/token"
  config.data = qs.stringify({
    username: email,
    password: pw,
    grant_type: "password",
    client_id: "login_api",
  })
  return await axiosRequest(config)
}

export async function requestAdminToken() {
  var config = JSON.parse(JSON.stringify(baseConfig))
  config.method = "post"
  config.url += "/realms/master/protocol/openid-connect/token"
  config.data = qs.stringify({
    username: opt.adminID,
    password: opt.adminPW,
    grant_type: "password",
    client_id: "login_api",
  })
  var x = await axiosRequest(config)
  return x.data.access_token
}

export async function hasUserName(courseName: string, userName: string) {
  var result = await getUsersAt(courseName)
  if (result.status == -1) return result
  else {
    var users = result.data
    var data = { hasUser: false, userName: "", userId: "" }
    for (var i = 0; i < users.length; i++) {
      var user = users[i]
      var x = user.username
      if (x == userName) {
        data.hasUser = true
        data.userName = user.username
        data.userId = user.id
      }
    }
    return { status: 1, data: data }
  }
}

export async function getUsersAt(coursName: string) {
  var token = await requestAdminToken()
  var config = JSON.parse(JSON.stringify(baseConfig))
  config.method = "get"
  config.url += `/admin/realms/${coursName}/users`
  config.headers = {
    Authorization: `Bearer ${token}`,
  }
  return axiosRequest(config)
}

// export async function deleteUserByUsername(courseName: string, userName: string) {
//   if (userName == "admin") {
//     return "can't delete admin"
//   }
//   var x = await hasUserName(courseName, userName)
//   if (x.userName == userName) {
//     var xx = await deleteUserById(courseName, x.userId)
//     console.log(xx)
//     return "user deletion done"
//   } else {
//     return "no user exists"
//   }
// }

// async function deleteUserById(courseName: string, userId: string) {
//   var token = await requestAdminToken()
//   var config = {
//     method: "delete",
//     url: `http://52.53.210.87:8080/auth/admin/realms/${courseName}/users/${userId}`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
//   return axiosRequest(config)
// }

export async function createUser(userName: string, userPw: string): Promise<any> {
  var courseName: string = "master"
  var token = await requestAdminToken()
  var x = await hasUserName(courseName, userName)
  if (x.data.hasUser) return { status: -1, data: "user already exists" }

  var options = {
    method: "POST",
    hostname: "52.53.210.87",
    port: "8080",
    path: `/auth/admin/realms/${courseName}/users`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    maxRedirects: 20,
  }

  var data = JSON.stringify({
    createdTimestamp: 1588880747548,
    username: userName,
    credentials: [
      {
        type: "password",
        value: userPw,
        temporary: false,
      },
    ],
    enabled: true,
    totp: false,
    firstName: "",
    lastName: "",
    email: "",
    disableableCredentialTypes: [],
    requiredActions: [],
    notBefore: 0,
  })

  var result: any = nativeRequest(options, data)

  var x = await hasUserName(courseName, userName)
  if (x.data.hasUser) return { status: 1, data: "user has been crated" }
  else return { status: -1, data: "sth wrong" }
}
