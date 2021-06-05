const express = require('express');
const user = require('../routes/auth');
// 데이터 값 연결 user.nick과 user.email로 로그인한 사용자 데이터 불러오기 가능
const post = require('../models/post');
const { User } = require('../models');

const router = express.Router();

var postdata;  

router.get('/', (req, res) => {
  res.render('main');                               
  });

router.get('/QnA/write' ,(req,res)=>{

  res.render('write');
})
  
router.get('/post', async(req,res) => {
          await post.findAll({raw : true}).then((results) =>{
            console.log(results);
           postdata = results;
          }).catch ((err)=>{
           console.error(err);
          });
          res.redirect('/main/QnA');
        });
       
router.get('/QnA' ,(req,res) => {
  res.render('QnA' , {postdata});
})                       

router.post('/QnA/write' , async (req,res)=>{  //insert
  const { content, postTiltle} = req.body;
 
 try{
  await post.create({
    content,
    postTiltle,
    writer : user.nick,
      });
  return res.redirect('/main/QnA');
 }catch (error) {
  console.error(error);
  return next(error);
}
});

  module.exports = router;