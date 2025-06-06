const dummy = (blogs) => {
  return (1)
}


const totalLikes = (blogs) =>{
  const like =  blogs.reduce((acc, val)=>{return acc + val.likes}, 0) //didnt declare starting value of acc 
  return like
}


const favoriteBlog = (blogs) => {
  let max = 0;
  for (const blog of blogs){
    if (blog.likes > max){
      max = blog.likes;
    }
  }
  return max
}


const mostLikes = (blogs) => {
  const nameLog = new Map();
  for ( const blog of blogs){
    if (nameLog.has(blog.author)){
      let val = nameLog.get(blog.author)
      nameLog.set(blog.author, val + blog.likes)
    }else{
      nameLog.set(blog.author, blog.likes)
    }
  }
    let max = 0;
    let authorMost;
    nameLog.forEach((value, key) =>{
      if(value > max){
        max = value;
        authorMost = key;
      }
    })
  return new Object({ author: authorMost,
  likes: max })
}

const mostBlogs = (blogs) => {
  const nameLog = new Map();
  for ( const blog of blogs){
    if (nameLog.has(blog.author)){
      let val = nameLog.get(blog.author)
      nameLog.set(blog.author, val + 1)
    }else{
      nameLog.set(blog.author, 1)
    }
  }
    let max = 0;
    let authorMost;
    nameLog.forEach((value, key) =>{
      if(value > max){
        max = value;
        authorMost = key;
      }
    })
  return authorMost
}
 

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}