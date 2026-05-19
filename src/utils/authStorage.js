const registeredUsersKey = 'registeredUsers'
const sessionUserKey = 'jwt_token'

const demoUser = {
  username: 'Ram',
  password: 'Ram@21',
}

const readJsonFromStorage = key => {
  try {
    const rawValue = localStorage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : []
  } catch (error) {
    return []
  }
}

export const getRegisteredUsers = () => readJsonFromStorage(registeredUsersKey)

export const getStoredUser = username =>
  [demoUser, ...getRegisteredUsers()].find(
    user => user.username === username,
  ) ?? null

export const authenticateUser = (username, password) => {
  const matchedUser = getStoredUser(username)
  return matchedUser !== null && matchedUser.password === password
}

export const registerUser = userDetails => {
  const existingUsers = getRegisteredUsers()
  const userAlreadyExists = [demoUser, ...existingUsers].some(
    user => user.username === userDetails.username,
  )

  if (userAlreadyExists) {
    return {
      success: false,
      message: 'Username already exists',
    }
  }

  const updatedUsers = [...existingUsers, userDetails]
  localStorage.setItem(registeredUsersKey, JSON.stringify(updatedUsers))

  return {
    success: true,
    message: 'Signup successful',
  }
}

export const createSessionForUser = username => {
  localStorage.setItem(sessionUserKey, `${username}_session`)
}
