var data = [{
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
    var keys = Object.keys(item); // fetch all keys and put it in an array
    var values = Object.values(item); // fetch all values and put it in an array
    var parent = document.querySelector('.table');
    var row = document.createElement('div');
    row.classList.add('row');
    
    for (var i = 0; i < keys.length; i++){
      var span = document.createElement('span');
      var p = document.createElement('p');
      span.classList.add('row__header');
      span.innerText = keys[i];
      p.innerText = values[i];
      row.appendChild(span);
      row.appendChild(p);
    }
    
    var button = document.createElement('button');
    button.innerText = 'Buy Ticket';
    row.appendChild(button);
    parent.appendChild(row);
  }
  
  
  data.forEach(function (item){
    createRow(item);
});