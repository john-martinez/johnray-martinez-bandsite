  // DATA SET  
  const comments = [{
    name: 'Michael Lyons',
    timeStamp: '12/18/2018',
    comment:'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.'
  }, 
  {
    name: 'Gary Wong',
    timeStamp: '12/12/2018',
    comment: 'Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!'
  },
  {
    name: 'Theodore Duncan',
    timeStamp: '11/15/2018',
    comment: 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!'
  }];


  // FUNCTIONS
  const main = () => {  
    displayComment(comments); // populate 
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
        commentTimeStamp.innerText = dynamicTimeStamp(item.timeStamp);
        commentHeader.appendChild(commentTimeStamp);
        commentRight.appendChild(commentHeader);
        let commentBlurb = document.createElement('div');
        commentBlurb.classList.add('comment__blurb');
        let blurb = document.createElement('p');
        blurb.innerText = item.comment;
        commentBlurb.appendChild(blurb);
        commentRight.appendChild(commentBlurb);
        comment.appendChild(commentRight);
        parent.appendChild(comment);
    });
    targetDiv.appendChild(parent);
  }

  const dynamicTimeStamp = timestamp => {
    const time = [  
    { unit: 'sec', divider: 60 },
    { unit: 'min', divider: 60 },
    { unit: 'hr',   divider: 24 },
    { unit: 'day',    divider: 7  },
    { unit: 'wk',   divider: 4  },
    { unit: 'mo',  divider: 12  }];
    let toConvert = new Date(timestamp);
    let rightNow = new Date(Date.now());
    let res = rightNow - toConvert; // get the difference of the two dates in milliseconds
    res /= 1000; // convert milliseconds to seconds


    if (res >= 1){
      for(let i = 0; i < time.length; i++){
        // this block triggers if timestamp is more than or equal to 4 weeks
        if (i == time.length-1){ 
          // convert year to months (1year = 12 months) and add the rest of the months to the result
          // add toConvert month and rightNow month to their respective results
          let rightNowMonths = (rightNow.getFullYear()*12) + (rightNow.getMonth()+1); 
          let toConvertMonths = (toConvert.getFullYear()*12) + (toConvert.getMonth()+1);
          // subtract the results and you will get the results in months format
          res = rightNowMonths - toConvertMonths; 
          if (res >= 12) return `${Math.floor(res/12)} yr${(Math.floor(res/12)>=2)?'s':''} ago`;
          else return `${res} mon${res!= 1?'s':''} ago`;
        }
        else  {
          // cycle through the time array and divide res by time[i].divider
          if (Math.round(res) < time[i].divider) return `${Math.round(res)} ${time[i].unit}${Math.round(res)>= 2?'s':''} ago`;  // ${<unit>!= 1?'s':''}  <--- ternary operator to add 's' if the res is > 1
          else res /= time[i].divider;
        }
      }
    } else return `Just now`;
  } 


  // EVENT LISTENERS
  document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault(); // stops the browser from refreshing
  comments.unshift({
    name: e.target.name.value,
    comment: e.target.comment.value,
    timeStamp: new Date(Date.now())
  })

  e.target.name.value = "";
  e.target.comment.value = "";
  clearComments(document.querySelector('.comments-container')); // remove pre-existing comments
  displayComment(comments);
  });


  main();

  // MAIN FLOW STARTS HERE
