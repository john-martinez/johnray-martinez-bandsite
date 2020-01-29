  const comments = [{
    name: 'Michael Lyons',
    timeStamp: '12/18/2018',
    comment:'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.',
    picture: ''
  }, 
  {
    name: 'Gary Wong',
    timeStamp: '12/12/2018',
    comment: 'Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!',
    picture: ''
  },
  {
    name: 'Theodore Duncan',
    timeStamp: '11/15/2018',
    comment: 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!',
    picture: ''
  }];

// EVENT LISTENER when clicking submit button
let submitBtn = document.querySelector('#submit-btn');
submitBtn.addEventListener('click', function(event){
  clearComments(); // clears all existing comments
  let today = new Date();
  event.preventDefault();
  let name = document.querySelector('#name');
  let comment = document.querySelector('#comment');
  comments.unshift({
    name: name.value,
    comment: comment.value,
    timeStamp: `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`,
    picture: ''
  })

  name.value = "";
  comment.value = "";
  displayComments(comments);
});
  
function clearComments (){
   // remove existing comments
   const toRemove = document.querySelectorAll('.comment');
   
   // CHECKER to see if toRemove nodelist is not empty
   if (toRemove.length > 0) { 
    toRemove.forEach(function(item){
      item.parentNode.removeChild(item);
    });
   }  
}

function displayComments (comments) {
    comments.forEach(function(item){
        let parent = document.querySelector('.comment-container');
        // left side of comment 
        let comment = document.createElement('div');
        comment.classList.add('comment');
        let commentLeft = document.createElement('div');
        commentLeft.classList.add('comment__left');
        let commentImage = document.createElement('div');
        commentImage.classList.add('comment__image');
        commentLeft.appendChild(commentImage);
        comment.appendChild(commentLeft);
        
        // right side of comment
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
        commentTimeStamp.innerText = item.timeStamp;
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
}

// main flow starts here
displayComments(comments);