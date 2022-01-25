import Swal from 'sweetalert2'
import { API } from './constants'

export const GET = async url => {
  try {
    const token = JSON.parse(localStorage.getItem('state'))?.token
    const response = await fetch(API + url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : null,
      },
    })
    const json = await response.json()
    if (response.status === 200) {
      return {
        data: json.data,
        error: [],
      }
    } else {
      return {
        data: null,
        error: ['Error load data'],
      }
    }
  } catch (error) {
    return {
      data: null,
      error: ['Unexpected error consult an administrator'],
    }
  }
}

export const POST = async (url, body) => {
  try {
    const token = JSON.parse(localStorage.getItem('state'))?.token
    const response = await fetch(API + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : null,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const json = await response.json()

    if (json.data)
      return {
        data: json.data,
        error: null,
      }
    else if (json.errors)
      return {
        data: null,
        error: json.errors,
      }
    else if (json.error)
      return {
        data: null,
        error: json.error,
      }
    else {
      Swal.fire({
        title: `Error ${response.status}`,
        text: 'Unexpected error consult an administrator',
        icon: 'error',
        confirmButtonText: 'Close',
      })
      return {
        data: null,
        error: `${response.status}`,
      }
    }
  } catch (err) {
    return {
      data: null,
      error: err,
    }
  }
}

export const POSTFile = async (url, body) => {
  try {
    const token = JSON.parse(localStorage.getItem('state'))?.token
    const response = await fetch(API + url, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : null,
      },
      body: body ? body : undefined,
    })

    const json = await response.json()
    if (json.data)
      return {
        data: json.data,
        error: null,
      }
    else if (json.errors) {
      return {
        data: null,
        error: json.errors,
      }
    } else
      return {
        data: null,
        error: json.error,
      }
  } catch (err) {
    return {
      data: null,
      error: err,
    }
  }
}

export const PUT = async (url, body) => {
  try {
    const token = JSON.parse(localStorage.getItem('state'))?.token
    const response = await fetch(API + url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : null,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const json = await response.json()
    if (json.data)
      return {
        data: json.data,
        error: null,
      }
    else if (json.errors)
      return {
        data: null,
        error: json.errors,
      }
    else if (json.error)
      return {
        data: null,
        error: json.error,
      }
    else {
      Swal.fire({
        title: `Error ${response.status}`,
        text: 'Unexpected error consult an administrator',
        icon: 'error',
        confirmButtonText: 'Close',
      })
      return {
        data: null,
        error: `${response.status}`,
      }
    }
  } catch (err) {
    return {
      data: null,
      error: err,
    }
  }
}
