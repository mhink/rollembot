import fetch from 'node-fetch'

const USER_AGENT = 'nodejs:rollembot:v0.0.1 (by /u/mhink)'

export default class RedditClient {
  constructor(credentials) {
    this.uname          = credentials.REDDIT_USERNAME
    this.pass           = credentials.REDDIT_PASSWORD
    this.clientId       = credentials.REDDIT_CLIENT_ID
    this.clientSecret   = credentials.REDDIT_CLIENT_SECRET

    this.token = null
  }

  searchSubreddit(subreddit, term) {
    return new Promise((resolve, reject) => {
      this.fetchAuthenticated(`/r/${subreddit}/search?q=${term}&restrict_sr=true`, {
        method: "GET",
      })
      .catch(reject)
      .then(json => {
        if(json.kind !== 'Listing') {
          reject("Response from Search API didn't return a Listing type")
        } else if(json.data.children.length <= 0) {
          reject(`0 hits for search term ${term}`)
        } else {
          const searchItems = json.data.children
          resolve(json.data.children)
        }
      })
    })
  }

  fetchAuthenticated(path, options) {
    return new Promise((resolve, reject) => {
      if(this.token) {
        this.fetchWithToken(path, options)
          .then(resolve)
          .catch(reject)
      }
      else {
        this.fetchToken()
          .then(this.fetchWithToken.bind(this, path, options))
          .then(resolve)
          .catch(reject)
      }
    })
  }

  fetchWithToken (path, options) {
    const url = "https://oauth.reddit.com" + path

    const fetchOpts = {}
    if(options) {
      Object.assign(fetchOpts, options)
    }

    const clientHeaders = {
      'User-Agent':     USER_AGENT,
      'Authorization':  "bearer " + this.token,
    }

    if(fetchOpts.headers) {
      Object.assign(fetchOpts.headers, clientHeaders)
    }
    else {
      fetchOpts.headers = clientHeaders
    }

    return new Promise((resolve, reject) => {
      fetch(url, fetchOpts)
        .then(response => {
          response.json()
            .then(data => response.ok ? resolve(data) : reject(data))
            .catch(reject)
        })
      })
  }

  fetchToken () {
    const url = "https://www.reddit.com/api/v1/access_token"
    const headers = {
      'User-Agent':     USER_AGENT,
      'Authorization':  this._basicAuth(),
    }
    const body = `grant_type=password&username=${this.uname}&password=${this.pass}`

    return new Promise((resolve, reject) => {
      fetch(url, { method: "POST", headers, body})
        .then(response => {
          response.json()
            .then(data => {
              if(response.ok) {
                this.token = data.access_token
                resolve(this.token)
              }
              else {
                reject(data)
              }
            })
            .catch(reject)
        })
    })
  }

  _tokenAuth () {
  }

  _basicAuth () {
    const creds = this.clientId + ":" + this.clientSecret
    const credsBuffer = Buffer(creds, 'binary')
    return "Basic " + credsBuffer.toString('base64')
  }
}
