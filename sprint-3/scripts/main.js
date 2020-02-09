  // ************************************************************
  // ***                  GLOBAL VARIABLES                    ***
  // ************************************************************
    const API_KEY = '?api_key=1137952d-6747-4954-94c3-ea4214c7d4sa';
    const API_LINK = 'https://project-1-api.herokuapp.com/';
    const ROUTE = 'comments';
    const DELETE_MODAL = document.querySelector('#delete-modal');
    const MODAL_INPUT = DELETE_MODAL.children[0].children[2].children[0];
    let toDeleteId = "";

  
  // ************************************************************
  // ***                    Components                        ***
  // ************************************************************
  class Comment {
    constructor(item){
      this.id = item.id;
      this.name = item.name;
      this.timestamp = item.timestamp;
      this.comment = item.comment;
      this.likes = item.likes;
    }
    render() {
      return `
      <div class="comment" id="${this.id}"> 
        <div class="comment__left"> 
          <div class="comment__image"> </div>
        </div>
        <div class="comment__right"> 
          <div class="comment__header>
            <span class="comment__author> ${this.name} </span>
            <span class="comment__time-stamp"> ${dynamicTimeStamp(this.timestamp)} </span>
            <div class="comment__blurb"> 
              <p> ${this.comment} </p>
            </div>
            <div class="comment__actions"> 
              <div class="comment__likes-container">
                <span class="comment__like-button"> 👍 </span> 
                <span class="comment__likes"> ${this.likes} </span>
              </div>
              <span class="comment__delete-button"> 🗑️ </span>
            </div>
          </div>
        </div>
      </div>
      ` 
    }
  }

  class Comments {
    constructor(comments){ this.comments = comments }
    render() {
      return `
      <div class="comments"> 
        ${(this.comments.map(item=> new Comment(item).render())).join(" ")}
      </div>
      `
    }
  }

  // ************************************************************
  // ***                 Utility Functions                    ***
  // ************************************************************
  const clearComments = target => target.removeChild(target.firstElementChild);
  const dynamicTimeStamp = timestamp => {
    const time = [  
    { unit: 'sec', divider: 60 },
    { unit: 'min', divider: 60 },
    { unit: 'hr',  divider: 24 },
    { unit: 'day', divider: 7  },
    { unit: 'wk',  divider: 4  },
    { unit: 'mo',  divider: 12 }];
    let toConvert = timestamp;
    let rightNow = Date.now();
    let res = rightNow - toConvert; // get the difference of the two dates in milliseconds
    res /= 1000; // convert milliseconds to seconds

    if (res >= 1){
      for(let i = 0; i < time.length; i++){
        // this block triggers if timestamp is more than or equal to 4 weeks
        if (i == time.length-1){ 
          // convert year to months (1year = 12 months) and add the rest of the months to the result
          // add toConvert month and rightNow month to their respective results

          let rightNowMonths = (new Date(rightNow).getFullYear()*12) + (new Date(rightNow).getMonth()+1); 
          let toConvertMonths = (new Date(toConvert).getFullYear()*12) + (new Date(toConvert).getMonth()+1);
          // subtract the results and you will get the results in months format
          res = rightNowMonths - toConvertMonths; 
          if (res >= 12) return `${Math.floor(res/12)} yr${(Math.floor(res/12)>=2)?'s':''} ago`;
          else return `${res} mon${res!= 1?'s':''} ago`;
        }
        else  {
          // cycle through the time array and divide res by time[i].divider
          // ${<unit>!= 1?'s':''}  <--- ternary operator to add 's' if the res is > 1
          if (Math.round(res) < time[i].divider) return `${Math.round(res)} ${time[i].unit}${Math.round(res)>= 2?'s':''} ago`; 
          else res /= time[i].divider;
        }
      }
    } else return `Just now`;
  } 


  const invalidInput = target => {
    target.classList.add('shake');
    target.classList.add('wrong-input')
    setTimeout(()=>target.classList.remove('shake'),200);
  }
  // ************************************************************
  // ***                  EVENT LISTENERS                     ***
  // ************************************************************
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault(); // stops the browser from refreshing
    if (e.target.name.value.trim() !== '' && e.target.comment.value.trim() !== '') {
      e.target.name.classList.remove('wrong-input');
      e.target.comment.classList.remove('wrong-input');
      postComments(e.target); 
    }
    else {
      if (e.target.comment.value.trim() === '' ) {
        invalidInput(e.target.comment);
        e.target.comment.value = "";
        e.target.comment.focus();
      }
      if (e.target.name.value.trim() === '' ){
        invalidInput(e.target.name);
        e.target.name.value = "";
        e.target.name.focus();
      } 
    }
  });

  // ACTIONS BAR EVENTS (LIKE / DELETE)
  document.querySelector('body').addEventListener('click', e =>{
    let target = e.target;

    if (target.classList[0] == 'comment__likes-container' || target.classList[0] == 'comment__like-button' || target.classList[0] === 'comment__likes'){
      // because event bubbling doesnt work, work around is to assign target.parentNode to target to get ID from parent
      if (target.classList[0] === 'comment__like-button' || target.classList[0] === 'comment__likes') target = target.parentNode; 
      target.children[1].innerText = parseInt(target.children[1].innerText) + 1; // increment likes on click
      // fetch the damn thing with ID
      axios.get(`${API_LINK + ROUTE + API_KEY}`)
      .then(res=>{
        let returnedObj = res.data.find(item=>item.id === target.parentNode.parentNode.parentNode.parentNode.id); // get the object with the ID
        returnedObj.likes = target.innerText;
        return returnedObj;
      })
      .then (res=>incrementLike(target.parentNode.parentNode.parentNode.parentNode.id,res))
      .catch(err=>console.log(err));
    }
    else if (target.classList[0] == 'comment__delete-button'){
      // change display: block to DELETE_MODAL on click of any delete button
      let deleteInput = DELETE_MODAL.children[0].children[2].children[0];
      deleteInput.value = "";
      DELETE_MODAL.classList.remove('invisible');
      deleteInput.focus(); 
      toDeleteId = target.parentNode.parentNode.parentNode.parentNode.id;
    }

    else if (target.id == 'modal-delete-button') {
      if (MODAL_INPUT.value && MODAL_INPUT.value.trim().toUpperCase() == 'DELETE') {
        deleteComment(toDeleteId); // button < comment__actions < comment__right < comment.id
        teDeleteId = "";
        DELETE_MODAL.classList.add('invisible');
      }
      else invalidInput(MODAL_INPUT);
      MODAL_INPUT.value = "" // clear 
    }

    // EVENT to hide modal when clicking the backdrop
    if (target.id === 'delete-modal' || target.classList[0] === 'modal__exit-button') { 
      DELETE_MODAL.classList.add('invisible');
      MODAL_INPUT.classList.remove('wrong-input');
    }
  });


  // ************************************************************
  // ***                  API HELPER FUNCTIONS                ***
  // ************************************************************

  // GET request to retrieve data from API then render on page
  const retrieveComments = () => {
    axios.get(`${API_LINK + ROUTE + API_KEY}`)
    .then(res=>{
      // sort res.data then call display function and pass the sorted array as a parameter
      const targetDiv = document.querySelector('.comments-container');
      const comments = new Comments(res.data.sort((a,b)=>b.timestamp - a.timestamp));
      targetDiv.innerHTML = comments.render();
    })
    .catch(err=>console.log(err));
  }

  //  helper function for onsubmit event for POST functionality
  const postComments = (data) => {
    axios.post(`${API_LINK + ROUTE + API_KEY}`,
    {
      name: data.name.value.trim(),
      comment: data.comment.value.trim()
    })
    .then(res=>{
      console.log(res.data);
      data.name.value = "";
      data.comment.value = "";
      clearComments(document.querySelector('.comments-container')); // remove pre-existing comments
      retrieveComments();
    })
    .catch(err=>console.log('Failed to insert comment'))
  }

  // helper function for onclick event for DELETE functionality
  const deleteComment = id => {
    axios.delete(`${API_LINK + ROUTE + '/' + id + API_KEY}`)
    .then(res=>{
      clearComments(document.querySelector('.comments-container')); // remove pre-existing comments
      retrieveComments();
      console.log('DELETED: ', res.data);
    })
    .catch(err=>console.log('failed to delete', err))
  }

  // helper function for onclick event for LIKE functionality
  const incrementLike = (id, authorDetails) => {
    console.log(authorDetails);
    axios.put(`${API_LINK + ROUTE + '/' + id + '/like' + API_KEY}`, authorDetails)
    .then(res=>{ console.log('SUCCESS')})
    .catch(err=>console.log('WRONG'));
  }

  // ************************************************************
  // ***        Initial function calls on page load           ***
  // ************************************************************
  retrieveComments(); 