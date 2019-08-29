const { createStore } = Redux;

const initialState = {
  currentCrewMembers: [],
  walkedCount: 0
}

const crewReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_CREW_MEMBER:
      const newCrewMembers = state.currentCrewMembers.concat(action.name)
      return Object.assign({}, state, { currentCrewMembers: newCrewMembers })
    case INCREMENT_WALKED_COUNT:
      const newWalkedCount = state.walkedCount + 1
      return Object.assign({}, state, { walkedCount: newWalkedCount })
    default:
      return state
  }
}

const ADD_CREW_MEMBER = 'ADD_CREW_MEMBER'

const addNewCrewMember = (newCrewMember) => {
  return {
    type: ADD_CREW_MEMBER,
    name: newCrewMember.name
  }
}

const INCREMENT_WALKED_COUNT = 'INCREMENT_WALKED_COUNT'

const incrementWalkedCount = () => {
  return {
    type: INCREMENT_WALKED_COUNT
  }
}

const newPirateForm = document.getElementById('new-pirate-form')
const walkThePlankButton = document.getElementById('walk-the-plank')

newPirateForm.addEventListener('submit', () => {
  event.preventDefault()
  const crewMemberName = document.getElementById('name').value
  document.getElementById('name').value = ''
  const newCrewMember = { name: crewMemberName }
  store.dispatch(addNewCrewMember(newCrewMember))
})

walkThePlankButton.addEventListener('click', () => {
  event.preventDefault()
  if (store.getState().currentCrewMembers.length == 0) {
    window.alert('Add more members to the crew to make them walk the plank, laddy!')
    return
  }
  const walkedCrewMembers = document.getElementById('walked-crew')
  const walkedCrewMember = store.getState().currentCrewMembers.shift()
  walkedCrewMembers.innerHTML += `<li>${walkedCrewMember}</li>`
  store.dispatch(incrementWalkedCount())
  document.getElementById('plank-walkers').innerHTML = store.getState().walkedCount
})

const render = () => {
  let newCrewList = ''
  const crewPageList = document.getElementById('current-crew')
  store.getState().currentCrewMembers.forEach(name => {
    newCrewList += `<li>${name}</li>`
  })
  crewPageList.innerHTML = newCrewList
}

const store = createStore(crewReducer)

render()
store.subscribe(render)
