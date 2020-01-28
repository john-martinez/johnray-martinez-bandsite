let data = [{
    date: `Mon Dec 17 2018`,
    venue: `Ronald Lane`,
    location: `San Francisco, CA`
  },
  {
    date: `Tue Jul 18 2019`,
    venue: `Pier 3 East`,
    location: `San Francisco, CA`  
  },
  {
    date: `Fri Jul 22 2019`,
    venue: `View Loungue`,
    location: `San Francisco, CA`  
  },
  {
    date: `Sat Aug 12 2019`,
    venue: `Hyatt Agency`,
    location: `San Francisco, CA`  
  },
  {
    date: `Fri Sep 05 2019`,
    venue: `Moscow Center`,
    location: `San Francisco, CA`  
  },
  {
    date: `Wed Aug 11 2019`,
    venue: `Pres Club`,
    location: `San Francisco, CA`  
  }];

  function createRow(item){
    let keys = Object.keys(item); // fetch all keys and put it in an array
    let values = Object.values(item); // fetch all values and put it in an array
    let parent = document.querySelector('.table');
    let row = document.createElement('div');
    row.classList.add('table__row');
    
    for (let i = 0; i < keys.length; i++){
      let span = document.createElement('span');
      let p = document.createElement('p');
      span.classList.add('table__row__header');
      span.innerText = keys[i];
      p.innerText = values[i];
      row.appendChild(span);
      row.appendChild(p);
    }
    
    let button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = 'Buy Ticket';
    row.appendChild(button);
    parent.appendChild(row);
  }
  
  
  // MAIN FLOW STARTS HERE
  data.forEach(function (item){
    createRow(item);
});