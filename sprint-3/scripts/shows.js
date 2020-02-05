 
// let data = [{
//     date: `Mon Dec 17 2018`,
//     venue: `Ronald Lane`,
//     location: `San Francisco, CA`
//   },
//   {
//     date: `Tue Jul 18 2019`,
//     venue: `Pier 3 East`,
//     location: `San Francisco, CA`  
//   },
//   {
//     date: `Fri Jul 22 2019`,
//     venue: `View Loungue`,
//     location: `San Francisco, CA`  
//   },
//   {
//     date: `Sat Aug 12 2019`,
//     venue: `Hyatt Agency`,
//     location: `San Francisco, CA`  
//   },
//   {
//     date: `Fri Sep 05 2019`,
//     venue: `Moscow Center`,
//     location: `San Francisco, CA`  
//   },
//   {
//     date: `Wed Aug 11 2019`,
//     venue: `Pres Club`,
//     location: `San Francisco, CA`  
//   }];

  // CONSTANT VARIABLES
  const API_KEY = '?api_key=1137952d-6747-4954-94c3-ea4214c7d6a8';
  const API_LINK = 'https://project-1-api.herokuapp.com/';
  const ROUTE = 'showdates';
  // FUNCTIONS
  const main = () => retrieveShows();
  const createTable = data => {
    let targetDiv = document.querySelector('.rows-container');
    let parent = document.createElement('div');
    data.forEach(item=>{
      let keys = Object.keys(item); // fetch all keys and put it in an array
      let values = Object.values(item); // fetch all values and put it in an array
      let row = document.createElement('div');
      row.classList.add('table__row');
      
      for (let i = 1; i < keys.length; i++){ // i starts at 1 to ignore id property
        let p1 = document.createElement('p'); // table header
        let p2 = document.createElement('p'); // table data
        p1.classList.add('table__header');
        p1.innerText = keys[i];
        p2.innerText = values[i];
        row.appendChild(p1);
        row.appendChild(p2);
      }
      
      let button = document.createElement('button');
      button.classList.add('btn');
      button.innerText = 'Buy Ticket';
      row.appendChild(button);
      parent.appendChild(row);
    })
    targetDiv.appendChild(parent);
  }
 
  const retrieveShows = () => {
    axios.get(`${API_LINK + ROUTE + API_KEY}`)
      .then(res=>createTable(res.data))
      .catch(err=>console.log('failed to fetch shows'))
  }
  // MAIN FLOW STARTS HERE
  main(); 


  