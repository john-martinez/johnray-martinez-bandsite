  // DATA SET  
  // const comments = [{
  //   name: 'Michael Lyons',
  //   timeStamp: '12/18/2018',
  //   comment:'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.'
  // }, 
  // {
  //   name: 'Gary Wong',
  //   timeStamp: '12/12/2018',
  //   comment: 'Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!'
  // },
  // {
  //   name: 'Theodore Duncan',
  //   timeStamp: '11/15/2018',
  //   comment: 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!'
  // }];

  // CONSTANT VARIABLES
    const API_KEY = '?api_key=1137952d-6747-4954-94c3-ea4214c7d4sa';
    const API_LINK = 'https://project-1-api.herokuapp.com/';
    const ROUTE = 'comments';

  // FUNCTIONS
  const main = () => {  
    retrieveComments(); // populate 
  }

  const clearComments = target => target.removeChild(target.firstElementChild);

  const displayComment = comments => {
    let targetDiv = document.querySelector('.comments-container');
    let parent = document.createElement('div');
    parent.classList.add('comments');
    comments.forEach(item => {
      // left side of comment row
      let comment = document.createElement('div');
      comment.classList.add('comment');
      comment.setAttribute('id',item.id);
      let commentLeft = document.createElement('div');
      commentLeft.classList.add('comment__left');
      let commentImage = document.createElement('div');
      commentImage.classList.add('comment__image');
      commentLeft.appendChild(commentImage);
      comment.appendChild(commentLeft);
      
      // right side of comment row
      let commentRight = document.createElement('div');
      commentRight.classList.add('comment__right');
      let commentHeader = document.createElement('div');
      commentHeader.classList.add('comment__header');
      let commentAuthor = document.createElement('span');
      commentAuthor.classList.add('comment__author');
      commentAuthor.innerText =  item.name;
      commentHeader.appendChild(commentAuthor);
      let commentTimeStamp = document.createElement('span');
      commentTimeStamp.classList.add('comment__time-stamp');
      commentTimeStamp.innerText = dynamicTimeStamp(item.timestamp);
      commentHeader.appendChild(commentTimeStamp);
      commentRight.appendChild(commentHeader);
      let commentBlurb = document.createElement('div');
      commentBlurb.classList.add('comment__blurb');
      let blurb = document.createElement('p');
      blurb.innerText = item.comment;
      
      // create a container for the like and delete
      let actionContainer = document.createElement('div');
      actionContainer.classList.add('comment__actions');

      // like container 
      let likeContainer = document.createElement('div');
      likeContainer.classList.add('comment__likes-container');

      // create like 
      let likeButton = document.createElement('span'); // LIKE
      likeButton.classList.add('comment__like-button');
      likeButton.innerText = `👍 `;

      //create a span for the likes count 
      let likesCounter = document.createElement('span');
      likesCounter.classList.add('comment__likes');
      likesCounter.innerText = item.likes;

      // append like button and like counter in like container  
      likeContainer.appendChild(likeButton);
      likeContainer.appendChild(likesCounter);

      // create delete
      let deleteButton = document.createElement('span'); // DELETE
      deleteButton.classList.add('comment__delete-button');
      deleteButton.innerText = '🗑️';

      // append like button and delete button on action container
      actionContainer.appendChild(likeContainer);
      actionContainer.appendChild(deleteButton);

      // append action container to  
      commentBlurb.appendChild(blurb);
      commentRight.appendChild(commentBlurb);
      commentRight.appendChild(actionContainer);
      comment.appendChild(commentRight);
      parent.appendChild(comment);
    });
    targetDiv.appendChild(parent);
  } 

  const dynamicTimeStamp = timestamp => {
    const time = [  
    { unit: 'sec', divider: 60 },
    { unit: 'min', divider: 60 },
    { unit: 'hr',  divider: 24 },
    { unit: 'day', divider: 7  },
    { unit: 'wk',  divider: 4  },
    { unit: 'mo',  divider: 12  }];
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


  // EVENT LISTENERS
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault(); // stops the browser from refreshing
    postComments(e.target); 
  });

  // ACTIONS BAR EVENTS (LIKE / DELETE)
  document.querySelector('.comments-container').addEventListener('click', e =>{
    if(e.target.classList[0] == 'comment__likes-container' || e.target.classList[0] == 'comment__like-button'){
      // if (e.target.classList[0] === 'comment__like-button') e.target = e.target.parentNode;
      // e.target = e.target.parentNode;
      // console.log(e.target.parentNode);
      // I AM TRYING TO CREATE AN IF STATEMENT THAT CHECKS TO SEE IF E.TARGET HAS A CLASS OF LIKE BUTTON OR COUNT THEN I WILL CHANGE VARIABLES OF E.TARGET TO SOMETHIN ELSE


      e.target.children[1].innerText = parseInt(e.target.children[1].innerText) + 1; // increment likes on click
      // fetch the damn thing with ID
      axios.get(`${API_LINK + ROUTE + API_KEY}`)
      .then(res=>{
        let returnedObj = res.data.find(item=>item.id === e.target.parentNode.parentNode.parentNode.id); // get the object with the ID
        returnedObj.likes = e.target.innerText;
        return returnedObj;
      })
      .then (res=>incrementLike(e.target.parentNode.parentNode.parentNode.id,res))
      .catch(err=>console.log(err));
    }
    if(e.target.classList[0] == 'comment__delete-button'){
      deleteComment(e.target.parentNode.parentNode.parentNode.id); // button < comment__actions < comment__right < comment.id
    }
    
  });

  const retrieveComments = () => {
    axios.get(`${API_LINK + ROUTE + API_KEY}`)
    .then(res=>{
      // sort res.data then call display function and pass the sorted array as a parameter
      displayComment(res.data.sort((a,b)=>b.timestamp - a.timestamp));
    })
    .catch(err=>console.log(err));
  }

  // post comment on click
  const postComments = (data) => {
    axios.post(`${API_LINK + ROUTE + API_KEY}`,
    {
      name: data.name.value,
      comment: data.comment.value
    })
    .then(res=>{
      data.name.value = "";
      data.comment.value = "";
      clearComments(document.querySelector('.comments-container')); // remove pre-existing comments
      retrieveComments();
    })
    .catch(err=>console.log('Failed to insert comment'))
  }

  // delete comment on click
  const deleteComment = id => {
    axios.delete(`${API_LINK + ROUTE + '/' + id + API_KEY}`)
    .then(res=>{
      clearComments(document.querySelector('.comments-container')); // remove pre-existing comments
      retrieveComments();
    })
    .catch(err=>console.log('failed to delete', err))
  }

  // add like on click
  const incrementLike = (id, authorDetails) => {
    console.log(authorDetails);
    axios.put(`${API_LINK + ROUTE + '/' + id + '/like' + API_KEY}`, authorDetails)
    .then(res=>{ console.log('SUCCESS')})
    .catch(err=>console.log('WRONG'));
  }

  // MAIN FLOW STARTS HERE
  main();

  // message for myself
  console.log("DO NOT FORGET TO FIX YOUR DAMN DELETE FUNCTION. ITS SHIZ RN"); 
  console.log("ALSO DO LIKE BUTTON TO INCREASE LIKE per click of like button");


