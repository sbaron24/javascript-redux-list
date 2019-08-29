const { createStore } = Redux;

const initialState = {
  pups: [
    {
      rating: '5',
      url: 'https://media.giphy.com/media/O3iWjzootMuQw/giphy.gif'
    }
  ]
}

// Reducer

const gifReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PUP:
      const newPups = state.pups.concat(action.newPup)
      debugger
      return Object.assign({}, state, {
        pups: newPups
      })
    default:
      return state
  }
}

// JS to access new pup form

const newPupForm = document.getElementById('new-pup-form')

// Declare action type

const ADD_PUP = 'ADD_PUP'

// Declare action creator

const addNewPup = (newPup) => {
  return (
    {
      type: ADD_PUP,
      newPup: newPup
    }
  )
}

// Submits form and dispatches add action

newPupForm.addEventListener('submit', () => {
  event.preventDefault();
  const gifUrl = document.getElementById('gif-url').value
  const gifRating = document.getElementById('gif-rating').value
  document.getElementById('gif-url').value = ''
  document.getElementById('gif-rating').value = ''
  const newPup = { url: gifUrl, rating: gifRating }
  store.dispatch(addNewPup(newPup))
})

// Sets up store
const store = createStore(gifReducer);

// Renders list of gifs to page
const gifList = document.getElementById('gif-list')

const render = () => {
  const pup = store.getState().pups.slice(-1)[0]
  let pupNode = document.createElement('li')
  let pupImg = document.createElement('img')
  pupImg['src'] = pup.url
  pupNode.innerHTML = pup.rating
  pupNode.appendChild(pupImg)
  gifList.appendChild(pupNode)
}

render()
store.subscribe(render)
