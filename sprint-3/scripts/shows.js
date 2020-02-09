  // ************************************************************
  // ***                  GLOBAL VARIABLES                    ***
  // ************************************************************
  const API_KEY = '?api_key=1137952d-6747-4954-94c3-ea4214c7d6a8';
  const API_LINK = 'https://project-1-api.herokuapp.com/';
  const ROUTE = 'showdates';
  const ROWS_CONTAINER = document.querySelector('.rows-container');


  // ************************************************************
  // ***                    Components                        ***
  // ************************************************************
  class Shows {
    constructor(shows){ 
      this.shows = shows
     }
    render(){return`
    <div> 
      ${(this.shows.map(show => new Show(show).render())).join(" ")}
    </div>
    `};
  }

  class Show {
    constructor(show){
      this.date = show.date;
      this.place = show.place;
      this.location = show.location;
    }
    render(){return `
    <div class="table__row"> 
      <p class="table__header"> Date </p>
      <p> ${this.date} </p>
      <p class="table__header"> Venue </p>
      <p> ${this.place} </p>
      <p class="table__header"> Location </p>
      <p> ${this.location} </p>
      <button class="btn">Buy Ticket</button>
    </div>
    `}
  }


  // ************************************************************
  // ***                  API HELPER FUNCTIONS                ***
  // ************************************************************
  const retrieveShows = () => {
    axios.get(`${API_LINK + ROUTE + API_KEY}`)
      .then(res=>ROWS_CONTAINER.innerHTML = new Shows(res.data).render())
      .catch(err=>console.log('failed to fetch shows'))
  }


  // ************************************************************
  // ***        Initial function calls on page load           ***
  // ************************************************************
  retrieveShows();


  