export const Router = {
  auth: {
    login: '/login',
    recover: '/recover/password',
    reset: '/user/password-reset/:token',
    verify: '/user/verify/:token',
  },
  home: '/',
  register: '/register',
  complete: '/register/complete',
  nickname: '/register/nickname',
  location: '/register/location',
  relationship: '/register/relationship',
  questions: '/register/questions',
  bio: '/register/bio',
  picture: '/register/picture',
  spouse: '/register/spouse',
  candidates: '/candidates',
  Candidate: '/candidates/:id',
  obgyn: '/register/obgyn',
  credit_report: '/register/credit_report',
  done: '/register/done',
  surrogate: {
    profile: '/profile',
  },
  gopro: '/gopro',
}

export const goPage = (direction, history, route) => {
  const location = history.location.pathname
  const type_id = JSON.parse(localStorage.getItem('state'))?.user?.profile?.type_id || null

  if (direction === 'next') {
    if (route) history.push(route)
    else if (location === Router.complete) history.push(Router.nickname)
    else if (location === Router.nickname) history.push(Router.location)
    else if (location === Router.location) history.push(Router.relationship)
    else if (location === Router.relationship) history.push(Router.questions, { direction: 'next' })
    else if (location === Router.questions) history.push(Router.bio)
    else if (location === Router.bio) {
      if (type_id === 1) history.push(Router.picture)
      else history.push(Router.obgyn)
    } else if (location === Router.obgyn) history.push(Router.credit_report)
    else if (location === Router.credit_report) history.push(Router.picture)
    else if (location === Router.picture) {
      if (type_id === 1) history.push(Router.spouse)
      // else history.push(Router.obgyn);
    }
  } else {
    if (location === Router.location) history.push(Router.nickname)
    if (location === Router.relationship) history.push(Router.location)
    if (location === Router.questions) history.push(Router.relationship)
    if (location === Router.bio) history.push(Router.questions, { direction: 'back' })
    if (location === Router.obgyn) history.push(Router.bio)
    if (location === Router.credit_report) history.push(Router.obgyn)
    if (location === Router.picture) {
      if (type_id === 1) history.push(Router.bio)
      else history.push(Router.credit_report)
    }
  }
}

export const redirect = (step, history) => {
  if (step === 'nickname') history.push(Router.nickname)
  else if (step === 'location') history.push(Router.location)
  else if (step === 'relationship') history.push(Router.relationship)
  else if (step === 'questions') history.push(Router.questions)
  else if (step === 'bio') history.push(Router.bio)
  else if (step === 'profile_picture') history.push(Router.picture)
  else if (step === 'spouse_check') history.push(Router.spouse)
  else if (step === 'spouse') history.push(Router.spouse)
  else if (step === 'obgyn_letter') history.push(Router.obgyn)
  else if (step === 'credit_report') history.push(Router.credit_report)
  else if (step === 'done') {
    const router = history.location.pathname.split('/')
    if (router[1] && router[1] === 'candidates' && router[2]) {
      history.push(history.location.pathname)
    } else {
      history.push(Router.candidates)
    }
  }
}
